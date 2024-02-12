import React, { useState,useEffect, useRef,useContext } from 'react';
import {ReactPictureAnnotation} from 'react-picture-annotation'
// import sample from './yf6d9SX.jpg'
import Context from '../context/Context';
import FrameViewer from "../common/components/FrameViewer";
import ActionButton from '../common/components/Button';
import { Box, Grid,Paper } from '@mui/material';
import CardLayout from '../common/components/CardLayout';
import Input from "../common/components/Input";
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
  transformerSize: 1
};
export default function AnnotationEditor(props) {
  const ref=useRef(null);
  const canvasRef=useRef(null);
  const contextData=useContext(Context);
  const [pageSize, setPageSize] = useState({
    width: 800,
    height: 800
  });
  const [imageData,setImageData]=useState(0);
const [imageUrl,setImageUrl]=useState("")
  const onResize = () => {
    setPageSize({ width: 900, height: 900 });
  };

  useEffect(() => {
    onResize()
  }, [])
  const handleDownload = () => {
    const canvas = canvasRef.current;
    console.log(canvas,canvas.current)
    if (canvas) {
      const dataURL = canvas.toDataURL(); // Convert canvas content to data URL
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'annotated_image.png'; // Specify the desired file name and format
      a.click();
    }
  };
const imageAnnotator=()=>{
let imageSrc=contextData.state.framesData.find((imageInfo,index)=>index==imageData).imageFrame;
console.log(imageSrc);
setImageUrl(imageSrc);
}
  const frameDataHandler=(imageIndex)=>{
    setImageData(imageIndex);
  }
  const onSelect = selectedId => console.log(selectedId);
  const onChange = data => console.log(data);
    return (
        <>
        <div>  <Paper
            sx={{
              alignItems: "center",
              padding: "16px",
              bgcolor: "background.default",
            }}
          ><>
            {contextData.state.framesData&& contextData.state.framesData.length>0&&<FrameViewer  key={"videoTool"}  frameHandler={frameDataHandler} Redirectpath={props.Redirectpath} imageData={contextData.state.framesData}/>}
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
        </div>
        <CardLayout
         boxShadow={"inset 0px 0px 10px #00000029"}
         cardContent={
            <div>
                 <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9}  style={{height:"600px",width:"700px",background:"aliceblue"}}>
            <ReactPictureAnnotation
         annotationStyle={defaultShapeStyle}
          image={imageUrl?imageUrl:'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'}
          scrollSpeed={0}
          onSelect={onSelect}
          onChange={onChange}
          defaultAnnotationSize={1}
          width={700}
          height={700}
          ref={canvasRef}
        />
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} >
           <Input
            name="agentOtp"
            // inputRef={register('firstName', {
            //   required: true,
            //   maxLength: 6,
            // })}
            type="text"
           />
        <ActionButton
                  buttonText={"Genrato XMl"}
                  handleSubmit={imageAnnotator}
                  backgroundImage={
                    "linear-gradient(45deg, #eee4f8, transparent)"
                  }
                  borderRadius={"10px"}
                />
        </Grid>
          </Grid>
        </div>
             }
        /> 

            
        </>
    );
}

