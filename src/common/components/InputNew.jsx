import * as React from "react";
import {Box, FormControl} from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
      padding: "10px",
      fontSize: "12px",
    },
    "& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
      marginTop: "-9px",
    },
    "& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      margin: "0px",
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
      "-webkit-appearance": "none",
    },
    /* Firefox */
    "& input[type=number]" : {
      "-moz-appearance": "textfield",
    }
  },
}));

export default function FormPropsTextFields(props) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      props.onSubmit();
    }
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { margin: "8px 0px", width: props.width?props.width:"100%" },
      }}
      noValidate
      // autoComplete="off"
    >
      <div className={classes.root}>
        <TextField
          disabled={props.disabled}
          required={props.required}
          variant="outlined"
          id={props.id}
          multiline={props.multiline}
          rows={props.rows}
          rowsmax={props.rowsmax}
          label={props.label}
          name={props.name}
          style={{width:props.width}}
          size="small"
          value={props.value}
          type={props.type}
          onChange={props.handleChange}
          {...props.inputRef}
          defaultValue={props.defaultValue}

          helperText={props.helperText}
          // inputRef={props.inputRef}
        //   onBlur={props.handleBlur}
          inputProps={{
            autoComplete: 'off',
            min: props.min,
            max: props.max,
        }}
        sx={{
            "& .MuiInputLabel-root.Mui-focused": {color: 'purple'},
              "& .MuiOutlinedInput-root.Mui-focused": {
                "& > fieldset": {
          borderColor: "purple"
                }
              }
            }}
          // InputProps={{
          //   readOnly: props.readOnly,
          //   endAdornment: (
          //     <InputAdornment position="end">
          //       {props.visibilityIcon?showPassword ? (
          //         <VisibilityIcon
          //           onClick={() => {
          //             handlePasswordIcon(false);
          //           }}
          //         />
          //       ) : (
          //         <VisibilityOffIcon
          //           onClick={() => {
          //             handlePasswordIcon(true);
          //           }}
          //         />
          //       ):props.sbxAdorment?'@sbx':''}
          //     </InputAdornment>
          //   ),
          // }}
          InputProps={{
            
            readOnly: props.readOnly,
            endAdornment: (
              <InputAdornment>
               
                 {props.endAdornment}
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: props.shrink,
          }}
          onKeyPress={props.handleKeyPress}
          onWheel={props.type === "number" ? (e) => e.target.blur() : null}
        />
      </div>
    </Box>
  );
}
