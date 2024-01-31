import React from 'react';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({}));

export default function DocumentUpload(props) {
  const classes = useStyles();
  return (
    <div>
      <input
        type="file"
        id={props.indexValue + 'contained-file'}
        style={{ display: 'none' }}
        onChange={e => props.handleChange(e, props.indexValue)}
        name={props.name}
        ref={props.inputRef}
        accept={props.accept}
      />
      <label htmlFor={props.indexValue + 'contained-file'}>
        <div variant="contained" color="primary">
          {props.labelContent}
        </div>
      </label>
    </div>
  );
}
