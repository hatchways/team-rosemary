import React from 'react';

import { Box } from "@material-ui/core";

import Avatar from '@material-ui/core/Avatar';

import User from '../assets/user.png';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'avator-container': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 2rem'
  },
  'avator': {
    margin: '0 1rem'
  }
})

export function ProfileAvator(props) {
  const classes = useStyles();
  return (
    <div className={classes["avator-container"]}>
      <Avatar alt="User Avator" src={User} className={classes.avator} />
      <div>Profile</div>
    </div>
  )
}