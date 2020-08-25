import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: ({ drawerWidth }) => `calc(100% - ${drawerWidth})`,
      marginLeft: ({ drawerWidth }) => drawerWidth
    }
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    backgroundColor: '#fafafa',
    color: 'initial'
  }
}));

export function TopBar(props) {
  const { drawerWidth, children } = props;
  const classes = useStyles({ drawerWidth });
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {children}
      </Toolbar>
    </AppBar>
  )
}
