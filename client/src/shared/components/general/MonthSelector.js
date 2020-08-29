import React, { useState, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    position: 'absolute',
    top: props => `${props.top}`,
    right: props => `${props.right}`,
    margin: theme.spacing(1),
    minWidth: 120,
    textAlign: 'center'
  }
}));

export function MonthSelector(props) {
  const { top, right, value, onChange } = props;
  const classes = useStyles({ top, right });
  // const [month, setMonth] = useState(new Date().getMonth() + 1);

  // const handleChange = e => {
  //   setMonth(e.target.value);
  // }

  // useEffect(() => {
  //   props.onChange(month);
  // }, [month])

  // states lifted. May use context.
  /* 
  As for the <options/> which scheme below we choose?
  1. From Jan to Dec
  2. Only months with receipts in the dbase
  */
  return (
    <FormControl className={classes.formControl}>
      <Select value={value} onChange={onChange}>
        <MenuItem value={7}>Angust</MenuItem>
        <MenuItem value={8}>Sep</MenuItem>
      </Select>
    </FormControl>
  );
}


