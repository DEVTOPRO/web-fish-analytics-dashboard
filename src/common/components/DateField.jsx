import React from 'react';
import { FormControl } from '@mui/material';
import { makeStyles } from '@mui/styles';
function DateField(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      display: props.display?props.display:'flex',
      flexWrap: 'wrap',
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        "-webkit-appearance": "none",
          margin: 0,
      },

      /* Firefox */
      "& input[type=number]" : {
        "-moz-appearance": "textfield",
      }
    },
    margin: {
      width: props.width?props.width:'100%',
    },
  }));
  const useStylesCustom = makeStyles(theme => ({
    root: {
      color:'black',
      // borderRadius: 10,
      //fontFamily: 'Frutiger LT Arabic',
      position: 'relative',
      backgroundColor: "#ffff",
      border: props.border?props.border:'none',
      fontSize: 16,
     
      margin: '5px',
      direction:sessionStorage.getItem('Localisation') === 'AR'?'rtl':'',
      '&:hover': {
        backgroundColor: '#fff',
      },
      '&:focus': {
        borderColor: '#fff',
        outline: 0,
      },
      'label + &': {
        marginTop: "5%",
      },
    },
  }));
  const classes = useStyles();
  const classesCustom = useStylesCustom();

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      props.onSubmit();
    }
  }
  return (
    <fieldset style={{
        fontFamily: 'Helvetica',
        border:"1px solid #c4c4c4",
        maxheight: '75px',
        minheight: '38px',
        width: '97%',
        marginTop:'-2px',
        borderRadius: '4px',
        color:'#14415ab3',
        padding:'2px 10px',
        marginLeft:'9px',
        padding:'0px 0px 0px 0px',
        fontWeight:"400"
      }}>
      <legend style={{ textAlign: 'left', fontSize: '12px', color:'rgb(102 102 102)', padding: '0px 6px', display: 'flex',fontWeight:"400" }} >{"Date of Birth"} </legend>
    <div className={classes.root}>
      <FormControl className={classes.margin} >
        <input
          ref={props.inputRef}
          className={classesCustom.root}
            style={{ backgroundColor: props.backgroundColor, margin: props.margin, boxShadow: props.boxShadow, border: props.border, textAlign: props.textAlign, color: props.color, width: props.width, height: props.height }}
          name={props.name}
          id={props.name}
          value={props.value}
          defaultValue={props.defaultValue}
          readOnly = {props.readOnly}
          min={props.min}
          max={props.max}
          type={props.type}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          disabled={props.disabled}
          maxLength={props.maxLength}
          pattern={props.pattern}
          placeholder={props.placeholder}
          autoFocus={props.focus}
          autoComplete="off"
          onKeyPress={handleKeyPress}
          onWheel={props.type==="number"?(e) => e.target.blur():""}
          {...props.inputRef}
        />
      </FormControl>
    </div>
    </fieldset>
  );
}
export default DateField;
