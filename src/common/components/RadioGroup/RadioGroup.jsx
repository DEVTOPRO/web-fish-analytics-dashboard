import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
// import { purple } from '@mui/material/colors';
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  labelStyle: {
    fontSize: "13px",
    fontFamily: "Helvetica",
    fontWeight: "600",
    padding: "11px",
    color: "#344357",
  },
}));
export default function RadioButtonsGroup(props) {
  const classes = useStyles();
  return (
    <div style={{display:'flex'}}>
      <div className={classes.labelStyle}>
        {props.labelName}
        {props.requiredLabel ? <span>*</span> : ""}
      </div>
      <div>
        <FormControl component="fieldset">
          <RadioGroup
            name={props.name}
            value={props.value}
            onChange={props.handleChange}
            style={{
              color: props.color,
              backgroundColor: props.backgroundColor,
              fontWeight: props.fontWeight,
              textAlign: props.textAlign,
            }}
            defaultValue={props.defaultValue}
          >
            <div style={{ display: props.display }}>
              {props.listItems.map((row, index) => (
                <FormControlLabel
                  value={row.id}
                  control={
                    <Radio
                      {...props.register}
                      disabled={props.disabled ? true : false}
                      // sx={{
                      //   color: purple[800],
                      //   '&.Mui-checked': {
                      //     color: purple[600],
                      //   },
                      // }} //for changing color of radio
                    />
                  }
                  label={row.name}
                />
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}
