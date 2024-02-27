import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import Context from "../context/Context";
import FrameViewer from "../common/components/FrameViewer";
import ActionButton from "../common/components/Button";
import { Box, Grid, Paper } from "@mui/material";
import CardLayout from "../common/components/CardLayout";
import Input from "../common/components/Input";
import PreviewAndXmlGenerator from "../common/components/PreviewAndXmlGenerator";
import Label from "../common/components/label";
import CustomModel from "../common/components/modal";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import { useForm } from 'react-hook-form';
import Select from "../common/components/Select";
import { makeStyles } from '@mui/styles';
import AlertMessage from "../common/components/AlertMessage";
import { defaultTimeAndDateFormater } from "../utils/utilSub/Date";

const useStyles = makeStyles(theme => ({
  backButton: {
    padding: '2% 10px 10px',
    transition: "transform .3s",
    "&:hover": {
      transform: "scale(0.95)",
    },
  },
  mainRoot: {
    padding: "2% 8%",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f0f0",
  },
  submitButton:{
    padding:'10px 0px'
  }
})) 
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
export default function AnnotationEditor(props) {
  const classes = useStyles()
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const contextData = useContext(Context);
  const [annotations, setAnnotations] = React.useState([]);
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
  const [imageData, setImageData] = useState(0);
  const [imageObj, setImageObj] = useState(contextData.state.framesData&&contextData.state.framesData.length>0?contextData.state.framesData[0]:null);
  const [annotateInfo, setAnnotateInfo] = useState();
  const [model, setModel] = useState(false);
  const [fieldSize,setFieldSize]=useState(["1"]);
  const [errorMessage,setErrorMessage]=useState(null);


  const imageAnnotator = () => {
    let imageObj = contextData.state.framesData.find(
      (imageInfo, index) => index == imageData
    );
    console.log(imageObj);
    setImageObj(imageObj);
  };
  const frameDataHandler = (imageIndex) => {
    setImageData(imageIndex);
  };
  const handleModalClose = () => {
    setModel(false);
  };
  const getImage = (data) => {
    console.log(data,"data");
    let sampleObject = {};
    sampleObject.folderName = "My project";
    sampleObject.imageName = `flexCamera_AnnotatInfo_${defaultTimeAndDateFormater()}`;
    sampleObject.database = "File System";
    sampleObject.width = imageObj.width;
    sampleObject.height = imageObj.height;
    sampleObject.imageString = imageObj.imageFrame;
    sampleObject.depth = 3;
    sampleObject.coordiants = annotations.map((annotateData,index) => {
     let coordiants={};
       coordiants.xMax = Math.round(annotateData.mark.x + annotateData.mark.width);
       coordiants.yMax = Math.round(annotateData.mark.y + annotateData.mark.height);
       coordiants.xMin = Math.round(annotateData.mark.x);
       coordiants.yMin = Math.round(annotateData.mark.y);
       coordiants.strokeWidth = Math.round(annotateData.mark.width);
       coordiants.strokeHeight = Math.round(annotateData.mark.height);
       coordiants.pose=data.pose;
       coordiants.diffcult=data.difficult;
       coordiants.truncated=data.truncated;
       coordiants.annotateName = annotateData.comment ? annotateData.comment : data[`fishType${index}`];
      return coordiants;
    });
    console.log(sampleObject,"sampleObject");
    setAnnotateInfo(sampleObject);
    setModel(true);
  };
  const onSelect = (selectedId) => console.log(selectedId);
  const onChange = (data) => {
    console.log("Latest value:", data);
    data&&data.length>0&&data.map((val)=>{
      if(val&&val.mark.x>0&&val.mark.y>0&&val.mark.width>0){
        setAnnotations(data);
        setErrorMessage(null)
      }else{
        setErrorMessage("Please Annontate the within image range");
      }
    })
    if(data&&data.length>1){
      let array = new Array(data.length).fill("1");
      setFieldSize(array)
    }else{
      setFieldSize(['1'])
    }
  };
  const backHandler = () => {
    props.Redirectpath("/video-farmes-viewer");
  };
  window.onload = (event) => {
    props.Redirectpath("/video-farmes-viewer");
  };
  if(contextData.state.path){
  window.sessionStorage.setItem("viewPath",contextData.state.path);
  }
  
  return (
    <>
     <div className={classes.backButton}>
          <ActionButton
            buttonText={<><KeyboardArrowLeft /> Back to Frame</>}
            handleSubmit={backHandler}
            backgroundImage={"#395d91d6"}
            borderRadius={"10px"}
            width={"fit-content"}
          />
        </div>
      <div className={classes.mainRoot}>       
        <Paper
          sx={{
            alignItems: "center",
            padding: "16px",
            bgcolor: "background.default",
          }}
        >
          <>
            {contextData.state.framesData &&
              contextData.state.framesData.length > 0 && (
                <FrameViewer
                  key={"videoTool"}
                  frameHandler={frameDataHandler}
                  Redirectpath={props.Redirectpath}
                  imageData={contextData.state.framesData}
                />
              )}
            <div style={{ padding: "10px 22px" }}>
              <ActionButton
                buttonText={"Load Image to Annotation Editor"}
                handleSubmit={imageAnnotator}
                backgroundImage={"linear-gradient(45deg, #eee4f8, transparent)"}
                borderRadius={"10px"}
              />
            </div>
          </>
        </Paper>
      </div>
     <div style={{margin:"20px"}}>
        <CardLayout
          boxShadow={"inset 0px 0px 10px #00000029"}
          cardContent={
            <div>
              {errorMessage&&<AlertMessage message={errorMessage} status={"error"}/>}
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={10}
                  lg={10}
                  xl={10}
                  style={{
                    height: "600px",
                    width: "100%",
                    background: "aliceblue",
                  }}
                  ref={imageRef}
                >
                  <ReactPictureAnnotation
                    annotationStyle={defaultShapeStyle}
                    image={
                      imageObj
                        ? imageObj.imageFrame
                        : "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
                    }
                    scrollSpeed={0}
                    onSelect={onSelect}
                    onChange={onChange}
                    defaultAnnotationSize={1}
                    width={780}
                    height={700}
                    ref={canvasRef}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                <Box
                component="typography"
                sx={{
                  width: '95%',
                  fontWeight:'600',
                  fontSize:"13px"
                }} > {"Additional Information"}</Box>
                    {fieldSize.length>0 && fieldSize.map((field,index)=>{ 
                  return(
                  <>
                  <Label labelName={`Name of Fish${index+1}*`} />
                  <Select
                    displayValue="name"
                    keyValue="value"
                    listItems={[{name:"Salmana",value:'salmana'},{name:"White fish",value:'white fish'}]}
                    inputRef={register(`fishType${index}`, {
                    })}
                  />
                   </>)})}
                  <Label labelName={"Pose *"} />
                  <Input
                    name="pose"
                    inputRef={register('pose', {
                      required: true,
                    })}
                    type="text"
                  />
                  <Label labelName={"Truncated *"} />
                  <Input
                    name="truncated"
                    inputRef={register('truncated', {
                      required: true,
                    })}
                    type="text"
                  />
                  <Label labelName={"Difficult *"} />
                  <Input
                    name="difficult"
                    inputRef={register('difficult', {
                      required: true,
                    })}
                    type="text"
                  />
                <div className={classes.submitButton}>
                  <ActionButton
                    buttonText={"Submit XMl"}
                    handleSubmit={handleSubmit(getImage)}
                    backgroundColor="#8c7eff"
                    borderRadius={"10px"}
                  />
                  </div>
                </Grid>
              </Grid>
            </div>
          }
        />
              </div>

      <div>
        <CustomModel
          paddingTop={"0px"}
          modalContent={
            <div>
              <div style={{ padding: "12px" }}>
                <PreviewAndXmlGenerator
                  imageData={imageObj}
                  annotateInfo={annotateInfo}
                />
              </div>
             
            </div>
          }
          modalTitle="Preview"
          handleClose={handleModalClose}
          open={model}
          disableWidth={false}
        />
      </div>
    </>
  );
}
