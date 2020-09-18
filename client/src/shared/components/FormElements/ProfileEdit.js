import React, { useState, useContext } from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const fields = {
  'User Name': {
    id: "name",
    label: "New User Name",
    name: "name",
    type: "text"
  },
  'Email Address': {
    id: "email",
    label: "New Email Address",
    name: "email",
    type: "email"
  },
  'Password': {
    id: "password",
    label: "Old Password",
    name: "password",
    type: "password"
  }
};

// name, email: new(reg) old(right) old(same)
// password: old(right) new(>6) new(same)
export default function ProfileEdit(props) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  //useFormik
  const handleChange = e => {
    setValue(e.target.value);
  };

  const { field } = props;
  const { id, label, name, type } = field ? fields[field] : {};
  const isEditingPassword = field === 'Password';

  const editNameEmail = (
    <>
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        id="password"
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
      />
    </>
  )

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
    // onSubmit={handleSubmit}
    // noValidate
    >
      {isEditingPassword ? null : editNameEmail}
    </Box>
  )
}