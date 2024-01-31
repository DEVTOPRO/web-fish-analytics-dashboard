import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(theme => ({
    textData: {
        fontSize:" 12px",
        float: "right",
        color: "darkred",
        marginRight: "10px",
    },
  }));
export default function ErrorMessage(props){
    const classes=useStyles();
    return(
        <div style={{color:props.color}} className={classes.textData}>
           <span>{props.message}</span>
            </div>
    );
}