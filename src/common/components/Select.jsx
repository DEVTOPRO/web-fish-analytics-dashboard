import React from 'react';
import {  FormControl,createTheme, InputLabel  } from '@mui/material';

import { makeStyles } from '@mui/styles'
const themes = createTheme();
const useStyles = makeStyles(theme => ({
  root: {
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
    padding:'3px',
    marginTop: '5px',
  },
  selectStyles: {
    width: '100%',
    outline: 'none',
    border: 'none',
    marginBottom: '5px',
    fontSize: '16px',
    borderRadius: '4px',
    padding:'4px',
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

export default function CustomSelect(props) {
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
    <fieldset style={{
      fontFamily: 'Helvetica',
      border:props.colorCode?`1px solid${props.colorCode}`:"1px solid #c4c4c4",
      maxheight: '75px',
      minheight: '38px',
      width: '97%',
      marginTop:'0px',
      borderRadius: '4px',
      color:'#14415ab3',
      padding:'2px 3px 2px 5px',
      marginLeft:'6px',
      fontWeight:"400"
    }}>
    <legend style={{ textAlign: 'left', fontSize: '12px', color:'rgb(102 102 102)', padding: '0px 6px', display: 'flex',fontWeight:"400" }} >{props.labelName} </legend>
  
    <div className={classes.root}>
      <select
        className={classesCustom.selectStyles}
        style={{ backgroundColor: props.backgroundColor }}
        name={
          props.name // style={{width:props.width,color:props.color,height:props.height,textAlign:props.textAlign}}
        }
        id={props.id}
        disabled={props.disabled}
        value={props.value}
        {...props.inputRef}
        onChange={props.handleChange}
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
    </fieldset>

  );
}
