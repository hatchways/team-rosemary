import React, { useState, useContext } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { useHttpClient } from '../../hooks/http-hook';
import ErrorModal from '../UIElements/ErrorModal';
import SuccessModal from '../UIElements/SuccessModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import { AuthContext } from '../../context/auth-context';
import ErrorBoundary from '../UIElements/ErrorBoundary';
import RollbarErrorTracking from '../../../helpers/RollbarErrorTracking';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    width: '9rem',
    height: '2.5rem',
    color: '#38cc89',
    borderColor: '#38cc89',
    textTransform: 'none'
  }
}));

const fields = {
  'User Name': {
    id: "name",
    label: "New User Name",
    name: "name",
    type: "text",
    validation: {
      name: Yup.string()
        .trim()
        .required('User name is required')
    }
  },
  'Email Address': {
    id: "email",
    label: "New Email Address",
    name: "email",
    type: "email",
    validation: {
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required')
    }
  },
  'Password': {
    id: "password",
    label: "Old Password",
    name: "password",
    type: "password"
  }
};

const nameEmailValidationShape = {
  password: Yup.string()
    .required('Validate your password'),
  confirmPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('password')], 'Password does not match'),
};

const passwordValidationShape = {
  oldPassword: Yup.string()
    .required('Validate your password'),
  newPassword: Yup.string()
    .min(6, 'Password must contain at least 6 characters')
    .required('Enter new password'),
  confirmNewPassword: Yup.string()
    .required('Confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Password does not match'),
}

export default function ProfileEdit(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const { field } = props;
  const { id, label, name, type } = field ? fields[field] : {};
  const isEditingPassword = field === 'Password';

  const { token, userId, userName, email } = auth;

  const {
    isLoading,
    sendRequest
  } = useHttpClient();

  const initialValidation =
    isEditingPassword ?
      {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      } : {
        [id]: '',
        password: '',
        confirmPassword: '',
      }

  const validationSchema = Yup.object().shape(
    isEditingPassword ?
      passwordValidationShape :
      field && { ...fields[field].validation, ...nameEmailValidationShape }
  );

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: initialValidation,
    validationSchema,
    async onSubmit(values) {
      try {
        const route = isEditingPassword ? 'user/changePassword' : 'user/changeNameEmail';
        const body = isEditingPassword ?
          {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword
          } : {
            [id]: values[id],
            password: values.password
          }
        const endpoint = process.env.REACT_APP_API_BASE_URL + route;

        const responseData = await sendRequest(
          endpoint,
          'PUT',
          JSON.stringify(body),
          {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + auth.token,
          }
        );

        if (!isEditingPassword) {
          const { fieldUpdated, value } = responseData.results;
          auth.login(
            userId,
            fieldUpdated === 'name' ? value : userName,
            fieldUpdated === 'email' ? value : email,
            token
          );
        }

        props.onSuccess(`${field} has been successfully changed!`);
      } catch (err) {
        console.log(err);
      }
    }
  })

  const editNameEmail = (
    <>
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched[name] ? errors[name] : ''}
        error={touched[name] && Boolean(errors[name])}
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        id="password"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.password ? errors.password : ''}
        error={touched.password && Boolean(errors.password)}
        required
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.confirmPassword ? errors.confirmPassword : ''}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        required
      />
    </>
  )

  const editPassword = (
    <>
      <TextField
        name="oldPassword"
        label="Old Password"
        type="password"
        id="oldPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.oldPassword ? errors.oldPassword : ''}
        error={touched.oldPassword && Boolean(errors.oldPassword)}
        required
      />
      <TextField
        name="newPassword"
        label="New Password"
        type="password"
        id="newPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.newPassword ? errors.newPassword : ''}
        error={touched.newPassword && Boolean(errors.newPassword)}
        required
      />
      <TextField
        name="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        id="confirmNewPassword"
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.confirmNewPassword ? errors.confirmNewPassword : ''}
        error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
        required
      />
    </>
  )

  return (
    <ErrorBoundary>
      {isLoading && <LoadingSpinner asOverlay />}
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={handleSubmit}
        noValidate
      >
        {isEditingPassword ? editPassword : editNameEmail}
        <Button
          variant="outlined"
          type="submit"
          disabled={!isValid}
          className={classes.button}
        >
          Submit
        </Button>
      </Box>
    </ErrorBoundary>
  )
}