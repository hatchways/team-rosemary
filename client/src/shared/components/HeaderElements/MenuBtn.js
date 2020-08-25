import React from "react";

import { Hidden } from "@material-ui/core";

import logo from '../../../assets/logo.png';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menuButton: {
    width: '2rem',
    marginLeft: '0.8rem',
    marginRight: 'auto',
    borderRadius: '50%',
    cursor: 'pointer',
  }
})

export function MenuBtn(props) {
  const classes = useStyles();
  return (
    <Hidden smUp>
      <img
        src={logo}
        alt="logo"
        className={classes.menuButton}
        {...props}
      />
    </Hidden>
  )
}