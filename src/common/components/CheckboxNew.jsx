import * as React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function CheckboxMui(props) {
  return (
    <FormGroup>
      <FormControlLabel
        disabled={props.disabled}
        control={
          <Checkbox
            // value={props.value}
            {...props.inputRef}
             defaultChecked={props.defaultChecked}
            checked={props.checked ? props.checked : false}
            onChange={props.handleChange}
            ref={props.inputRef}
            size={props.size}
            color={props.color}
            sx={{
              color:props.color?props.color:'none',
              "& .MuiSvgIcon-root": { fontSize: props.fontSize },
              '&.Mui-checked': {
                color: props.color?props.color:"#53d338",
                 },
            }}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
}