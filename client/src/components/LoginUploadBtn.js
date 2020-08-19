import React from "react";

import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ReceiptIcon from '@material-ui/icons/Receipt';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  btnLoginUpload: {
    width: '9rem',
    height: '2.5rem',
    color: '#38cc89',
    borderColor: '#38cc89',
    textTransform: 'none'
  },
  btnLoginUploadXs: {
    color: '#38cc89'
  }
}));

export function LoginUploadBtn(props) {
  const classes = useStyles();
  return (
    <>
      <Hidden smUp>
        <IconButton>
          <ReceiptIcon className={classes.btnLoginUploadXs} />
        </IconButton>
      </Hidden>
      <Hidden xsDown>
        <Button variant="outlined" className={classes.btnLoginUpload}>{props.children}</Button>
      </Hidden>
    </>
  )
}