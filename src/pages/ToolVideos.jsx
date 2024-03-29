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
import {
  recordSourcePath,
  recordSource,
} from "../api/apiSection/apiUrlConstent";
import Loading from "../common/components/AppLoading";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// "/media/frigate"
const useStyles = makeStyles((theme) => ({
  videoCards: {
    color: "#4839be",
  },
  mainRoot: {
    padding: "4%",
  },
  backButton: {
    padding: "2% 10px 10px",
    transition: "transform .3s",
    "&:hover": {
      transform: "scale(0.95)",
    },
  },
  videoCard: {
    padding: "3%",
    cursor: "pointer",
    transition: "transform .4s",
    "&:hover": {
      transform: "scale(0.85)",
    },
  },
  recordLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#191717e6",
  },
}));
export default function VideoCollection(props) {
  const classes = useStyles();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextData = useContext(Context);
  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFrameView, setIsFrameView] = useState(false);
  const [videoTime, setVideoTime] = useState(null);
  const [videoSourcePath, setvideoSourcePath] = useState([]);
  let sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
  useEffect(() => {
    console.log("props",props);
    if (props.keyValue) {
      if (videoRef.current) {
        videoRef.current.src = props.videoData.fileData;
      }
    } else {
    setLoading(true);
      service
        .get(
          `${recordSourcePath}subPath=${contextData.state.path ? contextData.state.path : window.sessionStorage.getItem("viewPath")}`
        )
        .then((respones) => {
          if (respones.data.status == "success" && respones.data.data) {
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
  }, []);

  const extractImages = () => {
    setLoading(true);
    setFrames([]);
    let referFrames = [];
    const video = videoRef.current;
    const initialTime = video.currentTime;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const endTime = initialTime + 1;
    if (videoRef.current) {
      const interval = setInterval(() => {
        if (
          endTime <= video.currentTime ||
          video.duration === video.currentTime
        ) {
          setFrames(referFrames);
          clearInterval(interval);
          setLoading(false);
        } else {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL("image/png");
          let frameObject = {
            imageFrame: frame,
            width: canvas.width,
            height: canvas.height,
          };
          referFrames.push(frameObject);
        }
        video.currentTime += 0.1;
      }, 10);
    }
  };
  const videoHandler = (key) => {
    const video = videoRef.current;
    if (key == "play") {
      setIsFrameView(false);
      // video.currentTime = videoTime;
    } else {
      setIsFrameView(true);
      // setVideoTime(video.currentTime);
    }
  };
  const imageAnnotator = () => {
    contextData.dispatch({ type: "framesData", value: [...frames] });
    props.Redirectpath("/video-farmes-extactor");
  };
  const recordLoader = (subSrcPath) => {
    service
      .get(`${recordSource}sourcePath=${subSrcPath}`, "arraybuffer")
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
  };
  const backHandler = () => {
    props.Redirectpath("/");
  };
  // rgba(136, 51, 153, 0.133)
  const subContent = () => {
    return videoSourcePath.map((data, index) => (
      <div className={classes.videoCard} onClick={() => recordLoader(data.url)}>
        <CardLayout
          borderRadius={"4px"}
          // backgroundColor={randomColor()}
          backgroundImage={
            index % 2 == 0
              ? "radial-gradient(circle, rgb(223 196 176) 0%, rgb(148 187 233 / 72%) 100%)"
              : "linear-gradient(306deg, #924fd5de, transparent)"
          }
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
                <p className={classes.recordLabel}>Recording- {data.name}</p>
              </div>
            </div>
          }
        />
      </div>
    ));
  };

  return (
    <div>
      <Loading open={loading} />
      <div className={classes.backButton} style={{display:props.keyValue?"none":"block"}}>
        <ActionButton
          buttonText={
            <>
              <KeyboardArrowLeft /> {"Back to Home"}
            </>
          }
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
