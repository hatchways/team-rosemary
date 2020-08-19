import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { LoginUploadBtn } from '../components/LoginUploadBtn';
import { ProfileAvator } from '../components/ProfileAvator';
import { Logo } from '../components/Logo';

import { Dashboard } from './Dashboard';
import { Reports } from './Reports';
import { Receipts } from './Receipts';

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
    ...theme.mixins.toolbar,
    backgroundColor: '#314f85',
    opacity: 0.4,
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
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 0
  },
  logo: {
    width: '15%',
    marginRight: '2rem'
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    minHeight: '100vh',
    padding: theme.spacing(3),
    overflowX: 'hidden',
    backgroundColor: '#fafbff',
    [theme.breakpoints.down("xs")]: {
      marginTop: '3rem',
      padding: theme.spacing(1)
    }
  }
}));

export function Home(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState('Dashboard');
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const handleChange = (e, page) => {
    setPage(page);
  };

  const pages = [
    { name: 'Dashboard', component: <Dashboard /> },
    { name: 'Reports', component: <Reports /> },
    { name: 'Receipts', component: <Receipts /> },
  ];

  const isMobile = useMediaQuery(useTheme().breakpoints.down('xs'));

  return (
    <Router>
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
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            {...(isMobile ? {
              variant: "temporary",
              open: mobileOpen,
              ModalProps: {
                keepMounted: true,
                BackdropProps: {
                  invisible: true
                }
              },
              onClose: handleDrawerToggle
            } : {
                variant: "permanent",
                open: true
              }
            )}
          >
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
              onClick={isMobile && handleDrawerToggle}
            >
              {pages.map(tab => {
                const { name } = tab;
                return (
                  <Tab
                    key={name}
                    component={Link}
                    to={`/${name.toLowerCase()}`}
                    icon={
                      <FiberManualRecordIcon className={
                        `${classes.tabIcon} ${name === page || classes.invisible}`
                      } />
                    }
                    label={name}
                    value={name}
                    classes={{
                      root: classes.tabRoot,
                      wrapper: classes.tabWrapper,
                      selected: classes.btnOnfocus
                    }}
                  />
                )
              })}
            </Tabs>
          </Drawer>
        </nav>
      </header >
      <main className={classes.main}>
        <div className={`${classes.utilbar} ${classes.utilbarMain}`} />
        <Grid container spacing={3} xs={12} lg={10}>
          <Grid item xs={12}>
            <h2>{page}</h2>
          </Grid>
        </Grid>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          {pages.map(page => {
            const { name, component } = page;
            return (
              <Route exact path={`/${name.toLowerCase()}`} key={name}>
                {component}
              </Route>
            )
          })}
        </Switch>
      </main>
    </Router>
  )
}