import React, { useContext } from "react";

import { Context } from '../utils/context';

import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import { LoginUploadBtn } from '../components/LoginUploadBtn';
import { ProfileAvator } from '../components/ProfileAvator';
import { Menu } from '../components/Menu';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'header': {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    height: '5rem',
    backgroundColor: 'white',
    color: '#000'
  },
  'title': {
    fontSize: '1.5rem',
    flexGrow: 1,
  }
});

// Header (Nav) and Menu reusable
export function Header(props) {
  // const context = useContext(Context);
  const classes = useStyles();
  return (
    <AppBar component="header">
      <Toolbar className={classes.header}>
        <Menu />
        <LoginUploadBtn>Upload Receipt</LoginUploadBtn>
        <ProfileAvator />
      </Toolbar>
    </AppBar>
  )
}