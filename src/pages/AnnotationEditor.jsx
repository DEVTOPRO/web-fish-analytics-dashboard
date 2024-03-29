import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { ReactPictureAnnotation ,DefaultInputSection} from "react-picture-annotation";
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
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";
import Select from "../common/components/Select";
import { makeStyles } from "@mui/styles";
import AlertMessage from "../common/components/AlertMessage";
import { defaultTimeAndDateFormater } from "../utils/utilSub/Date";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckBox from "../common/components/CheckBox";
import {colorCodes} from "../utils/utilSub/localization";
const useStyles = makeStyles((theme) => ({
  backButton: {
    padding: "2% 10px 10px",
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
  submitButton: {
    padding: "10px 0px",
  },
  annotationInput:{
    display:'flex',
    justifyContent:"space-between"
  }
}));
export default function AnnotationEditor(props) {
  let colorLabel = colorCodes;  
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
  const classes = useStyles();
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const contextData = useContext(Context);
  const [annotations, setAnnotations] = React.useState([]);
  const [colorCode, setColorCode] = useState(0);
  const [typeOfSpecies, setTypeOfSpecies] = useState([
      { "name": "Salmon", "value": "salmon" },
      { "name": "Trout", "value": "trout" },
      { "name": "Walleye", "value": "walleye" },
      { "name": "Yellow Perch", "value": "yellow perch" },
      { "name": "Barramundi", "value": "barramundi" },
      { "name": "Bluegill", "value": "bluegill" },
      { "name": "Catfish", "value": "catfish" },
      { "name": "Chinook Salmon", "value": "chinook salmon" },
      { "name": "Coho Salmon", "value": "coho salmon" },
      { "name": "Dolphinfish", "value": "dolphinfish" },
      { "name": "Eel", "value": "eel" },
      { "name": "Flounder", "value": "flounder" },
      { "name": "Grouper", "value": "grouper" },
      { "name": "Halibut", "value": "halibut" },
      { "name": "Herring", "value": "herring" },
      { "name": "Mackerel", "value": "mackerel" },
      { "name": "Mahi Mahi", "value": "mahi mahi" },
      { "name": "Marlin", "value": "marlin" },
      { "name": "Perch", "value": "perch" },
      { "name": "Pike", "value": "pike" },
      { "name": "Redfish", "value": "redfish" },
      { "name": "Sablefish", "value": "sablefish" },
      { "name": "Sardine", "value": "sardine" },
      { "name": "Swordfish", "value": "swordfish" },
      { "name": "Tilapia", "value": "tilapia" },
      { "name": "Tuna", "value": "tuna" },
      { "name": "Wahoo", "value": "wahoo" },
      { "name": "Yellowtail", "value": "yellowtail" },
      { "name": "Bream", "value": "bream" },
      { "name": "Carp", "value": "carp" },
      { "name": "Cod", "value": "cod" },
      { "name": "Dory", "value": "dory" },
      { "name": "Gar", "value": "gar" },
      { "name": "Goby", "value": "goby" },
      { "name": "Mullet", "value": "mullet" },
      { "name": "Piranha", "value": "piranha" },
      { "name": "Rudd", "value": "rudd" },
      { "name": "Scup", "value": "scup" },
      { "name": "Shad", "value": "shad" },
      { "name": "Sheepshead", "value": "sheepshead" },
      { "name": "Tautog", "value": "tautog" },
      { "name": "Tilefish", "value": "tilefish" },
      { "name": "Triggerfish", "value": "triggerfish" },
      { "name": "Wrasse", "value": "wrasse" },
      { "name": "Alewife", "value": "alewife" },
      { "name": "Anchovy", "value": "anchovy" },
      { "name": "Barracuda", "value": "barracuda" },
      { "name": "Bluefish", "value": "bluefish" },
      { "name": "Buffalo Fish", "value": "buffalo fish" },
      { "name": "Butterfish", "value": "butterfish" },
      { "name": "Chub", "value": "chub" },
      { "name": "Cobia", "value": "cobia" },
      { "name": "Crappie", "value": "crappie" },
      { "name": "Dab", "value": "dab" },
      { "name": "Dace", "value": "dace" },
      { "name": "Dartfish", "value": "dartfish" },
      { "name": "Dogfish", "value": "dogfish" },
      { "name": "Drum", "value": "drum" },
      { "name": "Grunion", "value": "grunion" },
      { "name": "Gudgeon", "value": "gudgeon" },
      { "name": "Haddock", "value": "haddock" },
      { "name": "Hake", "value": "hake" },
      { "name": "Hoki", "value": "hoki" },
      { "name": "Jackfish", "value": "jackfish" },
      { "name": "Jewfish", "value": "jewfish" },
      { "name": "John Dory", "value": "john dory" },
      { "name": "Lingcod", "value": "lingcod" },
      { "name": "Lizardfish", "value": "lizardfish" },
      { "name": "Mandarin Fish", "value": "mandarin fish" },
      { "name": "Menhaden", "value": "menhaden" },
      { "name": "Monkfish", "value": "monkfish" },
      { "name": "Opah", "value": "opah" },
      { "name": "Orange Roughy", "value": "orange roughy" },
      { "name": "Parrotfish", "value": "parrotfish" },
      { "name": "Pomfret", "value": "pomfret" },
      { "name": "Rainbow Trout", "value": "rainbow trout" },
      { "name": "Ribbonfish", "value": "ribbonfish" },
      { "name": "Rockfish", "value": "rockfish" },
      { "name": "Rosefish", "value": "rosefish" },
      { "name": "Ruffe", "value": "ruffe" },
      { "name": "Sailfish", "value": "sailfish" },
      { "name": "Sauger", "value": "sauger" },
      { "name": "Scorpionfish", "value": "scorpionfish" },
      { "name": "Silverside", "value": "silverside" },
      { "name": "Sole", "value": "sole" },
      { "name": "Sturgeon", "value": "sturgeon" },
      { "name": "Surgeonfish", "value": "surgeonfish" },
      { "name": "Tilapia", "value": "tilapia" },
      { "name": "Toadfish", "value": "toadfish" },
      { "name": "Tomcod", "value": "tomcod" },
      { "name": "Tripletail", "value": "tripletail" },
      { "name": "Tuskfish", "value": "tuskfish" },
      { "name": "Wolffish", "value": "wolffish" },
      { "name": "Yellowfin Tuna", "value": "yellowfin tuna" },
      { "name": "Zander", "value": "zander" },
      { "name": "Zebra Fish", "value": "zebra fish" }
        ]);
  const [imageData, setImageData] = useState(0);
  const [imageObj, setImageObj] = useState(
    contextData.state.framesData && contextData.state.framesData.length > 0
      ? contextData.state.framesData[0]
      : null
  );
  const [annotateInfo, setAnnotateInfo] = useState();
  const [model, setModel] = useState(false);
  const [fieldSize, setFieldSize] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isChecked, setChecked] = useState(false);
  const [selectId,setSelectId]=useState("");
  const [fieldInfo,setFieldInfo]=useState([]);

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
  const randomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const getImage = (data) => {
    console.log(data, "data");
    console.log("Final Data",annotations);
    if(isChecked){
    let sampleObject = {};
    sampleObject.folderName = "My project";
    sampleObject.imageName = `flexCamera_AnnotatInfo_${defaultTimeAndDateFormater()}`;
    sampleObject.database = "File System";
    sampleObject.width = imageObj.width;
    sampleObject.height = imageObj.height;
    sampleObject.imageString = imageObj.imageFrame;
    sampleObject.depth = 3;
    sampleObject.speciesType=fieldInfo
    sampleObject.coordiants = annotations.map((annotateData, index) => {
      let coordiants = {};
      coordiants.xMax = Math.round(
        annotateData.mark.x + annotateData.mark.width
      );
      coordiants.yMax = Math.round(
        annotateData.mark.y + annotateData.mark.height
      );
      coordiants.xMin = Math.round(annotateData.mark.x);
      coordiants.yMin = Math.round(annotateData.mark.y);
      coordiants.strokeWidth = Math.round(annotateData.mark.width);
      coordiants.strokeHeight = Math.round(annotateData.mark.height);
      coordiants.pose = data.pose;
      coordiants.diffcult = data.difficult;
      coordiants.truncated = data.truncated;
      coordiants.comment = annotateData.comment
        ? annotateData.comment
        : "No Info";
      return coordiants;
    });
    console.log(sampleObject, " sampleObject ");
    setAnnotateInfo(sampleObject);
    setModel(true);
  }else{
    setErrorMessage("All fields are manadatory");
  }
  };
  const onSelect = (fieldId) => {
    setSelectId(fieldId);
  };
  const handleChangeData=(e,id)=>{
    let refFields=[...fieldInfo];
if(refFields&&refFields.length>0){
  let removeIndex=refFields.findIndex((fieldVal)=>fieldVal.id==selectId);
 if(removeIndex>-1){
  refFields.splice(removeIndex,1,{value:e.target.value,id:selectId})
 }else{
  refFields.push({value:e.target.value,id:selectId});
 }
 }
else{
  refFields.push({value:e.target.value,id:selectId});
}
    setFieldInfo(refFields);
  }
  const onChange = (data) => {
    let arrayId = [];
    console.log(data,"annotations info");
    console.log(fieldInfo,"fieldInfo")

    setColorCode(data.length);
    if (fieldSize.length == data.length) {
      let updateInfo = [];
      data&& data.length > 0 && data.map((subVal,index) => {
       let commentData=fieldInfo&&fieldInfo.length>0?fieldInfo.find((commentInfo)=>subVal.id==commentInfo.id):{value:"test"};
       subVal.comment=commentData?commentData.value:"test"
       return subVal;
      });
      fieldSize.map((subVal) => {
        updateInfo.push(data.find((updateData) => updateData.id == subVal.id));
      });
      setAnnotations(updateInfo);
    } else {
      data &&
        data.length > 0 &&
        data.map((val,index) => {
        let commentData=fieldInfo&&fieldInfo.length>0?fieldInfo.find((commentInfo)=>val.id==commentInfo.id):{value:"test"};
         val.comment=commentData?commentData.value:"test"
          if (
            val &&
            val.mark.x > 0 &&
            val.mark.y > 0 &&
            val.mark.width > 0 &&
            val.mark.height <= 590
          ) {
            setAnnotations(data);
            setErrorMessage(null);
          } else {
            setErrorMessage("Please Annotate within the image range");
          }
          arrayId.push({id:val.id,colorCode:colorLabel[index].code});
        });
      setFieldSize(arrayId);
    }
  };
  const backHandler = () => {
    props.Redirectpath("/video-farmes-viewer");
  };
  window.onload = (event) => {
    props.Redirectpath("/video-farmes-viewer"); 
  };
  if (contextData.state.path) {
    window.sessionStorage.setItem("viewPath", contextData.state.path);
  }
  const checkBoxHandler=()=>{
    setChecked(pre=>!pre);
  }
  let defaultShapeStyle = {
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
    shapeStrokeStyle: colorLabel[colorCode].code, // shape stroke color
    shadowBlur: 10, // stroke shadow blur
    shapeShadowStyle: "hsla(210, 9%, 31%, 0.35)", // shape shadow color

    /** transformer style **/
    transformerBackground: "#5c7cfa",
    transformerSize: 10,
  };
const clearAnnotation=()=>{
  setAnnotations([]);
}
  return (
    <>
      <div className={classes.backButton}>
        <ActionButton
          buttonText={
            <>
              <KeyboardArrowLeft /> Back to Frame
            </>
          }
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
      <div style={{ margin: "20px" }}>
        <CardLayout
          boxShadow={"inset 0px 0px 10px #00000029"}
          cardContent={
            <div>
              {errorMessage && (
                <AlertMessage message={errorMessage} status={"error"} />
              )}
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
                  annotationData={annotations}
                    annotationStyle={defaultShapeStyle}
                    showInput={true}
                    image={
                      imageObj
                        ? imageObj.imageFrame
                        : "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60"
                    }
                    inputElement={(value,onChange,onDelete)=>{
                      return(
                    <div className={classes.annotationInput}>
                       <Select
                            displayValue="name"
                            keyValue="value"
                            listItems={typeOfSpecies}
                            handleChange={(e)=>handleChangeData(e)}
                            inputRef={register(`fishType${fieldSize.length}`, {})}
                          />
                           <IconButton onClick={()=>onDelete()}><DeleteOutlineIcon/></IconButton>
                    </div>)
                    }}
                    scrollSpeed={0}
                    onSelect={onSelect}
                    onChange={(data) => onChange(data)}
                    defaultAnnotationSize={1}
                    width={780}
                    height={590}
                    ref={canvasRef}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2}>
                  <Box
                    component="typography"
                    sx={{
                      width: "95%",
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    {"Additional Information"}
                  </Box>
                  <Label labelName={"Pose *"} />
                  <Input
                    name="pose"
                    inputRef={register("pose", {
                      required: true,
                    })}
                    type="text"
                  />
                  <Label labelName={"Truncated *"} />
                  <Input
                    name="truncated"
                    inputRef={register("truncated", {
                      required: true,
                    })}
                    type="text"
                  />
                  <Label labelName={"Difficult *"} />
                  <Input
                    name="difficult"
                    inputRef={register("difficult", {
                      required: true,
                    })}
                    type="text"
                  />
                <CheckBox   
                   name={"isAnnotation"}
                   handleChange={checkBoxHandler}
                   checked={isChecked}
                   fontSizeLabel={"12px"}
                   fontWeight={700}
                  label={"* Label an all annotations"}
                    />
                  <div className={classes.submitButton}>
                    <ActionButton
                      buttonText={"Submit XMl"}
                      handleSubmit={handleSubmit(getImage)}
                      backgroundColor="#8c7eff"
                      borderRadius={"10px"}
                    />
                  </div>
                  <div>
                  <ActionButton
                      buttonText={"Clear Labels"}
                      handleSubmit={clearAnnotation}
                      backgroundColor="#8a7efb"
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
                  typeOfSpecies={typeOfSpecies}
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
