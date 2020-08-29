import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Header } from '../shared/components/HeaderElements/Header';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../shared/hooks/http-hook';
import { theme } from '../themes/theme';

//Lazy loading or code splitting
const Dashboard = React.lazy(() => import('./Dashboard'));
const Receipts = React.lazy(() => import('./Receipts'));
const Reports = React.lazy(() => import('./Receipts'));

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

export default function Home(props) {
  const classes = useStyles();
  const { isLoading, error, clearError } = useHttpClient();
  const [page, setPage] = useState('Dashboard');
  const [receiptCount, setReceiptCount] = useState(0);

  const handleReceiptUpload = () => {
    setReceiptCount(receiptCount + 1);
    
    // const currState =  reloadTransactions === false ? true: reloadTransactions;
    //setReloadTransactions(currState);
  };
  const handleChange = (e, page) => {
    setPage(page);
  };

  const pages = [
    { name: 'Dashboard', component: <Dashboard receiptCount={receiptCount} /> },
    { name: 'Reports', component: <Reports /> },
    { name: 'Receipts', component: <Receipts /> },
  ];


  return (
    <Router>
      <Box display="flex">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Header
            page={page}
            onChange={handleChange}
            onReceiptUpload={handleReceiptUpload}
          />
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
            <React.Suspense fallback={<div className="center"><LoadingSpinner asOverlay></LoadingSpinner></div>}>
              {pages.map((page, index) => {
                const { name, component } = page;
                return (
                  <Route exact path={`/${name.toLowerCase()}`} key={name}>
                    {component}
                  </Route>
                )
              })}
              </React.Suspense>
            </Switch>
          </main>
        </ThemeProvider>
      </Box >
    </Router >
  )
}