import React from "react";
import {
  DashboardChartsContainer,
  MonthlySalesChartsContainer,
  NewClients,
} from "./components";

import { Line, Bar, Pie, Doughnut, Chart } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  LineController,
  BarController,
} from "chart.js";
import { useEffect } from "react";
import CustomAxios from "../../customer hooks/CustomAxios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LineController,
  BarController
);

const salesChartOption = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      align: "center",
      fontSize: 50,
      color: "black",
    },
  },
  animations: {
    tension: {
      duration: 1000,
       easing: "linear",
      from: 0,
      to: 1,
      loop: true,
    },
  },
  scales: {
    y: {
      // defining min and max so hiding the dataset does not change scale range
      min: 0,
    },
  },
  maintainAspectRatio: false,
};



function DashboardCharts() {

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    (async() => {
      const result = await CustomAxios({METHOD:"GET", uri:"/api/admin/dashboard"});
      const salesArr = new Array(12);

      for (const data in result) {
        console.log(data)
      }
      
    })()
  }, [])


  
  const data = {
    labels,
    datasets: [
      {
        type: "line",
         label: "",
        borderColor: "gray",
        backgroundColor:"white",
        data: [112, 123, 532, 122, 222, 333, 666, 123, 321],
      },
      {
        type: "bar",
         label: "",
        backgroundColor: "#a6b7f1",
        data: [112, 123, 532, 122, 222, 333, 666, 123, 321],
        borderColor: "white",
        borderWidth: 2,
        borderRadius:100
      },
    ],
  };


  return (
    <DashboardChartsContainer>
      <MonthlySalesChartsContainer>
        <h1>Monthly sales for year {new Date().getFullYear()}</h1>
        <Chart
          data={data}
          options={salesChartOption}
          style={{ position: "relative", }}
        />
      </MonthlySalesChartsContainer>

      <NewClients>
        <h1>New Clients Today</h1>

        <h2>
          <span>54</span>
        </h2>

        <p> See the new 54 clients</p>
      </NewClients>
    </DashboardChartsContainer>
  );
}

export default DashboardCharts;
