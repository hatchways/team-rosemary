import React from "react";
import { Box, Button, TextField } from "@material-ui/core";

import { LoginUploadBtn } from './LoginUploadBtn';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//   btnLoginUpload: {
//     width: '9rem',
//     height: '3rem',
//     color: '#00a152',
//     borderColor: '#00a152',
//     textTransform: 'none'
//   }
// });


// Errors: Not valid type (email), email not in the database, email/password not matching
// Errors clear: e.target.onChange
export function LoginForm(props) {
  const pageText = {
    login: {
      title: 'Welcome back!',
      btnText: 'Log In'
    },
    signup: {
      title: 'Create an account',
      btnText: 'Create'
    }
  }
  const { title, btnText } = pageText[props.page];
  // const classes = useStyles();
  return (
    <Box component="form" display="flex" flexDirection="column" width="20rem" height="25rem" ml="5rem">
      <h2>{title}</h2>
      <TextField type="email" id="email" label="E-mail address" required />
      <TextField type="password" id="password" label="Password" required />
      <LoginUploadBtn>{btnText}</LoginUploadBtn>
    </Box>
  )
}
