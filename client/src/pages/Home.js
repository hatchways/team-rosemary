import React, { useState, useEffect } from "react";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Header } from '../shared/components/HeaderElements/Header';

import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../shared/hooks/http-hook';

import { Dashboard } from './Dashboard';
import { Reports } from './Reports';
import { Receipts } from './Receipts';

import { theme } from '../themes/theme';

import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  utilbar: {
    ...theme.mixins.toolbar,
    backgroundColor: '#314f85',
    opacity: 0.4,
  },
  utilbarMain: {
    backgroundColor: '#fafafa'
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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [page, setPage] = useState('');

  const handleChange = (e, page) => {
    setPage(page);
  };

  // Stay in the previous page after refreshing, or go to Dashboard at the first entry
  useEffect(() => {
    const prevPage = sessionStorage.getItem('page');
    if (prevPage) {
      setPage(prevPage);
    } else {
      sessionStorage.setItem('page', 'Dashboard');
      setPage('Dashboard');
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('page', page);
  }, [page])

  const pages = [
    { name: 'Dashboard', component: <Dashboard /> },
    { name: 'Reports', component: <Reports /> },
    { name: 'Receipts', component: <Receipts /> },
  ];


  return (
    <Router>
      <Box display="flex">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Header page={page} onChange={handleChange} />
          <main className={classes.main}>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className={`${classes.utilbar} ${classes.utilbarMain}`} />
            <Grid container spacing={3} xs={12} lg={10}>
              <Grid item xs={12}>
                <h2>{page}</h2>
              </Grid>
            </Grid>
            <Switch>
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
        </ThemeProvider>
      </Box >
    </Router >
  )
}