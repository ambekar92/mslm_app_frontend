import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TimeDisplay = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState(moment().tz(timezone).format('MM-DD-YYYY HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().tz(timezone).format('MM-DD-YYYY HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      {/* <p className='timmer'>{timezone}</p> */}
      <p className='timmer'>{currentTime}</p>
      <p className='timmer2'>
        <span>Version: </span>
        {process.env.REACT_APP_VERSION}
      </p>
    </div>
  );
};

export default TimeDisplay;
