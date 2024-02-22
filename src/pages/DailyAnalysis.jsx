import {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@mui/styles';
import {filePost} from "../api/apiSection/apiUrlConstent";
import service from "../api/apiSection/service";
const useStyles = makeStyles(theme => ({
    canvasContainer2 :{
        height: "600px",
        width: "600px",
        border: "2px solid #000",
       position:"absolute",
    margin:"100px"
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
export default function DailyAnalysis(props){
    const classes = useStyles();
    const canvasRef = useRef(null);
    const [file,setFile]=useState(null);
const fileDataHandler=(e)=>{
console.log(e.target.files[0],"file info");
let fordata = new FormData();
fordata.append('files', e.target.files[0])
let reqObj=[{
  userId:"dafasf",
  files:fordata
}]
service.create(filePost,reqObj, {
 
}).then((respones)=>{
 console.log(respones);
}); 
}
    return (
        <div >
       {"Check ui"}
        </div>
    )
}