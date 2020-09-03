import React from "react";

import Hidden from '@material-ui/core/Hidden'

import loginBg from '../../../assets/login-bg.png';
import { Logo } from '../UIElements/Logo';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'relative',
    width: '40%',
    height: '100%',
    backgroundImage: `url(${loginBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  mask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(99, 123, 254, 0.6)'
  },
  logoContainer: {
    position: 'absolute',
    top: '45%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    color: 'white'
  },
  logo: {
    width: '15%',
    marginBottom: '1rem',
  }
});

export function LoginImg(props) {
  const classes = useStyles();
  return (
    <Hidden xsDown>
      <div className={classes.container}>
        <div className={classes.mask} />
        <Logo logoStyle={classes} title />
      </div>
    </Hidden>
  )
}