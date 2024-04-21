import  React ,{useState,c,useLayoutEffect, useRef, useContext}from 'react'
import { makeStyles } from '@mui/styles';
import CameraTwoToneIcon from '@mui/icons-material/CameraTwoTone';
import { useForm } from "react-hook-form";
import {Paper,Grid} from '@mui/material';
import service from '../api/apiSection/service';
import {recordingInfo,recordSourcePath,recordSource} from "../api/apiSection/apiUrlConstent"
import MultiActionAreaCard from '../common/components/CustomCard';
import Cardlayout from "../common/components/CardLayout";
import Select from "../common/components/Select";
import Label from "../common/components/label";
import ActionButton from "../common/components/Button";
import AlertMessage from "../common/components/AlertMessage";
import ErrorMessage from "../common/components/ErrorMessage";
import {beforeDaysDate,getCurrentDateToDisplay} from "../utils/utilSub/Date";
import Loading from "../common/components/AppLoading";
import Title from '../common/components/Title';
import Input from '../common/components/Input';
import {timeOutCaller} from "../utils/utilSub/ArrayMethods";
import testVideo from "../assets/testclip.MP4";
import CardLayout from "../common/components/CardLayout";
import Context from "../context/Context";
const useStyles = makeStyles(theme => ({
    root :{
        padding:"3%",
        background:"mintcream"
    },
    detechionSection:{
      padding:"3% 0px"
    },
    dectionCard:{
      padding:"10px"
    },
    videoSection:{
      height:'600px',
      overflowY:'auto'
    }
}));
const customTitleStyle = {
  color: "#4839be",
  fontSize: "1.5rem",
  padding: "9px 0px",
};
const buttonCustomStyle={ padding:'29px 20px 0px'};
export default function DetecionsRepo(props){
  const videoRef=useRef();
  const context=useContext(Context)
  const classes = useStyles();
    const [recordInfo, setRecordInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading,setLoading]=useState(false);
  const[videoSourcePath,setvideoSourcePath]=useState([]);
  const [detecionInfo,setDetecionInfo]=useState([{ "path": "/recordings/2024-04-07/17/crosswalk",
    "hour": "2024-04-07 At 17"
  }]);
    const {
      register,
      control,
      handleSubmit,
      reset,
      formState: { errors },
      setValue,
      getValues,
    } = useForm();
    useLayoutEffect(() => {
        service
        .get(`${recordingInfo}cameraName=${"faux_camera1"}`)
        .then((response) => {
          if (response.data.status == "success") {
            setErrorMessage({
              message: "Information successfully loaded",
              status: "success",
            });
           if(response.data.data && response.data.data.length > 0){
            setRecordInfo(response.data.data); 
           } 
           
        } else {
            setErrorMessage({ message: "Technical Error", status: "error" });
          }
        })
        .catch((e) => alert("Please Contact Research Team"));
        timeOutCaller(setErrorMessage, 5000);
      }, []);
    const videoHandler=(subSourcePath)=>{
    console.log("view Data",subSourcePath)
    service
    .get(`${recordSource}sourcePath=${subSourcePath}`, "arraybuffer")
    .then((respones) => {
      if (respones.data) {
        const binaryData = new Blob([respones.data], { type: "video/mp4" });
        let convertedData = URL.createObjectURL(binaryData);
        if (videoRef.current) {
          videoRef.current.src = convertedData;
        }
      } else {
        alert("Technical Error");
      }
    })
    .catch((e) => alert("Please contact to research team"));
    }
    const trainDataHandler=(subSourcePath)=>{
    console.log("Tarin Data handler");
    context.dispatch({type:"detecionPath",value:subSourcePath});
    props.Redirectpath("/video-farmes-viewer");
    };
    const getDetecionInfo=(data)=>{
      console.log("recordInfo",data);
      setLoading(true);
      service
        .get(
          `${recordSourcePath}subPath=${data.videoPath.replace("recordings","clips")}`
        )
        .then((respones) => {
          if (respones.data.status == "success" && respones.data.data) {
            console.log("data",respones.data.data);
            setvideoSourcePath(respones.data.data);
            setLoading(false);
          } else {
            alert("Technical Error");
            setLoading(false);
          }
        })
        .catch((e) => {
          alert("Please Contact Research Team");
          setLoading(false);
        });

    }
    const dateHandler=(e)=>{
      console.log(e.target.value,"date");
      let detecionInfo=recordInfo.find((data)=>data.recordDate===e.target.value).hoursList;
      setDetecionInfo(detecionInfo);
    }

    const videoTagHandler = (key) => {
      const video = videoRef.current;
    };
    return(
        <div className={classes.root}>

            {/* <div>
                <CameraTwoToneIcon sx={{fontSize:"7rem",color:"rgb(63,94,251)"}}/>
            </div>
        <h1>
            Universeral Detecions analytics is Under Planning for MVP-2
            </h1> */}
            <Loading open={loading}/>
      <Cardlayout
        cardContent={
          <div>
            <div className={classes.titleRoot}>
              <Title
                title="Welcome to Annotation Analyzer of frigate data"
                style={customTitleStyle}
              />
    
            </div>
            {errorMessage && (
              <AlertMessage
                message={errorMessage.message}
                status={errorMessage.status}
              />
            )}
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Label labelName={"Detecion Date"} />
                    <Input
                      name={"startDate"}
                      type={"date"}
                      onInput={dateHandler}
                      max={getCurrentDateToDisplay()}
                      min={beforeDaysDate(8)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Label labelName={"Select your hour *"} />
                    <Select
                      displayValue="hour"
                      keyValue="path"
                      listItems={detecionInfo}
                      inputRef={register("videoPath", { required: true })}
                    />
                    <div>
                      {errors &&
                        errors.cameraName &&
                        errors.cameraName.type === "required" && (
                          <ErrorMessage message={"required !!"} />
                        )}
                    </div>
                  </Grid>
                  <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                xl={3}
                sx={buttonCustomStyle}
              >
                <ActionButton
                  buttonText={"Load Video Info"}
                  handleSubmit={handleSubmit(getDetecionInfo)}
                  backgroundColor={"#8c7eff"}
                  // width={"fit-content"}
                  borderRadius={"15px"}
                />
              </Grid>
            </Grid>
          </div>
        }
      />
  <div className={classes.detechionSection}>
  {videoSourcePath&&videoSourcePath.length>0?<Grid container spacing={2} item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className={classes.videoSection}>
{videoSourcePath.map((data)=>(
<div className={classes.dectionCard}>
  <MultiActionAreaCard
title={"Fish"}
additionalInfo={data.url.split("/").join(" ")}
viewHandler={()=>videoHandler(data.url)}
trainHandler={()=>trainDataHandler(data.url)}
/>
</div>))}
</Grid>
 <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
 <CardLayout
          padding={"24px 20px"}
          boxShadow={"inset 0px 0px 10px #00000029"}
          cardContent={
            <div>
              <video
                ref={videoRef}
                src={testVideo}
                controls
                style={{ padding: "10px", borderRadius: "15px" }}
                width="100%"
                onPause={() => videoTagHandler("pause")}
                onPlay={() => videoTagHandler("play")}
              />
              </div>}
              />

 </Grid>
 </Grid>:
 <div>
<h2>{"#The detecions Information are loading . . ."}</h2><br/><br/>
  </div>}
            </div>
        </div>
       
    )

}