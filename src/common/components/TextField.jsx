import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import { InputAdornment } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const useStyles = makeStyles(theme => ({
    root: {
      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
        "-webkit-appearance": "none",
      },
      /* Firefox */
      "& input[type=number]" : {
        "-moz-appearance": "textfield",
      }
    },
    labelStyle: {
        fontSize: '13px',
        fontFamily: 'Helvetica',
        fontWeight: '600',paddingLeft: '10px',
        marginBottom: '-8px',color:'#344357'
    },
  }));
export default function FormPropsTextFields(props) {
    const classes = useStyles();
    const TextFieldStyled = styled(TextField)(({ theme }) => ({
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
          display: "none",
        },
      }));
  return (
   
   
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className={classes.root}>
      {/* <div className={classes.labelStyle}>{props.labelName}{props.requiredLabel&&<span>*</span>}</div> */}
        <TextFieldStyled
        autoFocus={props.autoFocus}
          disabled={props.disabled}
          select={props.select}
          placeholder={props.placeholder}
          required={props.requiredLabel}
          variant={props.variant?props.variant:"outlined"}
          // label="Outlined" 
          id={props.id?props.id:"outlined-required"}
           label={props.labelName}
          name={props.name}
          size="small"
          value={props.value}
          type={props.type}
          error={props.error}
          {...props.register}
          onChange={props.handleChange}
         
          defaultValue={props.defaultValue}
          helperText={props.helperText}
          sx={{
            "& .MuiInputLabel-root.Mui-focused": {color: 'purple'},
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
          borderColor: "purple"
                }
              }
            }}
            inputProps={{
              min: props.min,
              max: props.max,
            }}
          InputProps={{
            
            readOnly: props.readOnly,
            endAdornment: (
              <InputAdornment>
               
                 {props.endAdornment}
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true
          }}
          onWheel={props.type === "number" ? (e) => e.target.blur() : null}
          // onKeyPress={handleKeyPress}
        />
      </div>
    </Box>
  );
}
