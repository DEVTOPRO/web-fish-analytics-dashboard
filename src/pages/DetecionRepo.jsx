import * as React from 'react'
import { makeStyles } from '@mui/styles';
import CameraTwoToneIcon from '@mui/icons-material/CameraTwoTone';
const useStyles = makeStyles(theme => ({
    root :{
        display:"flex",
        padding:"16% 5%",
        alignItems:'center',
        color:"radial-gradient(circle, rgba(187,238,174,1) 0%, rgba(148,193,233,1) 100%)"
    },
  
}))
export default function DetecionsRepo(props){
    const classes = useStyles();
    return(
        <div className={classes.root}>

            <div>
                <CameraTwoToneIcon sx={{fontSize:"7rem",color:"rgb(63,94,251)"}}/>
            </div>
        <h1>
            Universeral Detecions analytics is Under Planning for MVP-2
            </h1>
        </div>
       
    )

}