import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from "@material-ui/core/Toolbar";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import { LoginUploadBtn } from '../components/LoginUploadBtn';
import { ProfileAvator } from '../components/ProfileAvator';
import { Logo } from '../components/Logo';

import logo from '../assets/logo.png';

import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = "15rem";

const useStyles = makeStyles(theme => ({
  invisible: {
    visibility: 'hidden'
  },
  hidden: {
    display: 'none'
  },
  btnOnfocus: {
    backgroundColor: '#4366a7',
    color: '#38cc89'
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  tabRoot: {
    width: '70%',
    margin: '0.4rem auto',
    borderRadius: '0.5rem',
    minHeight: '2rem',
    textTransform: 'none'
  },
  tabWrapper: {
    flexDirection: 'row',
    justifyContent: 'normal',
    alignItems: 'baseline'
  },
  tabIcon: {
    marginRight: '1rem',
    marginBottom: 0,
    fontSize: '0.7rem'
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
  utilbar: {
    [theme.breakpoints.up("sm")]: {
      ...theme.mixins.toolbar,
      backgroundColor: '#314f85',
      opacity: 0.4,
      color: '#fafafa'
    }
  },
  utilbarMain: {
    backgroundColor: '#fafafa'
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1b3460',
    color: '#fafafa'
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
  const [page, setPage] = useState('Dashboard');
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleChange = (e, page) => {
    setPage(page);
  }

  const drawer = (
    <>
      <div className={classes.utilbar}></div>
      <Logo title logoStyle={classes} />
      <Tabs
        orientation="vertical"
        value={page}
        className={classes.tabs}
        classes={{
          indicator: classes.hidden
        }}
        onChange={handleChange}
      >
        {['Dashboard', 'Reports', 'Receipts'].map(tab => {
          return (
            <Tab
              icon={
                <FiberManualRecordIcon className={
                  `${classes.tabIcon} ${tab === page || classes.invisible}`
                } />
              }
              label={tab}
              value={tab}
              classes={{
                root: classes.tabRoot,
                wrapper: classes.tabWrapper,
                selected: classes.btnOnfocus
              }}
            />
          )
        })}
      </Tabs>
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
              paper: classes.drawerPaper
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