import React, { useState, useEffect } from 'react';
import ScaleIcon from '@mui/icons-material/Scale';
import { makeStyles } from '@mui/styles';
import MonitorWeightIcon from "../../assets/monitorIcon.svg"
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import ProgressLoader from "./ProgressLoder";
const useStyles = makeStyles(theme => ({
  subRoot :{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
imgStyle:{
  textAlign: 'center',
},
progressLoader:{
  paddingBottom: '23px',
}
}))
export default function DigitalClock() {
  const classes = useStyles();
  const [currentTime, setCurrentTime] = useState('');
  const [progress, setProgress] = React.useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(formattedTime);
    }, 1000);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 20000);
    return () => {
      clearInterval(timer);
      clearInterval(interval);
    };
  }, []);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div>
       <div className={classes.imgStyle}>
        <img src={MonitorWeightIcon}/>
      </div>
      <div className={classes.subRoot}>
        <div><CheckCircleSharpIcon sx={{color:"green",fontSize:'2rem' }}/></div>
        <h2>{currentTime}   <span>{currentDate}</span></h2>
       <div className={classes.progressLoader}>
       <ProgressLoader progress={progress}/>     
       </div>
      </div>
     
    </div>
  );
};
