import  React,{useEffect, useRef, useState,Fragment} from 'react'
import axios from 'axios';
import Cardlayout from '../common/components/CardLayout';
import Input from "../common/components/Input";
import Select from "../common/components/Select";
import Label from "../common/components/label"
import { makeStyles } from '@mui/styles';
import Title from '../common/components/Title';
import {getCurrentDateToDisplay} from "../utils/utilSub/Date"
import { Box, Grid } from '@mui/material';
import ActionButton from "../common/components/Button";
import CommonTable from "../common/components/CustomCommonTable"
const useStyles = makeStyles(theme => ({
  root:{
  padding:'3% 10px',
  },
  vidoeButton:{
    padding:"20px 0px",
  },
  tableRoot:{
    padding:'20px 0px',
  },
}))
const customTitleStyle={color:'#4839be',fontSize: "1.5rem", padding: "9px 0px"};

export default function HomePage(props){
   const refItem=useRef();
   const classes=useStyles();
   const [urlData,setUrlData]=useState(null);
const dataHandle=(e)=>{
axios.get("http://localhost:8090/recordingInfo/getRecordingClip?sourcePath=/recordings/2024-02-06/19/faux_camera1/testImgClip.mp4",{
   responseType: 'arraybuffer'}).then((response)=>{
        const binaryData = new Blob([response.data], { type: 'video/mp4' });
        let convertedData = URL.createObjectURL(binaryData);
        console.log(convertedData)
        console.log(refItem)
        if (refItem.current) {
        setUrlData(true)
        refItem.current.src = convertedData;
        }
});
}
const getVidoeInfo=()=>{
  console.log("Data Loading")
}
const RedirectHandler=(path)=>{
  props.Redirectpath(path)
}
    return (
      <Box className={classes.root}>
        <Cardlayout
          cardContent={
            <div>
              <Title title="Welcome to Anotation analyer from stream from frigate Information" style={customTitleStyle}/>
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Label labelName={"Select camera *"} />
                  <Select
                    displayValue="displayValue"
                    keyValue="keyValue"
                    listItems={[
                      { displayValue: "Camera 1", keyValue: "faux_camera1" },
                      { displayValue: "Camera 2", keyValue: "faux_camera2" },
                      { displayValue: "Camera 3", keyValue: "faux_camera3" },
                      { displayValue: "Camera 4", keyValue: "faux_camera4" },
                      { displayValue: "Camera 5", keyValue: "faux_camera5" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Label labelName={"Start Date*"} />
                  <Input
                    name={"startDate"}
                    type={"date"}
                    max={getCurrentDateToDisplay()}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Label labelName={"End Date*"} />
                  <Input
                    name={"endDate"}
                    type={"date"}
                    max={getCurrentDateToDisplay()}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10} className={classes.vidoeButton} sx={{
    margin:'auto'                }}>
                  <ActionButton
                    buttonText={"Load Video Info"}
                    handleSubmit={getVidoeInfo}
                    backgroundColor={"#8c7eff"}
                    // width={"fit-content"}
                    borderRadius={"15px"}
                  />
                </Grid>
              </Grid>
            </div>
          }
        />
        <div className={classes.tableRoot}>
<CommonTable
redirectPage={RedirectHandler}
  data={[{cameraName:"Camera FlexA",recordDate:'2024-02-01',listInfo:[1,2,3,4,5,6,7,8,9,10]},
{cameraName:"Camera FlexB",recordDate:'2024-02-02',listInfo:[1,2,3,4,5,6,7,8,9,10]},
{cameraName:"Camera FlexC",recordDate:'2024-02-03',listInfo:[1,2,3,4,5,6,7,8,9,10]},
{cameraName:"Camera FlexD",recordDate:'2024-02-04',listInfo:[1,2,3,4,5,6,7,8,9,10]},
{cameraName:"Camera FlexE",recordDate:'2024-02-05',listInfo:[1,2,3,4,5,6,7,8,9,10]},
{cameraName:"Camera FlexF",recordDate:'2024-02-01',listInfo:[1,2,3,4,5,6,7,8,9,10]}]} />
          </div>
      </Box>
    );

}



{/* <button onClick={dataHandle}>Specific Vidoe </button>
<div>
  <video ref={refItem} controls width="640" height="360">
    Your browser does not support the video tag.
  </video>
</div> */}