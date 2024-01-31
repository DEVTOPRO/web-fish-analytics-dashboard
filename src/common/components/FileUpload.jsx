import React from 'react';
import { makeStyles } from '@mui/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';

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
      <fieldset
        style={{
          borderRadius: props.borderRadius? props.borderRadius :'4px',
          borderColor: '#0000004a',
          border: '1px solid #0000004a',
          width: props.width?props.width:'250px',
          marginLeft: props.marginLeft,
          height: props.height?props.height:'32px'
        }}
      >
        <legend style={{color:props.color?props.color:'', fontSize:props.font?props.font:''}} className={classes.labelStyle}>{props.legendName}</legend>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
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

                <AttachFileIcon />
              </div>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
