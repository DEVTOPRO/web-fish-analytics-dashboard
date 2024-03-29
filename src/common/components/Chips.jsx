import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Chips(props) {

  return (
    <Stack direction="row" spacing={1}>
      <Chip style={{background:props.background}} icon={props.icon} label={props.label} variant="outlined" onClick={props.handleClick} />
    </Stack>
  );
}