import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center' }}
      className={props.classStyles}
    >
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
  //   const [progress, setProgress] = React.useState(10);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .css-eglki6-MuiLinearProgress-root': {
        height: '6px',
        borderRadius: '5px',
      },
      '& .MuiLinearProgress-colorPrimary': {
        backgroundColor: 'lightgrey',
      },
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : 'green',
      },
    },
  }));
  const classes = useStyles();

  React.useEffect(() => {
    // const timer = setInterval(() => {
    //   setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    // }, 800);
    // return () => {
    //   clearInterval(timer);
    // };
  }, []);

  return (
    <div className={classes.root} style={{ marginTop: '-5px' }}>
      <LinearProgressWithLabel
        value={props.value ? props.value : 0}
        classStyles={classes.root}
      />
    </div>
  );
}
