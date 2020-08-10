import React from "react";

import { LoginForm } from '../components/LoginForm';
import { LoginImg } from '../components/LoginImg';
import { LoginTopBtn } from '../components/LoginTopBtn';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'login-container': {
    position: 'relative',
    display: 'flex',
    alignItems:'center',
    width: '100%',
    height: '100vh'
  }
});

export function Login(props) {
  const classes = useStyles();
  const { page } = props;
  return (
    <div className={classes["login-container"]}>
      <LoginImg />
      <LoginForm page={page} />
      <LoginTopBtn page={page} />
    </div>
  )
}