import React, { useContext } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';

import { AuthContext } from '../../context/auth-context';
import ErrorBoundary from '../UIElements/ErrorBoundary';
import RollbarErrorTracking from '../../../helpers/RollbarErrorTracking';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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
});

const formConfig = {
  'User Name': {
    id: "name",
    label: "New User Name",
    name: "name",
    type: "text",
    validation: {
      name: Yup.string()
        .trim()
        .required('User name is required'),
      password: Yup.string()
        .required('Validate your password'),
      confirmPassword: Yup.string()
        .required('Confirm your password')
        .oneOf([Yup.ref('password')], 'Password does not match')
    },
    initialValidation: {
      name: '',
      password: '',
      confirmPassword: ''
    },
    route: 'user/changeNameEmail',
    reqBodyKeys: ['name', 'password']
  },

  'Email Address': {
    id: "email",
    label: "New Email Address",
    name: "email",
    type: "email",
    validation: {
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),
      password: Yup.string()
        .required('Validate your password'),
      confirmPassword: Yup.string()
        .required('Confirm your password')
        .oneOf([Yup.ref('password')], 'Password does not match')
    },
    initialValidation: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    route: 'user/changeNameEmail',
    reqBodyKeys: ['email', 'password']
  },

  'Password': {
    id: "oldPassword",
    label: "Old Password",
    name: "oldPassword",
    type: "password",
    validation: {
      oldPassword: Yup.string()
        .required('Validate your password'),
      newPassword: Yup.string()
        .min(6, 'Password must contain at least 6 characters')
        .required('Enter new password'),
      confirmNewPassword: Yup.string()
        .required('Confirm your password')
        .oneOf([Yup.ref('newPassword')], 'Password does not match')
    },
    initialValidation: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    route: 'user/changePassword',
    reqBodyKeys: ['oldPassword', 'newPassword']
  }
};

export default function ProfileEdit(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const { field } = props;
  const isEditingPassword = field === 'Password';
  
  const {
    id,
    label,
    name,
    type,
    validation,
    initialValidation,
    route,
    reqBodyKeys
  } = field ? formConfig[field] : {};

  const { token, userId, userName, email } = auth;

  const validationSchema = Yup.object().shape(validation);

  const sendRequest = props.onSubmit;
  const handleSuccessSubmit = props.onSuccess;

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
        const body = reqBodyKeys.reduce((a, b) => ({ ...a, [b]: values[b] }), {});
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

        handleSuccessSubmit(`${field} has been successfully changed!`);
      } catch (err) {
        RollbarErrorTracking.logErrorInRollbar(err);
      }
    }
  })

  const editTextFields = isEditingPassword ?
    (<>
      <TextField
        name={name}
        label={label}
        type={type}
        id={id}
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
    </>) : (<>
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
    </>)

  return (
    <ErrorBoundary>
      {props.children}
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
        onSubmit={handleSubmit}
        noValidate
      >
        {editTextFields}
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