import React, { useState, useEffect } from "react";

import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import ListSubheader from '@material-ui/core/ListSubheader';

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

export function DateSelector(props) {
  const { top, right, value, onChange } = props;
  const classes = useStyles({ top, right });

  /* 
  As for the <options/> which scheme below we choose?
  1. From Jan to Dec
  2. Only months with receipts in the dbase
  */
  return (
    <FormControl className={classes.formControl}>
      <Select value={value} onChange={onChange}>
        <ListSubheader>2020</ListSubheader>
        <MenuItem value="2020-7">Angust</MenuItem>
        <MenuItem value="2020-8">September</MenuItem>
        <ListSubheader>2019</ListSubheader>
        <MenuItem value="2019-7">August</MenuItem>
      </Select>
    </FormControl>
  );
}


