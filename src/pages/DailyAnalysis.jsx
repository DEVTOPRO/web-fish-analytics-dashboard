import {useEffect, useLayoutEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import {dayWiseInfo} from "../api/apiSection/apiUrlConstent";
import service from "../api/apiSection/service";
import Box from '@mui/material/Box';
import {Paper,Grid} from '@mui/material';
import DigitalClock from './DailyAnalytics/Digitaltime';
import LinerChart  from  "./DailyAnalytics/LinerChart";
import AreaChart from "./DailyAnalytics/AreaChart";
import PieChartArea from "./DailyAnalytics/Piechart";
import Piechart2 from './DailyAnalytics/Piechart2';
import CustomBar from "./DailyAnalytics/WeeklyView";
import CameraTwoToneIcon from '@mui/icons-material/CameraTwoTone';
import Chips from '../common/components/Chips';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Title from "../common/components/Title";
import ActionButton from '../common/components/Button';
const useStyles = makeStyles(theme => ({
    root :{
        padding:"10px"
    },
    mainRoot:{
        display:'flex',
        alignItems:'center',
        padding:'10px'
    },
    titleStyle:{
        padding:"0px 13px",

    },
    piechartView:{
      display:"flex",
      justifyContent:"space-evenly"
    },
    chipsStyle:{
      cursor: "pointer",
      transition: "transform .4s",
      "&:hover": {
        transform: "scale(0.85)",
      },
    },
    digitalSection:{
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center'
    },
    refreshButton:{
      padding:'5px'
    }
}))

let dayCount=[
  {name:"0",count:250},
  {name:"1",count:200},
  {name:"2",count:300},
  {name:"3",count:250},
  {name:"4",count:600},
  {name:"5",count:800},
  {name:"6",count:500},
  {name:"7",count:900},
  {name:"8",count:1300},
  {name:"9",count:1400},
  {name:"10",count:2340},
  {name:"11",count:1500},
  {name:"12",count:980},
  {name:"13",count:1800},
  {name:"14",count:1400},
  {name:"15",count:900},
  {name:"16",count:750},
  {name:"17",count:590},
  {name:"18",count:530},
  {name:"19",count:1350},
  {name:"20",count:1900},
  {name:"21",count:180},
  {name:"22",count:300},
  {name:"23",count:10},
]
let weekCounts=[
  {name:"03/24",count:1700},
  {name:"03/25",count:1120},
  {name:"03/26",count:1020},
  {name:"03/27",count:1140},
  {name:"03/28",count:1341},
  {name:"03/29",count:130},
  {name:"03/30",count:1631},
  {name:"03/31",count:931},
];
let comparDayInfo={
  today :2351,
  totalScore: 1865.248046875,
  yestday:1263}
let typeOfSpecies=[
  {name:'Salman',value:30},
  {name:'Blue',value:40},
  {name:"Red",value:10},
  {name:"Ragi Silver",value:30},
]
export default function DailyAnalysis(props){
    const classes = useStyles();
  const [dailyInfo,setDailyInfo]=useState({
    dayComparsionInfo:comparDayInfo,
    hourInfo:dayCount,
    weeklyInfo:weekCounts,
  });
  // Function to generate a random radial color
  function generateRandomRadialColor() {
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
   return `linear-gradient(90deg, ${randomColor1}, 74%, ${randomColor2} 100%)`;
  }
  useLayoutEffect(()=>{
    dailyService();
  },[]);
setInterval(()=>{
  dailyService();
},180000);
  // Function to generate a random hex color
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  const dailyService=()=>{
    service.get(dayWiseInfo ).then((respones)=>{
      console.log("respones",respones)
      if(respones.data.status == "success"){
        if(respones.data.data){
       let hoursInfo= [];
    let weekInfo=[];
       Object.keys(respones.data.data.hourInfo).forEach((updateInfo)=>{
    let hourObj={};
    hourObj.name= updateInfo;
    hourObj.count= respones.data.data.hourInfo[`${updateInfo}`];
    hoursInfo.push(hourObj);
       });
       Object.keys(respones.data.data.weeklyInfo).forEach((updateInfo)=>{
        let weekObj={};
        weekObj.name= updateInfo;
        weekObj.count= respones.data.data.weeklyInfo[`${updateInfo}`];
        weekInfo.push(weekObj);
           });
           respones.data.data.hourInfo=hoursInfo;
           respones.data.data.weeklyInfo=weekInfo;
           setDailyInfo(respones.data.data);
           console.log("actula data",respones.data.data);
          }else{
            alert(respones.data.data.statusMessage);
          }
      }else{
        alert("Data is not found")
      }

    }).catch((e)=>alert("Please contact the admin team"))
  }
    let camInfo=[{name:"Camera-A",color:generateRandomRadialColor()},{name:"Camera-B",color:generateRandomRadialColor()},{name:"Camera-C",color:generateRandomRadialColor()},{name:"Camera-D  ",color:generateRandomRadialColor()},]
   const refreshHandler =()=>{
console.log('Refresh Data')
   }
    return (
      <div className={classes.root}>
      
        
        <Box>
            <div className={classes.root}>
          <Paper elevation={3} sx={{background:"linear-gradient(to right top, #5db6f2, #5acbdd, #92d7c3, #c9debb, #f1e5cc)"}} >
          <div className={classes.mainRoot}>
        <CameraTwoToneIcon sx={{fontSize:"4rem",color:"rgba(187,238,174,1)"}}/>
        <h1 className={classes.titleStyle}>
          Welcome to Universeral  Analytical for fish detecion
        </h1>
        </div>
        <Grid
            container
            spacing={2}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{p:'10px 25px'}}
          >
      {camInfo.map((data=>
       <Grid item xs={12} sm={12} md={3} lg={3} xl={3} className={classes.chipsStyle}>
          <Chips
             icon={<EngineeringIcon />}
                              background={data.color}
                              label={data.name}
                              padding="10px"
                              handleClick={()=>{}}
                            />
                          </Grid>
        ))}  
            </Grid>
          </Paper>
          </div>
          <Grid
            container
            spacing={2}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{padding:"8px 0px"}}
          >
            <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
              <Paper elevation={3} >
                <Title title={"Fish Forecast for Per Hour"} style={{color:"#4e1d79db",textAlign:"center",fontSize:"24px",padding:"12px"}}/>
                <LinerChart dayCount={dailyInfo.hourInfo} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
              <Paper elevation={3} sx={{background: "linear-gradient(to right, #85f48a, #c7d961, #eebc5d, #fea173, #f68f91)"
                // "linear-gradient(to right top, #e9ddc4, #cbdcb8, #9edcc0, #69d7db, #4ccdfb)"
                }}>
              <div className={classes.digitalSection}>
             <Title title={"Fish Recent Events Monitor "} style={{color:"#4e1d79db",textAlign:"center",fontSize:"24px",padding:"12px"}}/>
               <div className={classes.refreshButton}>
                <ActionButton
                buttonText={"Refresh"}
                handleSubmit={refreshHandler}
                width={"fit-content"}
                backgroundColor="#8229dc"
                borderRadius={"10px"}/>
               </div>
                </div>             
                 <DigitalClock />
                <AreaChart totalEventsCount={dailyInfo.dayComparsionInfo}/>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper elevation={3} sx={{alignItem:"center"            // "linear-gradient(to right top, #28a0f1, #b68df0, #ff74ba, #ff7d69, #f0a812)"
            }}>
         <Title title={"Fish Events Clips and Type of Species"} style={{color:"#4e1d79db",textAlign:"center",fontSize:"24px",padding:"12px"}}/>
         <div className={classes.piechartView}>     
              <PieChartArea data={typeOfSpecies} />
              <Piechart2  data={dailyInfo.dayComparsionInfo}/>
              </div>
              </Paper>
            </Grid>
         
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Paper elevation={3}>
              <Title title={"Weekly Prediction Fish Evalution"} style={{color:"#4e1d79db",textAlign:"center",fontSize:"24px",padding:"12px"}}/>
                <CustomBar weeklyDate={dailyInfo.weeklyInfo} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
}