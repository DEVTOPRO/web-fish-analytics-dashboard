  import React from 'react';
import { makeStyles } from '@mui/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const useStyles = makeStyles((theme) => ({
  attachBtnStyles: {
    background: 'rgb(24 56 131)',
    color: '#fff',
    textAlign: 'center',
    width: 'fit-content',
    padding: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  labelStyle: {
    fontSize: '13px',
    fontFamily: 'Helvetica',
    fontWeight: '400',
    marginBottom: '-8px',
    color: '#344357',
    borderRadius: '4px',
  },
}));

export default function DocumentUpload(props) {
  const classes = useStyles();
  return (
    <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: 'rgba(0, 0, 0, 0.6)',
            fontFamily: 'Roboto,Helvetica,Arial,sans-serifmarginTop:12px',
          }}
        >
          <div style={{ color: 'black', marginTop:'3px',overflow: 'hidden',maxHeight: '20px' ,wordBreak:'break-all'}}>{props.fileName}</div>

          <div>
            <input
              type="file"
              id={props.indexValue + 'contained-file'}
              style={{ display: 'none' }}
              onChange={props.handleChange}
              name={props.name}
              ref={props.inputRef}
              accept={props.accept}
            />
            <label
              htmlFor={props.indexValue + 'contained-file'}
              style={{ display: 'flex' }}
            >
              <div variant="contained">
                <span>{props.labelContent}</span>

                <CloudUploadIcon style={{fontSize:"4.2rem",color:"#5a50ab"}} />
              </div>
            </label>
          </div>
        </div>
    </div>
  );
}
