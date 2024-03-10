import {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@mui/styles';
import {filePost} from "../api/apiSection/apiUrlConstent";
import service from "../api/apiSection/service";
import AutoModeIcon from '@mui/icons-material/AutoMode';
import {sampleTestUrl} from "../api/apiSection/apiUrlConstent";

import axios from 'axios';
const useStyles = makeStyles(theme => ({
    root :{
        display:"flex",
        padding:"16% 5%",
        alignItems:'center',
        color:"radial-gradient(circle, rgba(187,238,174,1) 0%, rgba(148,193,233,1) 100%)"
    },
    canvasContainer1 :{
        height: "600px",
        width: "600px",
       position:"absolute",
       backgroundImage: 'url(https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60)',
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       margin:"100px"
    }
}))

export default function DailyAnalysis(props){
    const classes = useStyles();
    const [fileData,setFileData]=useState([]);
  
    const fileHandler=(e)=>{
        console.log("file data",e.target.files[0]);
        setFileData(pre=>[...pre,e.target.files[0]])
    }
    const submitHandler=()=>{
        const jsonPayload = {
            userId: "Ram",
            xmlName: "mediaXmlFile",
            mediaFileName: "mediaXmlFile",
            speciesType:"salman"
        };
const formData = new FormData();
formData.append('mediaFile', fileData[0],"mediaFile.png"); // File object
formData.append('xmlFile', fileData[1],"xmlFile.xml"); // File object
formData.append('sampleFileDto', new Blob([JSON.stringify(jsonPayload)], { type: 'application/json' }));

axios.post("http://localhost:8090/fileRepoInformation/zipFileUpload", formData).then((res) => {
    console.log("Response:", res.data);
}).catch((error) => {
  
    })
}
    return (
        <div className={classes.root}>

            <div>
                <AutoModeIcon sx={{fontSize:"7rem",color:"rgba(187,238,174,1)"}}/>
            </div>
        <h1>
      Universeral  Analytical Home page is Under Planning for MVP-2
            </h1>

            <input type={'file'} onChange={fileHandler}/>
            <button onClick={submitHandler}>submit</button>
        </div>
    )
}