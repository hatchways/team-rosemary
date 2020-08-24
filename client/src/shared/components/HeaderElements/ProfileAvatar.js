import React from 'react';

import Avatar from "@material-ui/core/Avatar";

import User from '../../../assets/user.png';

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
  avatar: {
    marginRight: '1rem'
  },
  text: {
    [theme.breakpoints.down("xs")]: {
      display: 'none'
    }
  }
}))

export function ProfileAvatar(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Avatar alt="User Avatar" src={User} className={classes.avatar} />
      <div className={classes.text}>Profile</div>
    </div>
  )
}