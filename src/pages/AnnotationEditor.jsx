import React, { useState } from "react";
import { ReactPictureAnnotation } from "react-picture-annotation";
import { Box, Grid, Paper } from "@mui/material";
import { makeStyles } from '@mui/styles';
import FrameViewer from "../common/components/FrameViewer";
import ActionButton from "../common/components/Button";
import CardLayout from "../common/components/CardLayout";
import Input from "../common/components/Input";
import Label from "../common/components/label";
import CustomModel from "../common/components/modal";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import { useForm } from 'react-hook-form';
import { useScreenshot } from "use-react-screenshot";
import Context from "../context/Context";
import PreviewAndXmlGenerator from "../common/components/PreviewAndXmlGenerator";

const useStyles = makeStyles(theme => ({
  backButton: {
    padding: '10px',
    transition: "transform .2s",
    "&:hover": {
      transform: "scale(1.0)"
    },
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f0f0",
  },
}));

const defaultShapeStyle = {
  padding: 5,
  fontSize: 12,
  fontColor: "#212529",
  fontBackground: "#f8f9fa",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, sans-serif",
  lineWidth: 2,
  shapeBackground: "hsla(210, 16%, 93%, 0.2)",
  shapeStrokeStyle: "#f8f9fa",
  shadowBlur: 10,
  shapeShadowStyle: "hsla(210, 9%, 31%, 0.35)",
  transformerBackground: "#5c7cfa",
  transformerSize: 10,
};

const AnnotationEditor = (props) => {
  const classes = useStyles();
  const canvasRef = React.useRef(null);
  const imageRef = React.useRef(null);
  const contextData = React.useContext(Context);
  const [annotateInfo, setAnnotateInfo] = React.useState();
  const [model, setModel] = React.useState(false);
  const [imageData, setImageData] = React.useState(0);
  const [imageObj, setImageObj] = React.useState(null);
  const [annotations, setAnnotations] = React.useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, takeScreenShot] = useScreenshot();

  const handleAnnotationChange = (data) => {
    console.log("Updated annotations:", data);
    setAnnotations(data);
  };

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
    let sampleObject = {};
    sampleObject.folderName = "my project";
    sampleObject.imageName = "cameraname_flex_frame_index";
    sampleObject.database = "file System";
    sampleObject.width = imageObj.width;
    sampleObject.height = imageObj.height;
    sampleObject.imageString = imageObj.imageFrame;
    sampleObject.depth = 3;
    sampleObject.coordiants = annotations.map((annotateData) => {
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
      coordiants.annotateName = data.comment ? data.comment : "fish view";
      return  coordiants;
    });
    console.log("sampleObject", sampleObject);
    setAnnotateInfo(sampleObject);
    setModel(true);
  };

  const onSelect = (selectedId) => console.log(selectedId);
  const onChange = (data) => {
    console.log("Latest value:", data);
    setAnnotateInfo(data);
  };

  const backHandler = () => {
    props.Redirectpath("/video-farmes-viewer");
  };

  return (
    <>
      <div>
        <div className={classes.backButton}>
          <ActionButton
            buttonText={<><KeyboardArrowLeft /> Back to Frame</>}
            handleSubmit={backHandler}
            backgroundImage={"#395d91d6"}
            borderRadius={"10px"}
            width={"fit-content"}
          />
        </div>{" "}
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
                buttonText={"Annotation Editor"}
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
              <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={9}
                  lg={9}
                  xl={9}
                  style={{
                    height: "900px",
                    width: "800px",
                    background: "aliceblue",
                    fontSize: "16px",
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
                    width={900}
                    height={900}
                    ref={canvasRef}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
                  <Box
                    component="typography"
                    sx={{ width: '95%' }}
                  > {"Additional Information"}</Box>
                  <Label labelName={"Pose *"} />
                  <Input
                    name="pose"
                    inputRef={register('pose', { required: true })}
                    type="text"
                  />
                  <Label labelName={"Truncated *"} />
                  <Input
                    name="truncated"
                    inputRef={register('truncated', { required: true })}
                    type="text"
                  />
                  <Label labelName={"Difficult *"} />
                  <Input
                    name="difficult"
                    inputRef={register('difficult', { required: true })}
                    type="text"
                  />
                  <ActionButton
                    buttonText={"Generate XML"}
                    handleSubmit={handleSubmit(getImage)}
                    backgroundColor="#8c7eff"
                    borderRadius={"10px"}
                  />
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

export default AnnotationEditor;
