import React, { Component } from 'react';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  inputLabel: {
    fontSize: '14px',
    fontFamily: 'Helvetica',
    fontWeight: '600',
    margin: '5px',
    color: '#523036',
  },
  inputLabel1: {
    fontSize: '80px',
    fontFamily: 'Helvetica',
    fontWeight: '600',
    margin: '5px',
    color: '#black',
  },
  labelSuffix: {
    fontSize: '10px',
    padding: '3px 3px 0px 7px',
    fontStyle: 'italic',
    color: '#311E4A',
  },
}));
export default function Label(props) {
  const classes = useStyles();
  return (
    <div style={{  color: props.color,fontSize:props.fontSize,fontFamily:props.fontFamily }}>
      <div className={props.color ? classes.inputLabel1 : classes.inputLabel}>
        {props.labelName}{' '}
        {props.subLable&&<span style={{ fontSize: props.fontSize }}>{props.subLable}</span>}
      </div>
      {props.labelSuffix&&<span className={classes.labelSuffix}>{props.labelSuffix}</span>}
    </div>
  );
}
