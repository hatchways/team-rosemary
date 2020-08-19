import React, { useState } from "react";
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
  }
}));

export function MonthSelector(props) {
  const { top, right } = props;
  const classes = useStyles({ top, right });
  const [month, setMonth] = useState('');

  const handleChange = e => setMonth(e.target.value);

  return (
    <FormControl className={classes.formControl}>
      <Select value={month} onChange={handleChange}>
        <MenuItem value='November'>November</MenuItem>
      </Select>
    </FormControl>
  );
}


