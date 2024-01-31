import React, { Component } from 'react';
import { makeStyles } from '@mui/styles';
import {  Button,createTheme } from '@mui/material';
const themes = createTheme();
const useStyles = makeStyles(theme => ({
  margin: {
    textTransform: 'none',
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
    borderRadius: '5px',
    height: '35px',
    width: '100%',
    fontSize: '16px',
    fontWeight: '600',
    ['@media (max-width:1020px)']: {
      fontSize: '12px',
    },
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
  extendedIcon: {
    marginRight: themes.spacing(1),
  },
}));
export default function ActionButton(props) {
  const classes = useStyles();
  return (
    <Button
      disabled={props.disabled}
      variant="contained"
      className={classes.margin}
      style={{
        width: props.width,
        textTransform: 'capitalize',
        backgroundColor: props.backgroundColor,
        color: props.color,
        height: props.height,
        borderRadius: props.borderRadius,
        fontSize: props.fontSize,
        marginBottom:props.marginBottom,
        boxShadow: props.boxShadow,
        fontWeight:props.fontWeight,
        padding:props.padding,       
        backgroundImage: props.backgroundImage,
        position:'inherit',
        border: props.border,
        display:props.display,
        margin:props.margin
        // background:props.background,
      }}
      handlechange={props.handleChange}
      onClick={props.handleSubmit}
    >
      {props.buttonText}
    </Button>
  );
}
