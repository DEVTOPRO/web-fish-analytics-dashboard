import React from 'react'
import RadioGroup from './RadioGroup'
import { Controller } from 'react-hook-form'; 
function ControllerSelect(props){
    return(
        <div>
             <Controller
        name={props.name}
        control={props.control}
        defaultValue={props.defaultValue}
        rules={{ required: props.required }}
        render={({ field: { onChange, value } }) => (           
            <RadioGroup
            name={props.name}
            handleChange={(event) => {onChange(event); props.handleChange(event);}}
            value={value?value:props.value}
            labelName={props.labelName}
            requiredLabel={props.requiredLabel}
            // defaultValue="Y"
            disabled={props.disabled}
            control={props.control}
            listItems={props.listItems}
            defaultValue={props.defaultValue}
          />
      )}
      />
        </div>
    )
}
export default ControllerSelect;