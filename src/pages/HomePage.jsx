import React, {
  useEffect,
  useRef,
  useState,
  Fragment,
  useLayoutEffect,
} from "react";
import Cardlayout from "../common/components/CardLayout";
import Input from "../common/components/Input";
import Select from "../common/components/Select";
import Label from "../common/components/label";
import { makeStyles } from "@mui/styles";
import Title from "../common/components/Title";
import { getCurrentDateToDisplay,before30DayDate } from "../utils/utilSub/Date";
import { Box, Grid } from "@mui/material";
import ActionButton from "../common/components/Button";
import CommonTable from "../common/components/CustomCommonTable";
import service from "../api/apiSection/service";
import { cameraList, recordingInfo } from "../api/apiSection/apiUrlConstent";
import { useForm } from "react-hook-form";
import FileUpload from "../common/components/FileUpload";
import AlertMessage from "../common/components/AlertMessage";
import ErrorMessage from "../common/components/ErrorMessage";
import { timeOutCaller } from "../utils/utilSub/ArrayMethods";
import CloseIcon from "@mui/icons-material/Close";
import ToggleSwitch from "../common/components/ToggleSwitch";
import Loading from "../common/components/AppLoading";
import VideoTool from "./ToolVideos";
import Tooltip from '@mui/material/Tooltip';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3% 10px",
  },
  vidoeButton: {
    padding: "20px 0px",
    textAlign: "end",
  },
  tableRoot: {
    padding: "20px 0px",
  },
  seprateStyle: {
    fontSize: "15px",
    fontWeight: "700",
    margin: "auto",
    padding: "10px",
  },
  titleRoot: { display: "flex", justifyContent: "space-between" },
  fileCard: {
    display: "flex",
    justifyContent: "space-between",
  },
  fileUpload: {
    border: "2px dashed #fb2929",
    padding: "10px",
    borderRadius: "20px",
    padding: "15px",
    margin: "0px 15px",
  },
}));
const customTitleStyle = {
  color: "#4839be",
  fontSize: "1.5rem",
  padding: "9px 0px",
};

export default function HomePage(props) {
  const refItem = useRef();
  const classes = useStyles();
  const [loading,setLoading]=useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checked, setChecked] = useState(false);
  const [camerasList, setCameraList] = useState([]);
  const [recordInfo, setRecordInfo] = useState([]);
  const [fileData, setFileData] = useState({isActive:false});
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  useLayoutEffect(() => {
    service
      .get(cameraList)
      .then((response) => {
        if (response.data.status == "success") {
          response.data.data &&
            response.data.data.length > 0 &&
            setCameraList(response.data.data);
        } else {
          alert("Technical error");
        }
      })
      .catch((e) => alert("Please Contact Research Team"));
  }, []);

  const fileHandler = (e,key) => {
    if(key==="cancle"){
      setFileData({isActive:false})
    }else{
      console.log("fieldata",e,key)
      let videoFileInfo={name:e.target.files[0].name,fileData: URL.createObjectURL(e.target.files[0])};
    setFileData(pre=>({...pre,...videoFileInfo}));
    }
    
  };
  const getVidoeInfo = (data) => {
    if (!checked) {
      service
        .get(`${recordingInfo}cameraName=${data.cameraName}`)
        .then((response) => {
          if (response.data.status == "success") {
            setErrorMessage({
              message: "Information successfully loaded",
              status: "success",
            });
            response.data.data &&
              response.data.data.length > 0 &&
              setRecordInfo(response.data.data);
            reset();
          } else {
            setErrorMessage({ message: "Technical Error", status: "error" });
          }
        })
        .catch((e) => alert("Please Contact Research Team"));
    } else {
      if(fileData&&fileData.name!=null){
       fileData.isActive=true;
      setFileData(fileData);
      }
    }
    timeOutCaller(setErrorMessage, 5000);
  };
  const RedirectHandler = (path) => {
    props.Redirectpath(path);
  };
  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };
  console.log("fileData",fileData);
  return (
    <Box className={classes.root}>
      <Loading open={loading}/>
      <Cardlayout
        cardContent={
          <div>
            <div className={classes.titleRoot}>
              <Title
                title="Welcome to Annotation Analyzer of frigate data"
                style={customTitleStyle}
              />
              <Tooltip title="Upload Your Clip" placement="bottom">
              <ToggleSwitch onChange={switchHandler} />
              </Tooltip>
            </div>
            {errorMessage && (
              <AlertMessage
                message={errorMessage.message}
                status={errorMessage.status}
              />
            )}
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
              {checked ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                    className={classes.fileUpload}
                  >
                    <FileUpload
                      handleChange={fileHandler}
                      fileInfo={fileData&&fileData.name}
                    />
                    <div>
                      {errors &&
                        errors.videoFile &&
                        errors.videoFile.type === "required" && (
                          <ErrorMessage message={"required !!"} />
                        )}
                    </div>
                  </Grid>
                  <div className={classes.seprateStyle}>
                    {" "}
                    {fileData &&fileData.name&& (
                      <Cardlayout
                        width={"300px"}
                        cardContent={
                          <div className={classes.fileCard}>
                            <div>{fileData.name}</div>
                            <CloseIcon onClick={(e)=>fileHandler(e,"cancel")}/>
                          </div>
                        }
                      />
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Label labelName={"Select camera *"} />
                    <Select
                      displayValue="name"
                      keyValue="value"
                      listItems={camerasList}
                      inputRef={register("cameraName", { required: true })}
                    />
                    <div>
                      {errors &&
                        errors.cameraName &&
                        errors.cameraName.type === "required" && (
                          <ErrorMessage message={"required !!"} />
                        )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Label labelName={"Start Date"} />
                    <Input
                      name={"startDate"}
                      type={"date"}
                      inputRef={register("startDate", {})}
                      max={getCurrentDateToDisplay()}
                      min={before30DayDate()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Label labelName={"End Date "} />
                    <Input
                      name={"endDate"}
                      type={"date"}
                      inputRef={register("endDate", {})}
                      max={getCurrentDateToDisplay()}
                      min={before30DayDate()}
                    />
                  </Grid>
                </>
              )}
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                xl={10}
                className={classes.vidoeButton}
                sx={{ margin: "auto" }}
              >
                <ActionButton
                  buttonText={"Load Video Info"}
                  handleSubmit={handleSubmit(getVidoeInfo)}
                  backgroundColor={"#8c7eff"}
                  // width={"fit-content"}
                  borderRadius={"15px"}
                />
              </Grid>
            </Grid>
          </div>
        }
      />
      {checked&&fileData&&fileData.isActive?
      <div>
      <VideoTool  keyValue={true} Redirectpath={props.Redirectpath} videoData={fileData} />
      </div>: 
      <div className={classes.tableRoot}>
      {recordInfo && recordInfo.length > 0 ? (
        <CommonTable
          redirectPage={RedirectHandler}
          data={recordInfo}
          camerasList={camerasList}
        />
      ) : (
        <div><h2>{"#Waiting for the Information to load . . ."}</h2><br/><br/></div>
      )}
    </div>}
    </Box>
  );
}
