
import React, { useRef, useState,useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Title from './Title';
import ActionButton from './Button';

export default function VideoToFrames (props){
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [annotations, setAnnotations] = useState(Array.from({ length: 10 }, () => ''));

  // const drawRectangle = (xi,yi,widthf,heightf) => {
  //  let x=xi?xi:120;
  //  let y=yi?yi:140;
  //  let width=widthf?widthf:130;
  //  let  height=heightf?heightf:200;
  //   console.log(x,y,width,height,"adfadf");
  //   const context = canvasRef.current.getContext("2d");
  //   context.strokeStyle = "red";
  //   context.lineWidth = 1;
  //   context.strokeRect(x, y, width, height);
  //   console.log("use effect");
  // };

  // useEffect(() => {
  //   props.annotateInfo&&props.annotateInfo.coordiants.length>0&&props.annotateInfo.coordiants.map((frameInfo)=>{
  //     drawRectangle(frameInfo.xMin,frameInfo.yMin,frameInfo.strokeWidth,frameInfo.strokeHeight);
  //   })
  // }, [props.annotateInfo]);

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
  let sampleImg="https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60";
  return (
    <div>
      <div>
      <canvas
    ref={canvasRef}
    style={{
      width:"100%",
      height: "100%",
      backgroundSize:"100% 100%",
      backgroundImage:props.imageData ?`url(${props.imageData.imageFrame})`:`url(${sampleImg})`,
    }}
  />
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
