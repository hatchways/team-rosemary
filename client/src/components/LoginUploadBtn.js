import React from "react";
import { Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  btnLoginUpload: {
    width: '9rem',
    height: '3rem',
    color: '#00a152', // #38cc89
    borderColor: '#00a152',
    textTransform: 'none'
  }
});

export function LoginUploadBtn(props) {
  const classes = useStyles();
  return (
    <Button variant="outlined" className={classes.btnLoginUpload}>{props.children}</Button>
  )
}