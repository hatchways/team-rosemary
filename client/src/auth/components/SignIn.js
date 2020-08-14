import React, { useState, useContext, Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from "react-router-dom";
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import Copyright from '../../shared/components/FooterElements/Copyright';
import { AuthContext } from '../../shared/context/auth-context';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helperText :{
    color: red
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter a valid email").required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const endpoint = 'http://localhost:6000/api/user/login'


export default  function SignIn() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
 
  const { handleSubmit, handleChange, handleBlur, values, errors, touched,isValid} = useFormik({
       initialValues: {
         email: "",
         password: ""
       },
       validationSchema,
       onSubmit(values) {
        axios.post(endpoint,
          values,
          {
            headers: {
             'Content-Type': 'application/json',
            }
          },
        ).then((resp) => {

          if(200 === resp.status) {
             auth.login(resp.userId, resp.token);
          }

          console.log(resp);
        
          console.log(resp.status);
         
        }).catch(err => {
          if (err.response) {
           if(401 === err.response.status){
              setOpen(true);
           }
          } else if (err.request) {
            // client never received a response, or request never left
          } else {
            // anything else
          }
      });
       }
  });

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <div>
     
    </div>
  
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                type='email'
                autoComplete='email'
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email ? errors.email : ""}
                error={touched.email && Boolean(errors.email)}
                autoFocus
                
              />
              <TextField
           
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password ? errors.password : ""}
                error={touched.password && Boolean(errors.password)}
                autoComplete='current-password'
              />
            
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                disabled={!isValid}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to='/signup' variant='body2'>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
      
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}>
  <Alert onClose={handleClose} severity="error">
   Invalid email/password
  </Alert>
</Snackbar>
    </Container>
  );
}
