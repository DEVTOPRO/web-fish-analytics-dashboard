import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    fontSize:"27px",
    fontWeight:"600"
  }
}))
export default function Title (props) {
    const classes = useStyles()
  
    return (
      <div
        className={classes.root}
        style={props.style?props.style:{ fontSize: props.fontSize, marginLeft:props.marginLeft,
          marginRight:props.marginRight,border:props.border}}
      >
        {props.title}
      </div>
    )
  }
  