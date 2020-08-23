import React from "react";

import Drawer from "@material-ui/core/Drawer";

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "15rem";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  utilbar: {
    ...theme.mixins.toolbar,
    backgroundColor: '#314f85',
    opacity: 0.4,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1b3460',
    color: '#fafafa'
  }
}));

export function SideBar(props) {
  const classes = useStyles();

  const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'));

  return (
    <nav className={classes.drawer}>
      <Drawer
        classes={{
          paper: classes.drawerPaper
        }}
        {...(isMobile ? {
          variant: "temporary",
          ModalProps: {
            keepMounted: true,
            BackdropProps: {
              invisible: true
            }
          },
          ...props
        } : {
            variant: "permanent",
            open: true
          }
        )}
      >
        <div className={classes.utilbar}></div>
        {props.children}
      </Drawer>
    </nav>
  )
}
