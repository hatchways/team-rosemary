import React, { useState } from 'react';

import Paper from '@material-ui/core/paper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    padding: '1rem',
    minWidth: '20rem',
    height: '16rem',
    borderRadius: '1rem',
    [theme.breakpoints.down("xs")]: {
      minWidth: '19rem'
    }
  },
  title: {
    fontSize: '0.8rem',
    color: 'green'
  }
}));

export function Panel(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {props.title && <h4 className={classes.title}>{props.title}</h4>}
      {props.children}
    </Paper>
  )
}