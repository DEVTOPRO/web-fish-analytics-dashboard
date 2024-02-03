import React from 'react';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles((theme) => ({
  cardLayout: {
    // height: 'auto',
     zIndex: '1200',
     position: 'relative',
  },
  copyRight: {
    textAlign: 'center',
    padding: '1% 0px',
    fontSize: '14px',
    fontWeight: '700',
    background:'#c3d1e4',
    color:'#180a47',
    borderTop:"1px solid #e1e1e10d",
  },
}));

export default function Footer(props) {
  const classes = useStyles();

  const AboutUsHandler = () => {
    props.Redirectpath('/AboutUs');
  };
  const AboutUsHandler1 = () => {
    props.Redirectpath('/');
  };
  const downloadHandler = () => {
    props.Redirectpath('/Download');
  };
  return (
  <div className={classes.cardLayout}>
    
          <div className={classes.copyRight}>
            Copyright &#169;  fish analyics reserved all Right Reserved.{' '}
          </div>
        </div>
  );
}
