import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";

import { Panel } from '../components/Panel';
import { Chart } from '../components/Chart';
import { CatStatTable } from '../components/CatStatTable';
import { TransactionTable } from '../components/TransactionTable';
import { Menu } from '../components/Menu';

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  main: {
    flexGrow: 1,
    minHeight: '100vh',
    padding: theme.spacing(3)
  },
  formControl: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export function Dashboard(props) {
  const classes = useStyles();
  const [month, setMonth] = useState('');

  const handleChange = e => setMonth(e.target.value);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Menu />
      <main className={classes.main}>
        <div className={`${classes.toolbar} ${classes.toolbarMain}`} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Dashboard</h2>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6} lg={4}>
            <Panel title="TOTAL EXPENSES">
              <FormControl className={classes.formControl}>
                <Select value={month} onChange={handleChange}>
                  <MenuItem value='November'>November</MenuItem>
                </Select>
              </FormControl>
              <Chart />
            </Panel>
          </Grid>
          <Grid item xs={6} lg={4}>
            <Panel title="TOP CATEGORIES">
              <CatStatTable />
            </Panel>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>Recent Transactions</h3>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Panel>
              <TransactionTable />
            </Panel>
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
