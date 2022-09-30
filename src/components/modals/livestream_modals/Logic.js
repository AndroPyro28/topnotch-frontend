import { useNavigate } from "react-router-dom";
import CustomAxios from "../../../customer hooks/CustomAxios";
import getTime from "../../../helpers/getTime";
import GetDateToday from "../../../helpers/DateToday";
function Logic({ linkId, scheduleInfo, toast}) {
  const navigate = useNavigate();

  const startStream = async () => {
    try {
      if(!linkId || !scheduleInfo) {
        return toast('Select a schedule to start!', {type:"warning"})
      }

      const response = await CustomAxios({METHOD:"POST", uri:`/api/admin/startStreaming`, values:{
        linkId, scheduleInfo,
        timeStart:`${GetDateToday()} ${getTime()}`
      }})

      const {success, msg} = response;
      
      if(!success && msg?.includes("session expired")) {
        return toast('Something went wrong...', {type:"error"})
      }

      window.localStorage.setItem("enter_stream", true);
      window.localStorage.setItem("render_once", true)
      navigate(`/admin/liveStreamChannels/room=${linkId}`);

    } catch (error) {
      console.error(error.message)
    }
  };

  return {
    startStream,
  };
}

export default Logic;
