import React, { useState, useContext } from "react";
import FormControl from '@material-ui/core/FormControl';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';

import { Panel } from '../../components/Panel';
import { Chart } from '../../components/Chart';
import { CatStatTable } from '../../components/CatStatTable';
import { TransactionTable } from '../../components/TransactionTable';

import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from '../../shared/context/auth-context';
import AppDialog from '../../shared/components/UIElements/AppDialog.js';

const useStyles = makeStyles(theme => ({
  utilbar: {
    [theme.breakpoints.up("sm")]: {
      ...theme.mixins.toolbar,
      backgroundColor: '#fafafa',
      opacity: 0.4,
      color: theme.palette.primary.contrastText
    }
  },
  utilbarMain: {
    backgroundColor: "#fafbff"
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
  },
  formControl: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    margin: theme.spacing(1),
    minWidth: 120,
  },
  dialogbtn: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export function Dashboard(props) {
  const classes = useStyles();
  const [month, setMonth] = useState('');

  const handleChange = e => setMonth(e.target.value);
  const auth = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  }

  const handleDialogClose = () => {
      setIsOpen(false);
  }

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  return (
    <main className={classes.main}>
      <div className={`${classes.utilbar} ${classes.utilbarMain}`} />
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={9}>
          <h2>Dashboard</h2>
        </Grid>
        <Grid  xs={3}> <Button variant="outlined" className={classes.dialogbtn} color="primary" onClick={handleClickOpen}>
        Upload Receipt
      </Button></Grid>
       
      </Grid>
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12} md={6}>
          <Panel title="TOTAL EXPENSES">
            <FormControl className={classes.formControl}>
              <Select value={month} onChange={handleChange}>
                <MenuItem value='November'>November</MenuItem>
              </Select>
            </FormControl>
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
      <AppDialog size="md" isOpen = {isOpen} handleOpen = {handleDialogOpen} handleClose = {handleDialogClose} title='Upload receipt'>
            <h1> Upload receipt  </h1>
          </AppDialog>
    </main>
  );
}
