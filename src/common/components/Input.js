import React from 'react';
import {  makeStyles } from '@mui/styles';
import {  FormControl,createTheme,InputLabel  } from '@mui/material';
const themes = createTheme();
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // padding:"10px",
  },
  margin: {
    width: '100%',
  },
}));
const useStylesCustom = makeStyles(theme => ({
  root: {
    borderRadius: "5px",
    position: 'relative',
    backgroundColor: "#ffff",
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px',
    margin: '5px',
    transition: 'box-shadow linear 1, border 500ms ease-out;',  
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&:focus': {
      boxShadow: `${("#1976d2", 0.25)}0.25 0 0 0 0.2rem`,
      borderColor: "#1976d2",
      outline: 0,
    },
    'label + &': {
      marginTop: themes.spacing(5),
    },
  },
  datePickerStyles: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "#ffff",
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '8px 10px',
    margin: '0px 4px',
    '&:hover': {
      backgroundColor: '#fff',
    },
    '&:focus': {
      boxShadow: `${("#1976d2", 0.25)} 0 0 0 0.2rem`,
      borderColor: "#1976d2",
      outline: 0,
    },
    'label + &': {
      marginTop: themes.spacing(5),
    },
  },
}));
function Input(props) {
  const handleChange = e => {
    props.handleChange(e);
  };
  const classes = useStyles();
  const classesCustom = useStylesCustom();

  const autoTab = e => {
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let tabindex = (e.target).attr('tabindex') || 0;
    tabindex = Number(tabindex);
    if (e.keyCode === BACKSPACE_KEY) {
      tabindex -= 1;
    } else if (e.keyCode !== DELETE_KEY) {
      tabindex += 1;
    }
    const elem = ('[tabindex=' + tabindex + ']');
    if (elem[0]) {
      elem.focus();
    }
  };
  const blocks = Array.from({ length: 10 }, (element, index) => (
    <input
      className="block"
      tabIndex={index}
      key={index}
      maxLength={1}
      onKeyUp={autoTab}
      inputMode={props.inputMode}
    />
  ));

  return (
    <div className={classes.root}>
      <FormControl className={classes.margin}>
      
        <input
          ref={props.inputRef}
          className={
            props.type === 'date'
              ? classesCustom.datePickerStyles
              : classesCustom.root
          }
          style={{
            backgroundColor: props.backgroundColor,
            margin: props.margin,
            boxShadow: props.boxShadow,
            border: props.border,
            textAlign: props.textAlign,
            color: props.color,
          }}
          name={props.name}
          id={props.id}
          value={props.value}
          type={props.type}       
          onBlur={props.handleBlur}
          disabled={props.disabled}
          maxLength={props.maxLength}
          pattern={props.pattern}
          placeholder={props.placeholder}
          autoComplete="off"
          max={props.max}
          min={props.min}
          onKeyPress={props.onKeyPress}
          inputMode={props.inputMode}
          readonly={props.readOnly ? props.readOnly : null}
          onWheel={props.type === 'number' ? e => e.target.blur() : null}
          {...props.inputRef}
          onChange={props.handleChange}
          onInput={props.onInput}
        />
      </FormControl>
    </div>
  );
}
export default Input;
