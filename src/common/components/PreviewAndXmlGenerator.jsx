import React, { useRef, useState,useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Title from './Title';
import ActionButton from './Button';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  boundingBox:{
    position: "absolute",
    border: "2px solid red", /* Set border color and thickness */
    boxSizing: "border-box",
  },
  frameContainer: {
    position: "absolute",
    display: "inline-block",
    marginRight: "10px" /* Adjust spacing between frames */
  },
  frame: {
    display: "block",
    width:"100%",
    height: "720",
  }
}))

export default function VideoToFrames (props){
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const classes = useStyles();
  let sampleImg="https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60";

  useEffect(()=>{  
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the background image
    const backgroundImage = new Image();
    backgroundImage.src = props.imageData?props.imageData.imageFrame:sampleImg;
    backgroundImage.onload = () => {
      context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      props.annotateInfo.coordiants&& props.annotateInfo.coordiants.length>0&& props.annotateInfo.coordiants.map((data)=>{
      // Draw the rectangle box
      context.beginPath();
      context.strokeRect((data.xMin*0.550), data.yMin, (data.strokeWidth*0.550), data.strokeHeight); // (x, y, width, height)
      context.strokeStyle = 'red'; // Set the border color
      context.lineWidth = 1; // Set the border width
      context.stroke();
    });
    }
 console.log("props.imageData",props.imageData)
  },[])

const subXmlGenrator=(subAnnainfo)=>{

 return `\t<object> 
     \t\t<name>${subAnnainfo.annotateName}</name> 
     \t\t<pose>Unspecified</pose> 
     \t\t<truncated>0</truncated> 
     \t\t<difficult>0</difficult> 
     \t\t<bndbox> 
     \t\t\t<xmin>${subAnnainfo.xMin}</xmin>
     \t\t\t<ymin>${subAnnainfo.yMin}</ymin> 
     \t\t\t<xmax>${subAnnainfo.xMax}</xmax> 
     \t\t\t<ymax>${subAnnainfo.yMax}</ymax> 
     \t\t</bndbox>
    \t</object>`
}
const createZip = () => {
    const zip = new JSZip();
    let annotateInfo=props.annotateInfo;
    if(annotateInfo&&Object.keys(annotateInfo).length>0){
      const imageData = annotateInfo.imageString.split(',')[1];
      zip.file(`${annotateInfo.imageName}.png`, imageData, { base64: true });
      // Generate XML for annotation
      let xmlString = `<?xml version="1.0" encoding="UTF-8"?> <annotation> 
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
     ${annotateInfo.coordiants&&annotateInfo.coordiants.length>0&&annotateInfo.coordiants.map((subAnaInfo)=>subXmlGenrator(subAnaInfo))}\n
     </annotation>`;
    zip.file(`${annotateInfo.imageName}.xml`, xmlString);
    }else{
      console.log("There is no annation")
    }
 
    zip.generateAsync({ type: 'blob' })
      .then(content => {
        saveAs(content, 'frames_and_annotations.zip');
      }).catch(error => console.error('Error creating ZIP file:', error));
  };
   console.log(props.annotateInfo,"props.annotateInfo");
  return (
    <div>
      <div style={{ padding: "2%" }}>
        <canvas ref={canvasRef} width={700} height={720}>
          Your browser does not support the HTML5 canvas tag.
        </canvas>
      </div>
      <ActionButton
        buttonText={"Genrato XMl"}
        handleSubmit={createZip}
        backgroundColor="#8c7eff"
        borderRadius={"10px"}
      />
    </div>
  );
};
