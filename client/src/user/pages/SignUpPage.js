import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import loginBg from '../../assets/login-bg.png';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import SuccessModal from '../../shared/components/UIElements/SuccessModal';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Copyright from '../../shared/components/FooterElements/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${loginBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
}));


const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string('Enter your password')
    .min(6, 'Password must contain at least 6 characters')
    .required('Enter your password'),
  confirmPassword: Yup.string('Enter your password')
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
});

export default function SignUp() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const { isLoading, error,  success,
    sendRequest,
    clearError,
    clearSuccess, } = useHttpClient();
  const [message, setMessage] = useState('');
  const history = useHistory();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
    } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema,
    async onSubmit(values) {

      try {
        const endpoint = process.env.REACT_APP_API_BASE_URL + 'user/signup';
        const responseData = await sendRequest(
          endpoint,
          'POST',
          JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password
          }),
          {
            'Content-Type': 'application/json',
          }
        );
        auth.login(responseData.userId, responseData.token);
        setMessage('You have signed up successfully!');
        setTimeout(() => {
          history.push('/dashboard');
        }, 2000);
        
      } catch (err) {
        console.log(err);
      }
    }

 });

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <ErrorModal error={error} onClear={clearError} />
      <SuccessModal
                success={success}
                successMessage={message}
                onClear={clearSuccess}
            />
     <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
      {isLoading && <LoadingSpinner asOverlay />}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <div></div>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            type='text'
            autoComplete='name'
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.name ? errors.name : ''}
            error={touched.name && Boolean(errors.name)}
            autoFocus
          />
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
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            
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
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            autoComplete='current-password'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='confirmPassword'
            label='Confirm Password'
            type='password'
            id='confirmPassword'
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.confirmPassword ? errors.confirmPassword : ''}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
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
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
     
      <Box mt={8}>
        <Copyright />
      </Box> 
      </div>
      
      </Grid>
    </Grid>
    
  );
}
