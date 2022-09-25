import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import {
  PaymentSuccessContainer,
  Title,
  Line,
  TransactionNumber,
  PaymentData,
  ProceedButton,
} from "./components";
import productPriceFormatter from "../../../helpers/ProductPriceFormatter";
import GetDateToday from "../../../helpers/DateToday";
import CustomAxios from "../../../customer hooks/CustomAxios";
import Cookies from "js-cookie";
import Loader from "../../../components/loader/Loader"
function PaymentInfo() {
  const navigate = useNavigate();

  const [transactionId, setTransactionId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        if (
          localStorage.getItem("onCheckoutProducts") == undefined ||
          !localStorage.getItem("onCheckoutProducts")
        ) {
          return;
        }

        const checkoutInfo = JSON.parse(
          localStorage.getItem("onCheckoutProducts")
        );

        if(checkoutInfo) {
          const inFiveMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
          Cookies.set('onCheckoutProducts', JSON.stringify(checkoutInfo), {
            expires:inFiveMinutes
          })
        }

        localStorage.removeItem("onCheckoutProducts");

        const {
          method,
          orderId,
          totalAmount,
        } = JSON.parse(Cookies.get('onCheckoutProducts'));
          setTotalAmount(totalAmount);
          setTransactionId(orderId);
          setPaymentMethod(method);

          const response = CustomAxios({
            METHOD: "POST",
            uri: `/api/customer/payment`,
            values: checkoutInfo,
          });

          const { msg, success } = response;
          if (!success && msg?.includes("session expired")) {
            toast(msg, { type: "error" });
            return window.location.reload();
          }
          toast(msg, { type: "success" });
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if(loading) return <Loader bg="rgba(0,0,0,0.5)" />

  if (!JSON.parse(Cookies.get('onCheckoutProducts'))) {
    return navigate("/customer/cart");
  }

  return (
    <PaymentSuccessContainer>
      <ToastContainer autoClose={1500} />

      <i className="fa-solid fa-circle-check"></i>

      <Title>
        <h1>Payment Successful</h1>
        <p>Your payment has been processed!</p>
        <small>Details of transaction are included below</small>
      </Title>

      <Line />

      <TransactionNumber>Transaction ID: {JSON.parse(Cookies.get('onCheckoutProducts')).transactionId}</TransactionNumber>

      <PaymentData>
        <span>TOTAL AMOUNT PAID</span>
        <strong>{productPriceFormatter(JSON.parse(Cookies.get('onCheckoutProducts')).totalAmount)}</strong>
      </PaymentData>

      <Line />

      <PaymentData>
        <span>payed by</span>
        <strong>{JSON.parse(Cookies.get('onCheckoutProducts')).paymentMethod}</strong>
      </PaymentData>

      <Line />

      <ProceedButton onClick={() => navigate("/customer/cart")}>
        Proceed
      </ProceedButton>
    </PaymentSuccessContainer>
  );
}

export default PaymentInfo;
