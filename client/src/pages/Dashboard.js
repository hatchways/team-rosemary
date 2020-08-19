import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import { Panel } from '../components/Panel';
import { Chart } from '../components/Chart';
import { CatStatTable } from '../components/CatStatTable';
import { TransactionTable } from '../components/TransactionTable';
import { MonthSelector } from '../components/MonthSelector';

// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   utilbar: {
//     [theme.breakpoints.up("sm")]: {
//       ...theme.mixins.toolbar,
//       backgroundColor: '#fafafa',
//       opacity: 0.4,
//       color: theme.palette.primary.contrastText
//     }
//   },
//   utilbarMain: {
//     backgroundColor: "#fafbff"
//   },
//   main: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     flexGrow: 1,
//     minHeight: '100vh',
//     padding: theme.spacing(3),
//     overflowX: 'hidden',
//     backgroundColor: '#fafbff',
//     [theme.breakpoints.down("xs")]: {
//       marginTop: '3rem',
//       padding: theme.spacing(1)
//     }
//   }
// }));

export function Dashboard(props) {
  // const classes = useStyles();

  return (
    <>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12} md={6}>
          <Panel title="TOTAL EXPENSES">
            <MonthSelector top="1rem" right="1rem" />
            <Chart />
          </Panel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Panel title="TOP CATEGORIES">
            <CatStatTable />
          </Panel>
        </Grid>
      </Grid>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12}>
          <h3>Recent Transactions</h3>
        </Grid>
      </Grid>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12}>
          <Panel>
            <TransactionTable />
          </Panel>
        </Grid>
      </Grid>
    </>
  );
}
