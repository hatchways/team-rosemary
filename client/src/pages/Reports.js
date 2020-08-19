import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  pRel: {
    position: 'relative'
  },
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
  }
}));

export function Reports(props) {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div className={`${classes.utilbar} ${classes.utilbarMain}`} />
      <Grid container spacing={3} xs={12} lg={10}>
        <Grid item xs={12}>
          <h2>Reports</h2>
        </Grid>
      </Grid>
    </main>
  )
}