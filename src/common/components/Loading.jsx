import React from 'react';
import { Backdrop, CircularProgress, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  return (
    <div>
      <Backdrop  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 3 }} open={props.open}>
        <CircularProgress color="inherit" size={60}/>
      </Backdrop>
    </div>
  );
}
