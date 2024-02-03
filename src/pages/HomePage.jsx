import  React,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
export default function HomePage(props){
   const refItem=useRef();
   const [urlData,setUrlData]=useState(null);
const dataHandle=(e)=>{
axios.get("http://localhost:8090/recordingInfo/getRecordingClip?sourcePath=C:/Users/konda/Downloads/Frigate-NVR-Streamer/Frigate-NVR-Streamer/media/recordings/2024-02-02/22/faux_camera1/55.10.mp4").then((response)=>{
        const binaryData = new Blob([response.data], { type: 'video/mp4' });
        const convertedData = URL.createObjectURL(binaryData);
refItem.current.src=convertedData 
});
}

    return(
      <div>

         Checing in tthe home page
<button onClick={dataHandle}>clic</button>
<div>
<video width="90%"  ref={refItem} controls  />
</div>
   </div>
    )

}