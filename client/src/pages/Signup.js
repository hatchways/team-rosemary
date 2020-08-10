import React from "react";

import { LoginImg } from '../components/LoginImg';
import { LoginForm } from '../components/LoginForm';
import { LoginTopBtn } from '../components/LoginTopBtn';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'signup-container': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100vh'
  }
});

export function Signup(props) {
  const classes = useStyles();
  const { page } = props;
  return (
    <div className={classes["signup-container"]}>
      <LoginImg />
      <LoginForm page={page} />
      <LoginTopBtn page={page} />
    </div>
  )
}