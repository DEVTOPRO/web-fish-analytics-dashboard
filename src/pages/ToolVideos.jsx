import React,{useRef,useEffect,useState} from "react";
import CardLayout from "../common/components/CardLayout";
import SampleImage from "../assets/fishjum.svg";
import ItemCarousel from "../common/components/Carousel";
import BackgroundPoster from "../assets/BackgroudPoster.png";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import { makeStyles } from "@mui/styles";
import testVideo from "../assets/testclip.MP4";
import FrameViewer from "../common/components/FrameViewer";
const useStyles = makeStyles((theme) => ({
  videoCards: {
    color: "#4839be",
  },
  mainRoot:{
    padding:"20px 0px"
  }
}));
export default function VideoCollection(props) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const classes= useStyles();
    const [frames, setFrames] = useState([]);
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
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL('image/png');
          let frameObject={imageFrame:frame}
          setFrames((frames) => [...frames, frameObject]);
          video.currentTime += 0.1;
          count++;
        }
      }, 42);
    }
  };
  const videoHandler=()=>{
    console.log("ref data")
  }
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
      <div >
        <ItemCarousel dataContent={subContent()} />
      </div>
      <div className={classes.mainRoot}>
     <CardLayout
      boxShadow={"inset 0px 0px 10px #00000029"}
     cardContent={
        <div>
     <video ref={videoRef} src={testVideo} type="video/mp4" style={{padding:"10px",borderRadius:'15px'}} width="100%" controls onPause={videoHandler}/>
            </div>
     }/>
      </div>
      <div className={classes.mainRoot}>
      {/* {frames && frames.length>0 && <FrameViewer imageData={frames}/>} */}
      <FrameViewer imageData={frames}/>
      </div>
    </div>
  );
}

 