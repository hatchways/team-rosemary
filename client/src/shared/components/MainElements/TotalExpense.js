import React from "react";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  txtExpensesTotal: {
    margin: '1rem 0',
    fontSize: '2rem'
  },
  float: {
    position: 'absolute',
    top: 0,
    left: '10rem',
    [theme.breakpoints.down("xs")]: {
      left: '5rem'
    }
  }
}));

export default function TotalExpense(props) {
  const classes = useStyles();
  const { total, float } = props;
  return (
    <p className={`${classes.txtExpensesTotal} ${float ? classes.float : ''}`}><sup>$</sup>{total.toLocaleString()}</p>
  )
}

