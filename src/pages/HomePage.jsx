import  React,{useEffect, useRef, useState,Fragment, useLayoutEffect} from 'react'
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
import CommonTable from "../common/components/CustomCommonTable";
import service from "../api/apiSection/service";
import {cameraList,recordingInfo} from "../api/apiSection/apiUrlConstent"
import { useForm } from 'react-hook-form';
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
 const [camerasList,setCameraList]=useState([]);
const [recordInfo,setRecordInfo]=useState([
  {cameraName:"faux_camera1",recordDate:'2024-02-01',hoursList:[{path:"dd",hour:1},{path:"dd",hour:2}]},
  {cameraName:"faux_camera1",recordDate:'2024-02-02',hoursList:[{path:"dd",hour:1},{path:"dd",hour:3}]},
  {cameraName:"faux_camera1",recordDate:'2024-02-03',hoursList:[{path:"dd",hour:1},{path:"dd",hour:4}]},
  {cameraName:"faux_camera1",recordDate:'2024-02-04',hoursList:[{path:"dd",hour:1},{path:"dd",hour:2}]},
  {cameraName:"faux_camera1",recordDate:'2024-02-05',hoursList:[{path:"dd",hour:1},{path:"dd",hour:3}]},
  {cameraName:"faux_camera1",recordDate:'2024-02-01',hoursList:[{path:"dd",hour:1},{path:"dd",hour:9}]}]);
 const {
  register,
  control,
  handleSubmit,
  watch,
  reset,
  formState: { errors },
  setValue,
  getValues,
} = useForm();
useLayoutEffect(()=>{
  service.get(cameraList).then((response)=>{
if(response.data.status=="success"){
  response.data.data&&response.data.data.length>0&&setCameraList(response.data.data);
}else{
  alert("Technical error")
}
  }).catch((e)=>alert("Please contact to Research Team"))
},[]);
const getVidoeInfo=(data)=>{
  console.log("Data Loading",data);
  service.get(`${recordingInfo}cameraName=${data.cameraName}`).then((response)=>{
    if(response.data.status=="success"){
      response.data.data&&response.data.data.length>0&&setRecordInfo(response.data.data);
      reset();
    }else{
      alert("Technical error")
    }
  }).catch((e)=>alert("Please contact to Research Team"))

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
                    displayValue="name"
                    keyValue="value"
                    listItems={camerasList}
                    inputRef={register('cameraName', {
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Label labelName={"Start Date*"} />
                  <Input
                    name={"startDate"}
                    type={"date"}
                    inputRef={register('startDate', {
                    })}
                    max={getCurrentDateToDisplay()}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                  <Label labelName={"End Date*"} />
                  <Input
                    name={"endDate"}
                    type={"date"}
                    inputRef={register('endDate', {
                    })}
                    max={getCurrentDateToDisplay()}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10} className={classes.vidoeButton} sx={{
    margin:'auto'                }}>
                  <ActionButton
                    buttonText={"Load Video Info"}
                    handleSubmit={handleSubmit(getVidoeInfo)}
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
  data={recordInfo}
  camerasList={camerasList}
  />
          </div>
      </Box>
    );

}
