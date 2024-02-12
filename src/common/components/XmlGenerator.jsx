
import React, { useRef, useState } from 'react';
import testVideo from "./testvideo.mp4";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const VideoToFrames = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [frames, setFrames] = useState([]);
  const [annotations, setAnnotations] = useState(Array.from({ length: 10 }, () => ''));

  const extractImages = () => {
    const video = videoRef.current;
    const initialTime = video.currentTime;
    const endTime = initialTime + 1;

    if (videoRef.current) {
      let count = 0;
      const interval = setInterval(() => {
        if (endTime <= video.currentTime) {
          clearInterval(interval);
        } else {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frame = canvas.toDataURL('image/png');
          setFrames((frames) => [...frames, frame]);
          video.currentTime += 0.1;
          count++;
        }
      }, 42);
    }
  };

  const handleAnnotation = (index, annotation) => {
    const updatedAnnotations = [...annotations];
    updatedAnnotations[index] = annotation;
    setAnnotations(updatedAnnotations);
  };

  const createZip = () => {
    const zip = new JSZip();

    frames.forEach((frame, index) => {
      const imageData = frame.split(';base64,')[1];
      zip.file(`Frame${index}.png`, imageData, { base64: true });

      // Generate XML for annotation
      let xmlString = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xmlString += `<annotation>\n`;
      xmlString += `\t<folder>my-project-name</folder>\n`;
      xmlString += `\t<filename>Frame ${index}</filename>\n`;
      xmlString += `\t<path>/my-project-name/Frame ${index}.png</path>\n`;
      xmlString += `\t<source>\n`;
      xmlString += `\t\t<database>Unspecified</database>\n`;
      xmlString += `\t</source>\n`;
      xmlString += `\t<size>\n`;
      xmlString += `\t\t<width>${videoRef.current.videoWidth}</width>\n`;
      xmlString += `\t\t<height>${videoRef.current.videoHeight}</height>\n`;
      xmlString += `\t\t<depth>3</depth>\n`;
      xmlString += `\t</size>\n`;
      xmlString += `\t<object>\n`;
      xmlString += `\t\t<name>${annotations[index]}</name>\n`;
      xmlString += `\t\t<pose>Unspecified</pose>\n`;
      xmlString += `\t\t<truncated>0</truncated>\n`;
      xmlString += `\t\t<difficult>0</difficult>\n`;
      xmlString += `\t\t<bndbox>\n`;
      xmlString += `\t\t\t<xmin>346</xmin>\n`;
      xmlString += `\t\t\t<ymin>549</ymin>\n`;
      xmlString += `\t\t\t<xmax>663</xmax>\n`;
      xmlString += `\t\t\t<ymax>953</ymax>\n`;
      xmlString += `\t\t</bndbox>\n`;
      xmlString += `\t</object>\n`;
      xmlString += `</annotation>\n`;

      zip.file(`Frame${index}.xml`, xmlString);
    });

    zip.generateAsync({ type: 'blob' })
      .then(content => {
        saveAs(content, 'frames_and_annotations.zip');
      })
      .catch(error => console.error('Error creating ZIP file:', error));
  };

  return (
    <div>
      <video ref={videoRef} src={testVideo} type="video/mp4" width="720" controls />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <button onClick={extractImages}>Extract Frames</button>
      <div>
        {frames.map((frame, index) => (
          <div key={index}>
            <img src={frame} alt={`Frame ${index}`} />
            <input
              type="text"
              value={annotations[index] || ''}
              onChange={(e) => handleAnnotation(index, e.target.value)}
              placeholder={`Annotation for Frame ${index}`}
            />
          </div>
        ))}
      </div>
      <button onClick={createZip}>Generate ZIP</button>
    </div>
  );
};

export default VideoToFrames;