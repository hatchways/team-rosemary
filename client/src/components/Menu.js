import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { LoginUploadBtn } from '../components/LoginUploadBtn';
import { ProfileAvator } from '../components/ProfileAvator';
import { Logo } from '../components/Logo';

import logo from '../assets/logo.png';

import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "15rem";

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  list: {
    marginTop: theme.spacing(3)
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth})`,
      marginLeft: drawerWidth
    }
  },
  toolbar: {
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    // height: '5rem',
    backgroundColor: '#fafafa',
    color: 'initial'
  },
  // menuButton will be the logo
  menuButton: {
    width: '2rem',
    marginLeft: '0.8rem',
    marginRight: 'auto',
    borderRadius: '50%',
    cursor: 'pointer',
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  utilbar: {
    [theme.breakpoints.up("sm")]: {
      ...theme.mixins.toolbar,
      backgroundColor: theme.palette.primary.main,
      opacity: 0.4,
      color: theme.palette.primary.contrastText
    }
  },
  utilbarMain: {
    backgroundColor: "#fafafa"
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "rgba(0, 0, 255, 0.4)"
  },
  drawerPaperXs: {
    width: drawerWidth,
    backgroundColor: "#fafafa"
  },
  logoContainer: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      ...theme.mixins.toolbar,
      position: 'absolute',
      top: 0,
      left: 0,
      color: '#fafafa'
    }
  },
  logo: {
    width: '15%',
    marginRight: '2rem'
  }
}));

// Can be HOC or render props
export function Menu(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // Set current onfocus according to url?
  // Use radio instead of button for the listitems to solve the focus problem?
  const drawer = (
    <>
      <div className={classes.utilbar}></div>
      <Logo title logoStyle={classes} />
      <List className={classes.list}>
        {["Dashboard", "Reports", "Receipts"].map((text, index) => (
          <ListItem component="li" button key={text + ' ' + index}>
            <ListItemIcon>
              {/* Icon display only onfocus */}
              <FiberManualRecordIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <header>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img
            src={logo}
            alt="logo"
            className={classes.menuButton}
            onClick={handleDrawerToggle}
          />
          <LoginUploadBtn>Upload Receipt</LoginUploadBtn>
          <ProfileAvator />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            classes={{
              paper: `${classes.drawerPaper} ${classes.drawerPaperXs}`
            }}
            ModalProps={{
              keepMounted: true,
              BackdropProps: {
                invisible: true
              }
            }}
            onClose={handleDrawerToggle}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </header>
  )
}