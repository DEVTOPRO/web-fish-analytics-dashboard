import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
function GradientCircularProgress(props) {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }} />    
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(props.progress)}%`}</Typography>
      </Box>
    </Box>

    </React.Fragment>
  );
}

export default function CustomizedProgressBars(props) {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <GradientCircularProgress progress={props.progress}/>
    </Stack>
  );
}
