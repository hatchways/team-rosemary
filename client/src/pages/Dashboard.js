import React, { useState } from "react";

import { Grid } from '@material-ui/core';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Header } from '../components/Header';
import { Panel } from '../components/Panel';
import { Chart } from '../components/Chart';
import { CatStatTable } from '../components/CatStatTable';
import { TransactionTable } from '../components/TransactionTable';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  'container': {
    // position: 'relative',
    // display: 'flex',
    // alignItems:'center',
    width: 'calc(100% - 25rem)',
    minHeight: '100vh',
    margin: '5rem 5rem 0 25rem',
    overflowX: 'hidden'
  },
  'title': {
    marginTop: '5rem'
  },
  'formControl': {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

// Header (Nav) and Menu reusable
export function Dashboard(props) {
  const [month, setMonth] = useState('')
  const classes = useStyles();

  const handleChange = e => setMonth(e.target.value);
  return (
    <div className={classes.container}>
      <Header title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2 className={classes.title}>Dashboard</h2>
        </Grid>
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
        <Grid item xs={12} lg={8}>
          <h3>Recent Transactions</h3>
          <Panel>
            <TransactionTable />
          </Panel>
        </Grid>
      </Grid>

    </div>
  )
}