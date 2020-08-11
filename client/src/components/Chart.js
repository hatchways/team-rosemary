import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'chart-container': {
    width: '100%',
    padding: '1rem'
  },
  'txt-expenses-total': {
    fontSize: '2rem'
  }
});

export function Chart(props) {
  const classes = useStyles();
  const expense = 2000;
  return (
    <div>
      <p className={classes["txt-expenses-total"]}><sup>$</sup>{expense.toLocaleString()}</p>
      <div>Chart</div>
    </div>
  )
}