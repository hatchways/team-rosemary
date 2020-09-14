import React, { useEffect, useContext, useState } from 'react';

import moment from 'moment';

import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { green } from '@material-ui/core/colors';

import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import SuccessModal from '../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import { Panel } from '../shared/components/MainElements/Panel';
import TotalExpense from '../shared/components/MainElements/TotalExpense';
import ProfileAvatar from '../shared/components/HeaderElements/ProfileAvatar';

import profileTheme from '../themes/profile-theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../shared/components/UIElements/ErrorBoundary';
import RollbarErrorTracking from '../helpers/RollbarErrorTracking';

const useStyles = makeStyles(theme => ({
  pRel: {
    position: 'relative',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(5),
    width: '20rem',
    [theme.breakpoints.down("xs")]: {
      margin: 'auto',
      width: '100%'
    }
  },
  input: {
    overflow: "hidden",
    borderRadius: 10,
    paddingLeft: "1rem",
  },
  button: {
    textTransform: 'none'
  },
  btnSubmit: {
    width: '9rem',
    height: '2.5rem',
    borderColor: '#38cc89',
    color: '#38cc89'
  },
  btnCancel: {
    width: '5rem',
  }
}));

// password encryption
export default function Profile(props) {
  const classes = useStyles();

  const [isEditing, setIsEditing] = useState(false);
  // const [userName, setUserName] = useState('sada');
  // const [email, setEmail] = useState('sada@gmail.com');
  // const [password, setPassword] = useState('**********');

  const [message, setMessage] = useState('');

  const {
    isLoading,
    error,
    success,
    sendRequest,
    clearError,
    clearSuccess,
  } = useHttpClient();

  const handleSubmitClick = () => {
    // Error if input not valid but clicking
    if (isEditing) {

    }

    setIsEditing(!isEditing)
  }
  const handleCancelClick = () => {
    // Return the prev values

    setIsEditing(!isEditing)
  }



  return (
    <ErrorBoundary>
      <ThemeProvider theme={profileTheme}>
        <Grid container direction="column" spacing={3} xs={12} lg={10} className={classes.pRel}>
          {isLoading && <LoadingSpinner asOverlay />}
          <ErrorModal error={error} onClear={clearError} />
          {message !== '' &&
            <SuccessModal
              success={success}
              successMessage={message}
              onClear={clearSuccess}
            />
          }
          <Grid item xs>
            {/* <ProfileAvatar /> */}
            <form
              // noValidate
              className={classes.form}
            // onSubmit={handleSubmit}
            >
              <TextField
                id="name"
                label="User Name"
                name="name"
                type="text"
                // defaultValue={isEditing ? '' : userName}
                InputProps={{
                  classes: { root: classes.input },
                  disableUnderline: !isEditing,
                  readOnly: !isEditing
                }}
                disabled={!isEditing}
              />
              <TextField
                id="email"
                label="Email Address"
                name="email"
                type="email"
                // defaultValue={isEditing ? '' : email}
                InputProps={{
                  classes: { root: classes.input },
                  disableUnderline: !isEditing,
                  readOnly: !isEditing
                }}
                disabled={!isEditing}
              />
              <TextField
                id="oldPassword"
                label={isEditing ? 'Old Password' : 'Password'}
                name="oldPassword"
                type="password"
                // value={isEditing ? '' : '*************'}
                InputProps={{
                  classes: { root: classes.input },
                  disableUnderline: !isEditing,
                  readOnly: !isEditing
                }}
              />
              {isEditing && <>
                <TextField
                  id="newPassword"
                  label="New Password"
                  name="newPassword"
                  type="password"
                  InputProps={{
                    classes: { root: classes.input }
                  }}
                />
                <TextField
                  id="confirmNewPassword"
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  type="password"
                  InputProps={{
                    classes: { root: classes.input }
                  }}
                /></>
              }

              {/** 
              <TextField
                id="name"
                label="Name"
                name="name"
                type="text"
                autoComplete="name"
                margin="dense"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // helperText={touched.name ? errors.name : ''}
                // error={touched.name && Boolean(errors.name)}
                // required
                autoFocus
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                margin="dense"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // helperText={touched.email ? errors.email : ''}
                // error={touched.email && Boolean(errors.email)}
                required
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                margin="dense"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // helperText={touched.password ? errors.password : ''}
                // error={touched.password && Boolean(errors.password)}
                required
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                // margin="dense"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                // error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                required
                InputProps={{
                  readOnly: true,
                }}
              />*/}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Button
                  variant="outlined"
                  className={`${classes.button} ${classes.btnSubmit}`}
                  onClick={handleSubmitClick}
                >
                  {isEditing ? 'Submit' : 'Edit'}
                </Button>
                {isEditing && <Button
                  className={`${classes.button} ${classes.btnCancel}`}
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                }
              </Box>
            </form>
          </Grid>
        </Grid>
      </ThemeProvider>
    </ErrorBoundary>
  )
}