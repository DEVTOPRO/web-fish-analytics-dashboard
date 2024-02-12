import React, { useRef, useEffect, useState, useContext } from "react";
import CardLayout from "../common/components/CardLayout";
import SampleImage from "../assets/fishjum.svg";
import ItemCarousel from "../common/components/Carousel";
import BackgroundPoster from "../assets/BackgroudPoster.png";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { makeStyles } from "@mui/styles";
import testVideo from "../assets/testclip.MP4";
import FrameViewer from "../common/components/FrameViewer";
import ActionButton from "../common/components/Button";
import Context from "../context/Context";
import Paper from "@mui/material/Paper";

export const defaultShapeStyle = {
  /** text area **/
  padding: 5, // text padding
  fontSize: 12, // text font size
  fontColor: "#212529", // text font color
  fontBackground: "#f8f9fa", // text background color
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",

  /** stroke style **/
  lineWidth: 2, // stroke width
  shapeBackground: "hsla(210, 16%, 93%, 0.2)", // background color in the middle of the marker
  shapeStrokeStyle: "#f8f9fa", // shape stroke color
  shadowBlur: 10, // stroke shadow blur
  shapeShadowStyle: "hsla(210, 9%, 31%, 0.35)", // shape shadow color

  /** transformer style **/
  transformerBackground: "#5c7cfa",
  transformerSize: 10,
};
const useStyles = makeStyles((theme) => ({
  videoCards: {
    color: "#4839be",
  },
  mainRoot: {
    padding: "20px 0px",
  },
}));
export default function VideoCollection(props) {
  const classes = useStyles();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const contextData = useContext(Context);

  const [frames, setFrames] = useState([]);
  const [imageData, setImageDate] = useState(null);
  const [isFrameView, setIsFrameView] = useState(false);
  let sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const extractImages = () => {
    const video = videoRef.current;
    const initialTime = video.currentTime;
    const endTime = initialTime + 1;
    if (videoRef.current) {
      let count = 0;
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
          let frameObject = { imageFrame: frame };
          setFrames((frames) => [...frames, frameObject]);
          video.currentTime += 0.1;
          count++;
        }
      }, 42);
    }
  };
  const videoHandler = (key) => {
    console.log("ref data");
    key == "play" ? setIsFrameView(false) : setIsFrameView(true);
  };
  const imageAnnotator = () => {
    contextData.dispatch({ type: "framesData", value: [...frames] });
    props.Redirectpath("/video-farmes-extactor  ");
  };
  const subContent = () => {
    return sample.map((data) => (
      <div style={{ padding: "3%" }}>
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
                <h6 className="legend">Legend {data}</h6>
              </div>
            </div>
          }
        />
      </div>
    ));
  };
  return (
    <div>
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
                type="video/mp4"
                style={{ padding: "10px", borderRadius: "15px" }}
                width="100%"
                controls
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
