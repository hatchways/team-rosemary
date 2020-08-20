import React from 'react';

import Paper from '@material-ui/core/paper';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    padding: '1rem',
    height: '16rem',
    borderRadius: '1rem'
  },
  title: {
    fontSize: '0.8rem',
    color: '#38cc89'
  }
});

export function Panel(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.container}>
      {props.title && <h4 className={classes.title}>{props.title}</h4>}
      {props.children}
    </Paper>
  )
}