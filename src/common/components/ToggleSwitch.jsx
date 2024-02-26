import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function BasicSwitches(props) {
  return (
    <div>
      <Switch {...label} defaultChecked={props.checked} color="secondary" onChange={props.onChange} />
    </div>
  );
}