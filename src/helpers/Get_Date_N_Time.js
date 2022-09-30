const Get_Date_N_Time = (dateLocal) => {
    const date = new Date(dateLocal);
    console.log(dateLocal);

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
    console.log(ampm);
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    const newTime = hours + ':' + minutes + ampm.includes('AM') ? ' am' : ' pm';

    const newDate = `${year}-${month}-${day}`;
    return { newDate, newTime };
  };
  export default Get_Date_N_Time ;