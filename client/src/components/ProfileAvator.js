import React from 'react';

import { Avatar, Box } from "@material-ui/core";

import User from '../assets/user.png';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 2rem',
    [theme.breakpoints.down("xs")]: {
      margin: 0
    }
  },
  avator: {
    marginRight: '1rem'
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      display: 'none'
    }
  }
}))

export function ProfileAvator(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar alt="User Avator" src={User} className={classes.avator} />
      <div className={classes.text}>Profile</div>
    </div>
  )
}