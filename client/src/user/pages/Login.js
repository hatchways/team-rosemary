import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Copyright from '../../shared/components/FooterElements/Copyright';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import SuccessModal from '../../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { LoginImg } from '../../shared/components/LoginElements/LoginImg';
import { LoginTopBtn } from '../../shared/components/LoginElements/LoginTopBtn';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    [theme.breakpoints.down("xs")]: {
      width: '90%',
      margin: 'auto'
    }
  },
  main: {
    position: 'relative',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    [theme.breakpoints.down("xs")]: {
      width: '100%'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(10),
    width: '20rem',
    [theme.breakpoints.down("xs")]: {
      margin: 'auto',
      width: '100%'
    }
  },
  button: {
    marginTop: theme.spacing(4),
    width: '9rem',
    height: '2.5rem',
    color: '#38cc89',
    borderColor: '#38cc89',
    textTransform: 'none'
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function Login(props) {
  const classes = useStyles();

  const history = useHistory();
  const [message, setMessage] = useState('');

  const auth = useContext(AuthContext);
  const {
    isLoading,
    error,
    success,
    sendRequest,
    clearError,
    clearSuccess,
  } = useHttpClient();
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    async onSubmit(values) {
      try {
        const endpoint =
          process.env.REACT_APP_API_BASE_URL + 'user/login';
        const responseData = await sendRequest(
          endpoint,
          'POST',
          JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          {
            'Content-Type': 'application/json',
          }
        );

        auth.login(responseData.results.userId, responseData.results.userName, responseData.results.token);
        setMessage('Signed in successfully!');
        history.push('/dashboard');

      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className={classes.container}>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <SuccessModal
        success={success}
        successMessage={message}
        onClear={clearSuccess}
      />
      <LoginImg />
      <main className={classes.main}>
        <LoginTopBtn page="login" />
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <h2>Welcome back!</h2>
          <TextField
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email ? errors.email : ''}
            error={touched.email && Boolean(errors.email)}
            required
            autoFocus
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            margin="normal"
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password ? errors.password : ''}
            error={touched.password && Boolean(errors.password)}
            required
          />
          <Button
            type="submit"
            variant="outlined"
            disabled={!isValid}
            className={classes.button}
          >
            Log In
        </Button>
        </form>
        <Copyright />
      </main>
    </div>
  )
}