import * as React from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";

export default function CheckboxMui(props) {
  return (
    <FormGroup>
      <FormControlLabel style={{margin:'0'}}
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
        label={props.label}
      />
    </FormGroup>
  );
}
