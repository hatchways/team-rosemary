import React, { useState } from 'react';

import Paper from '@material-ui/core/paper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'panel-container': {
    position: 'relative',
    padding: '1.5rem',
    // minWidth: '20rem',
    height: '12rem',
    borderRadius: '1rem'
  },
  'panel-title': {
    fontSize: '0.8rem',
    color: 'green'
  }
});

export function Panel(props) {
  const classes = useStyles();
  return (
    <Paper className={classes["panel-container"]}>
      {props.title && <h4 className={classes["panel-title"]}>{props.title}</h4>}
      {props.children}
    </Paper>
  )
}