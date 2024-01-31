import React from 'react';
import {  FormControl,createTheme, InputLabel  } from '@mui/material';

import { makeStyles } from '@mui/styles'
const themes = createTheme();
const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Helvetica',
    border:"1px solid #c4c4c4",
    width: '100%',
    marginTop:'0px',
    borderRadius: '5px',
    color:'#14415ab3',
    padding:'1px 3px 1px 3px',
    fontWeight:"400",
    '&:hover': {
      outline: 'none',
    },
    '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
      transform: 'none',
      display: 'none',
      '&.MuiOutlinedInput-input': {
        padding: '15.5px 14px',
        border: '0px',
      },
      '& .MuiSelect-nativeInput': {
        position: 'none',
      },
    },
  },
  MuiListItem: {
    '&:hover': {
      backgroundColor: '#FB2929',
      color: '#fff',
    },
  },
  selectEmpty: {
    marginTop: themes.spacing(2),
  },
}));

const useStylesCustom = makeStyles(theme => ({
  root: {
    '& .MuiOutlinedInput-input': {
      // padding: "10px 10px 10px"
    },
    // height: '39px',
    marginTop: '5px',

  },
  selectStyles: {
    width: '100%',
    outline: 'none',
    border: 'none',
    padding:'8px',
    marginBottom: '5px',
    fontSize: '16px',
    borderRadius: '4px',
    backgroundColor: '#fff',
    cursor: 'pointer',
    color: '#000',
    option: {
      '&:hover': {
        backgroundColor: '#FB2929',
      },
    },
  },
  option: {
    '&:hover': {
      backgroundColor: '#FB2929',
    },
  },
}));

export default function NewSelect(props) {
  // const handleChange=(e)=>{
  //   if(props.isStateSet){
  //     props.handleChangeSelect(e);
  //   }
  //   props.inputRef({ name: props.name, value: e.target.value })
  // }
  const classes = useStyles();
  const classesCustom = useStylesCustom();
  const listData = props.listItems ? props.listItems : [];
  return (
    
    
    <div className={classes.root}>
      <select
        className={classesCustom.selectStyles}
        style={{ backgroundColor: props.backgroundColor ,padding:props.padding}}
        name={
          props.name // style={{width:props.width,color:props.color,height:props.height,textAlign:props.textAlign}}
        }
        id={props.id}
        disabled={props.disabled}
        onChange={props.handleChange}
        value={props.value}
        {...props.register}
      >
        <option value="">Select
        </option>
        {listData.map((value, index) => (
          <option key={index} value={value[props.keyValue]}>
            {value[props.displayValue]}
          </option>
        ))}
      </select>
    </div>

  );
}
