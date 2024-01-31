import React, { Fragment } from 'react';
import { Link } from '@mui/material';
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from '@mui/styles';

const useStyles = makeStyles(theme => ({
  linkStyles: {
    color: '#69bceb',
  },
}));
export default function ReDirectLink(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <Link href={props.path}  target='_blank'>
        <span className={classes.linkStyles}>{props.label}</span>
      </Link>
    </Fragment>
  );
}
