import React, { useState, useContext } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    position: 'absolute',
    top: '0.5rem',
    right: '-5rem',
    textTransform: 'none',
    [theme.breakpoints.down('xs')]: {
      top: '-0.6rem',
      left: '5rem'
    }
  }
}))

export default function ProfileTextField(props) {
  const classes = useStyles();

  const { id, label, name, type, value, onOpen } = props;

  const handleClick = () => {
    onOpen(label);
  }

  return (
    <Box position="relative">
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        InputProps={{ disableUnderline: true, disabled: true }}
      />
      <Button className={classes.button} onClick={handleClick}>Edit</Button>
    </Box>
  )
}