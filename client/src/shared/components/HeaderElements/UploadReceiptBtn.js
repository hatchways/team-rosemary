import React from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ReceiptIcon from '@material-ui/icons/Receipt';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  btnLoginUpload: {
    [theme.breakpoints.up("sm")]: {
      width: '9rem',
      height: '2.5rem',
      color: '#38cc89',
      borderColor: '#38cc89',
      textTransform: 'none'
    },
    color: '#38cc89'
  }
}));

export function UploadReceiptBtn(props) {
  const classes = useStyles();
  const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'));

  return (
    isMobile ?
      (
        <IconButton>
          <ReceiptIcon className={classes.btnLoginUpload} {...props} />
        </IconButton>
      ) : (
        <Button variant="outlined" className={classes.btnLoginUpload} {...props}>{props.children}</Button>
      )
  )
}