import React from "react";

import { Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  btnLoginTopContainer: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    '&::before': {
      content: props => `"${props.label}"`
    }
  },
  btnLoginTop: {
    width: '7rem',
    height: '3rem',
    marginLeft: '1rem',
    backgroundColor: 'white',
    boxShadow: '2px 2px 5px grey',
    textTransform: 'none',
  }
});

export function LoginTopBtn(props) {
  const pageText = {
    login: {
      label: 'Don\'t have an account?',
      btnText: 'Create'
    },
    signup: {
      label: 'Already have an account?',
      btnText: 'Login'
    }
  }
  const { page } = props;
  const { label, btnText } = pageText[page];
  const classes = useStyles({ label });
  return (
    <div className={classes.btnLoginTopContainer}>
      <Button variant="contained" className={classes.btnLoginTop}>{btnText}</Button>
    </div>
  )
}