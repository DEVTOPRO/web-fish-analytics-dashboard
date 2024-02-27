import React, { useRef, useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Title from "./Title";
import ActionButton from "./Button";
import { makeStyles } from "@mui/styles";
import service from "../../api/apiSection/service";
import AlertMessage from "./AlertMessage";
import { zipfilePostUpload } from "../../api/apiSection/apiUrlConstent";
import {timeOutCaller} from "../../utils/utilSub/ArrayMethods";
const useStyles = makeStyles((theme) => ({
  boundingBox: {
    position: "absolute",
    border: "2px solid red" /* Set border color and thickness */,
    boxSizing: "border-box",
  },
  frameContainer: {
    position: "absolute",
    display: "inline-block",
    marginRight: "10px" /* Adjust spacing between frames */,
  },
  frame: {
    display: "block",
    width: "100%",
    height: "720",
  },
  buttonRoot: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
}));

export default function VideoToFrames(props) {
  const canvasFileImage = useRef(null);
  const canvasRef = useRef(null);
  const [errorMessage,setErrorMessage]=useState(null);
  const classes = useStyles();
  let sampleImg =
    "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60";

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvases = canvasFileImage.current;
    const context = canvas.getContext("2d");
    const context2 = canvases.getContext("2d");
    canvases.width = props.annotateInfo.width;
    canvases.height = props.annotateInfo.height;
    // Draw the background image
    const backgroundImage = new Image();
    backgroundImage.src = props.imageData
      ? props.imageData.imageFrame
      : sampleImg;
    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      context2.drawImage(
        backgroundImage,
        0,
        0,
        canvases.width,
        canvases.height
      );
      props.annotateInfo.coordiants &&
        props.annotateInfo.coordiants.length > 0 &&
        props.annotateInfo.coordiants.map((data) => {
          // Draw the rectangle box
          context.beginPath();
          context.strokeRect(
            data.xMin * 0.226,
            data.yMin * 0.37,
            data.strokeWidth * 0.265,
            data.strokeHeight * 0.3
          ); // (x, y, width, height)
          context.strokeStyle = "red"; // Set the border color
          context.lineWidth = 1; // Set the border width
          context.stroke();

          context2.beginPath();
          context2.strokeRect(
            data.xMin,
            data.yMin,
            data.strokeWidth,
            data.strokeHeight
          );
          context2.strokeStyle = "green";
          context2.lineWidth = 3;
          context2.stroke();
        });
    };
  }, []);

  const subXmlGenrator = (subAnnainfo) => {
    return `\t<object> 
     \t\t<name>${subAnnainfo.annotateName}</name> 
     \t\t<pose>0</pose> 
     \t\t<truncated>0</truncated> 
     \t\t<difficult>0</difficult> 
     \t\t<bndbox> 
     \t\t\t<xmin>${subAnnainfo.xMin}</xmin>
     \t\t\t<ymin>${subAnnainfo.yMin}</ymin> 
     \t\t\t<xmax>${subAnnainfo.xMax}</xmax> 
     \t\t\t<ymax>${subAnnainfo.yMax}</ymax> 
     \t\t</bndbox>
    \t</object>`;
  };
  const createZip = (key) => {
    const previewImage = getImage();
    const zip = new JSZip();
    let annotateInfo = props.annotateInfo;
    if (annotateInfo && Object.keys(annotateInfo).length > 0) {
      // const imageData = annotateInfo.imageString.split(",")[1];
      // zip.file(`${annotateInfo.imageName}.png`, imageData, { base64: true });
      zip.file(
        `PreviewAnnotation.png`,
        previewImage.split("base64,")[1],
        { base64: true }
      );
      // Generate XML for annotation
      let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
     <annotation> 
     \t<folder>${annotateInfo.folderName}</folder> 
     \t<filename>${annotateInfo.imageName}</filename> 
     \t<path>/${annotateInfo.folderName}/${annotateInfo.imageName}.png</path> 
     \t<source> 
     \t\t<database>${annotateInfo.database}</database> 
     \t</source> 
     \t<size> 
     \t\t<width>${annotateInfo.width}</width> 
     \t\t<height>${annotateInfo.height}</height> 
     \t\t<depth>${annotateInfo.depth}</depth> 
     \t</size> 
     ${annotateInfo.coordiants && annotateInfo.coordiants.length > 0 && annotateInfo.coordiants.map((subAnaInfo) => subXmlGenrator(subAnaInfo))}\n
     </annotation>`;
      zip.file(`Annotation.xml`, xmlString);
    } else {
      console.log("There is no annation");
      setErrorMessage({message:"Error At creation of XML creation, Please contact with admin team",status:"error"});
    }
    zip
      .generateAsync({type: "blob"})
      .then((content) => {
        if(key==="download"){
          saveAs(content,`${annotateInfo.imageName}.zip`);
        }else{
        let formData = new FormData();
        formData.append("files", content, `${annotateInfo.imageName}.zip`, {
          contentType: "application/zip",
        });
        formData.append("userId", "Team3");
        service
          .create(zipfilePostUpload, formData)
          .then((respones) => {
            if (respones.data.status === "success") {
              alert("Data loaded successfully");
              setErrorMessage({message:"Successful information is submitted to Traning tool",status:"success"});
            } else {
              setErrorMessage({message:"Technical Error",status:"error"});
            }
          })
          .catch((e) => {
            console.log("Please contact to admin team");
            setErrorMessage({message:"Technical Error, Please Contact with admin team",status:"error"});

          });
        }
      })
      .catch((e) => {
        console.log("Check");
      setErrorMessage({message:"Error At creation of Zip creation, Please contact with admin team",status:"error"});

      });
      timeOutCaller(setErrorMessage,5000);
  };
  const getImage = (key) => {
    const canvases = canvasFileImage.current;
    if (key == "download") {
      const link = document.createElement("a");
      link.href = canvases.toDataURL("image/png");
      link.download = "canvas_images.png";
      link.click();
    } else {
      return canvases.toDataURL("image/png");
    }
  };

  return (
    <div>
      {errorMessage&&<AlertMessage message={errorMessage.message} status={errorMessage.status}/>}
      <div style={{ padding: "2%" }}>
        <canvas ref={canvasRef} width={920} height={720}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
        <canvas ref={canvasFileImage} style={{ display: "contents" }}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      <div className={classes.buttonRoot}>
        <ActionButton
          buttonText={"Download Annotation"}
          handleSubmit={() => createZip("download")}
          width={"fit-content"}
          backgroundColor="#b7c46b"
          borderRadius={"10px"}
        />
        <ActionButton
          buttonText={"Submit XMl to Frigate"}
          handleSubmit={()=>createZip()}
          backgroundColor="#8c7eff"
          width={"fit-content"}
          borderRadius={"10px"}
        />
      </div>
    </div>
  );
}
