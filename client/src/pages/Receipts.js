import React from "react";

import { Header } from '../components/Header';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'container': {
    // position: 'relative',
    // display: 'flex',
    // alignItems:'center',
    width: '100%',
    height: '100vh'
  }
});

// Header (Nav) and Menu reusable
export function Receipts(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header title="Receipts"/>
    </div>
  )
}