import React, { useRef, useEffect, useState, useContext } from "react";
import CardLayout from "../common/components/CardLayout";
import SampleImage from "../assets/fishjum.svg";
import ItemCarousel from "../common/components/Carousel";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { makeStyles } from "@mui/styles";
import testVideo from "../assets/testclip.MP4";
import FrameViewer from "../common/components/FrameViewer";
import ActionButton from "../common/components/Button";
import Context from "../context/Context";
import Paper from "@mui/material/Paper";
import service from "../api/apiSection/service";
import {recordSourcePath,recordSource} from "../api/apiSection/apiUrlConstent";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

const useStyles = makeStyles((theme) => ({
  videoCards: {
    color: "#4839be",
  },
  mainRoot: {
    padding: "20px 0px",
  },
  backButton: {
    padding: '10px',
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.0)"
    },
  }
}));
export default function VideoCollection(props) {
  const classes = useStyles();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextData = useContext(Context);
  const [frames, setFrames] = useState([]);
  const [imageData, setImageDate] = useState(null);
  const [isFrameView, setIsFrameView] = useState(false);
  const [videoTime,setVideoTime]=useState(null);
const [videoSourcePath,setvideoSourcePath]=useState([]);
  let sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
useEffect(()=>{
service.get(`${recordSourcePath}subPath=${contextData.state.path}`).then((respones)=>{
if(respones.data.status=="success"&&respones.data.data){
  setvideoSourcePath(respones.data.data)
}else{
alert("Technical Error")
}
}).catch((e)=>alert("Please contact to research team"))
},[])
  const extractImages = () => {
    const video = videoRef.current;
    const initialTime = video.currentTime;
    setFrames([])
    const endTime = initialTime + 1;
    if (videoRef.current) {
      const interval = setInterval(() => {
        if (endTime <= video.currentTime) {
          clearInterval(interval);
        } else {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL("image/png");
          let frameObject = { imageFrame: frame,width:canvas.width,height:canvas.height };
          setFrames((frames) => [...frames, frameObject]);
          video.currentTime += 0.1;
        }
      }, 42);
    }
  };
  const videoHandler = (key) => {
    const video = videoRef.current;
    if(key == "play"){
      setIsFrameView(false);
      // video.currentTime = videoTime;
    } else{
      setIsFrameView(true);
      // setVideoTime(video.currentTime); 
    }
  };
  const imageAnnotator = () => {
    contextData.dispatch({ type: "framesData", value: [...frames] });
    props.Redirectpath("/video-farmes-extactor");
  };
  const recordLoader=(subSrcPath)=>{
  service.get(`${recordSource}sourcePath=${subSrcPath}`,'arraybuffer').then((respones)=>{
      if(respones.data){
        const binaryData = new Blob([respones.data], { type: 'video/mp4' });
        let convertedData = URL.createObjectURL(binaryData);
        if (videoRef.current) {
        videoRef.current.src = convertedData;
        }
      }else{
      alert("Technical Error")
      }
      }).catch((e)=>alert("Please contact to research team"))
 
  }
const backHandler=()=>{
 props.Redirectpath("/");
}
  const subContent = () => {
    return videoSourcePath.map((data) => (
      <div style={{ padding: "3%" }} onClick={()=>recordLoader(data.url)}>
        <CardLayout
          borderRadius={"4px"}
          // backgroundColor={randomColor()}
          // backgroundImage={`url(${SampleImage})`}
          boxShadow={"inset 0px 0px 10px #00000029"}
          cardContent={
            <div>
              <div>
                <div
                  style={{ justifyContent: "space-between", display: "flex" }}
                >
                  <img src={SampleImage} width={"35px"} height={"35px"} />
                  <div>
                    {" "}
                    <SlideshowIcon
                      sx={{
                        fontSize: "2rem",
                        color: randomColor(),
                        cursor: "pointer",
                      }}
                    />{" "}
                  </div>
                </div>
                <h6 className="legend">Recording- {data.name}</h6>
              </div>
            </div>
          }
        />
      </div>
    ));
  };

  return (
    <div>
    <div className={classes.backButton}>
          <ActionButton
            buttonText={<><KeyboardArrowLeft /> {"Back to Home"}</>}
            handleSubmit={backHandler}
            backgroundImage={"#395d91d6"}
            borderRadius={"10px"}
            width={"fit-content"}
          />
        </div>
      <div>
        <ItemCarousel dataContent={subContent()} />
      </div>
      <div className={classes.mainRoot}>
     
        <CardLayout
          boxShadow={"inset 0px 0px 10px #00000029"}
          cardContent={
            <div>
                <video
                ref={videoRef}
                src={testVideo}
                controls
                style={{ padding: "10px", borderRadius: "15px" }}
                width="100%"
                onPause={() => videoHandler("pause")}
                onPlay={() => videoHandler("play")}
              />
              {isFrameView && (
                <div style={{ padding: "10px 22px" }}>
                  <ActionButton
                    buttonText={"Extract Frames"}
                    handleSubmit={extractImages}
                    backgroundColor={"#8c7eff"}
                    borderRadius={"10px"}
                  />
                </div>
              )}
            </div>
          }
        />
      </div>
      <div className={classes.mainRoot}>
        {frames && frames.length > 0 && (
          <Paper
            sx={{
              alignItems: "center",
              padding: "16px",
              bgcolor: "background.default",
            }}
          >
            <>
              <FrameViewer
                key={"videoTool"}
                frameHandler={() => {}}
                Redirectpath={props.Redirectpath}
                imageData={frames}
              />
              <div style={{ padding: "10px 22px" }}>
                <ActionButton
                  buttonText={"Annotation Editor"}
                  handleSubmit={imageAnnotator}
                  backgroundImage={
                    "linear-gradient(45deg, #eee4f8, transparent)"
                  }
                  borderRadius={"10px"}
                />
              </div>
            </>
          </Paper>
        )}
      </div>
    </div>
  );
}
