// import Constants from './Constants';

/* -------------------------------------------- TIME  ----------------------------------------------------------- */

// Convert Text to Time
function convertTextToTime(text) {
    const timeRegex = /^(\d{1,2})(:)?(\d{2})?\s?(AM|PM)?$/i; // Regex to match time format
    const match = text.match(timeRegex);
  
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = match[3] ? parseInt(match[3], 10) : 0;
      const period = match[4] ? match[4].toUpperCase() : 'AM';
  
      if (hours === 12) {
        hours = period === 'AM' ? 0 : 12;
      } else if (period === 'PM') {
        hours += 12;
      }
  
      const time = new Date();
      time.setHours(hours, minutes, 0, 0);
  
      return time;
    }
  
    return null; // Return null for invalid format
  }
  
  // Check the Time Difference and Check Time difference is within 12 hours
function checkTimeDifference(startDateTime, endDateTime, withInHours) {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    let obj={}
  
    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      obj.status = false;
      obj.msg = "* Invalid date format";
      return obj;
    }
  
    // Check if start time is less than end time
    if (start >= end) {
      obj.status = false;
      obj.msg = "* Start time cannot be less than or equal to end time.";
      return obj;
    }
  
    // Calculate difference in milliseconds
    const diffInMilliseconds = Math.abs(end - start);
  
    // Calculate the difference in hours
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
  
    // Check if difference is within 12 hours
    if (diffInHours <= withInHours) {
      obj.status = true;
      obj.totalHours = diffInHours;
      obj.msg = diffInHours + " hours";
      return obj;
      // return <p className='successMsg'>Shifts hours: {diffInHours} hours.</p>;
    } else {
      obj.status = false;
      obj.msg = "* Shifts cannot be longer than " +withInHours+ " hours.";
      return obj;
    }
  }

  // Get only Time in 24 Hours formate 
function getTimeFromStringIn24hours(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${hours}:${minutes}:${seconds}`;
  }
  
  // Get only Time in AM and PM Hours formate
function getTimeFromStringInAmPm(dateString) {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
  
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
  
    return `${displayHours}:${minutes} ${period}`;
  }        
  


  /* -------------------------------------------- TIME END ----------------------------------------------------------- */


  // let arr = ["Bartender", "Dishwasher", "Event Server", "Barback", "Busser", "Event Setup and Takedown", "Prep Cook", "Runner", "Housekeeper", "Counter Staff / Cashier"];
  // let newArr = []
  // arr.forEach((element, index) => {
  //   newArr.push({"id":index,"name":element,"icon":"bi bi-grid",quantity: 1})
  // }); 
  // console.log(newArr)

export { 
    convertTextToTime,
    checkTimeDifference,
    getTimeFromStringIn24hours,
    getTimeFromStringInAmPm,
}