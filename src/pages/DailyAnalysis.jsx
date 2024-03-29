import {useEffect, useState} from 'react';
import { makeStyles } from '@mui/styles';
import {filePost} from "../api/apiSection/apiUrlConstent";
import service from "../api/apiSection/service";
import Box from '@mui/material/Box';
import {Paper,Grid} from '@mui/material';
import DigitalClock from './DailyAnalytics/Digitaltime';
import LinerChart  from  "./DailyAnalytics/LinerChart";
import AreaChart from "./DailyAnalytics/AreaChart";
import Piechart from "./DailyAnalytics/Piechart";
import Piechart2 from './DailyAnalytics/Piechart2';
import CustomBar from "./DailyAnalytics/WeeklyView";

const useStyles = makeStyles(theme => ({
    root :{
        padding:"15px"
    },

}))

export default function DailyAnalysis(props){
        const classes = useStyles();
    const [fileData,setFileData]=useState([]);
  
    const fileHandler=(e)=>{
        console.log("file data",e.target.files[0]);
        setFileData(pre=>[...pre,e.target.files[0]])
    }
    return (
        <div className={classes.root}>

            {/* <div>
                <AutoModeIcon sx={{fontSize:"7rem",color:"rgba(187,238,174,1)"}}/>
            </div>
          <h1>
         Universeral  Analytical Home page is Under Planning for MVP-2
        </h1> */}
            <Box >
            <Paper elevation={3} >
<h1>Test data</h1>
            </Paper>
        <Grid container spacing={3} item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid item xs={12}  sm={12} md={6} lg={6} xl={6} >
        <Paper elevation={3} >
<LinerChart/>
            </Paper>

      </Grid>
      <Grid item xs={12}  sm={12} md={5} lg={5} xl={5} >
      <Paper elevation={3} >
        <DigitalClock/>
        <AreaChart/> 
            </Paper>
         
      </Grid> 
           <Grid item xs={12}  sm={12} md={6} lg={6} xl={6} >
            <Piechart/>
            </Grid>
            <Grid item xs={12}  sm={12} md={6} lg={6} xl={6} >
            <Piechart2/>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
            <Paper elevation={3} >
            <CustomBar/>
            </Paper>
            </Grid>
            </Grid>

    </Box>
        </div>
    )
}