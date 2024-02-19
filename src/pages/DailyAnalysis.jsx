import {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@mui/styles'
import { ReactPictureAnnotation } from "react-picture-annotation";
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
    const onSelect = (selectedId) => console.log(selectedId);
  const onChange = (data) => {
    console.log("Latest value:", data);
  };
  const [pageSize, setPageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const onResize = () => {
    setPageSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
window.removeEventListener("resize", onResize);
  }, []);
const deleteHandler=(deleFun)=>{
  console.log(deleFun);
}
    return (
        <div >
          <div >check</div>
              <ReactPictureAnnotation
             {...props}
             debugger
                    image={"https://source.unsplash.com/random/1000x1000"}
                    scrollSpeed={0}
                    onSelect={onSelect}
                    onChange={onChange}
                    defaultAnnotationSize={1}
                    width={pageSize.width}
                    height={pageSize.height}
                    ref={canvasRef}
                    inputElement={(value, onChange, onDelete) =>
                     {
                      return(
                        <div>
                           <input
        placeholder={"Hello world"}
        name={"input"}
        onChange={(e) => {
          console.log(e);
        }}
      />
                        <button type={"button"} onClick={()=>deleteHandler(value)}>
        OK
      </button>
                          </div>
                      )
                     }
                    }
                  />
        </div>
    )
}