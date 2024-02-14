import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  cardLayout: {
    boxShadow: '0px 0px 10px #00000029',
    background: '#fff',
    borderRadius: '10px',
    padding: '10px',
    color:"#4839be"
    // minHeight:"130px"
    // transition: "transform .2s",
    // "&:hover": {
    //   transform: "scale(1.0)"
    // },
  }
}))

export default function CardLayout (props) {
  const classes = useStyles();

  return (
    <div
      className={classes.cardLayout}
      style={props.style?props.style:{
        backgroundImage: props.backgroundImage,
        backgroundColor: props.backgroundColor,
        marginBottom: props.marginBottom,
        margin: props.margin,
        border: props.border,
        height: props.height,
        padding: props.padding,
        width: props.width,
        marginTop: props.marginTop,
        borderRadius: props.borderRadius,
        boxShadow: props.boxShadow,
        fontSize: props.fontSize,
        marginLeft:props.marginLeft,
        marginRight:props.marginRight,border:props.border  }}
      onClick={props.handleSubmit}
    >
      {props.cardContent}
    </div>
  )
}
