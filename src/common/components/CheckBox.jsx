import * as React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function CheckboxMui(props) {
  return (
    <FormGroup>
      <FormControlLabel style={{margin:'0',padding:"10px 0px"}}
        disabled={props.disabled}
        control={
          <Checkbox
            // value={props.value}
            {...props.inputRef}
            // defaultChecked={props.defaultChecked}
            checked={props.checked ? props.checked : false}
            onChange={props.handleChange}
            name={props.name}
            required={props.required}
            size={props.size}
            sx={{
              "& .MuiSvgIcon-root": { fontSize: props.fontSize },
            }}
          />
        }
        label={<div style={{margin:'0', fontSize: props.fontSizeLabel,fontWeight:props.fontWeight}}>{props.label}</div>}
      />
    </FormGroup>
  );
}
