import React, { useEffect, useContext, useState } from 'react';


import { Avatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import SuccessModal from '../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import AppDialog from '../shared/components/UIElements/AppDialog.js';

import ProfileTextField from '../shared/components/FormElements/ProfileTextField';
import ProfileEdit from '../shared/components/FormElements/ProfileEdit';

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
    alignItems: 'flex-start',
    margin: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      margin: 'auto',
    }
  }
}));

// password encryption
export default function Profile(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [openedField, setOpenedField] = useState(null);

  const [userName, setUserName] = useState(auth.userName);
  const [email, setEmail] = useState(auth.email);
  const [password, setPassword] = useState('**********');

  const [message, setMessage] = useState('');

  const {
    isLoading,
    error,
    success,
    sendRequest,
    clearError,
    clearSuccess,
  } = useHttpClient();

  const handleDialogOpen = field => {
    setIsOpen(true);
    setOpenedField(field);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
    setTimeout(() => setOpenedField(null), 200);
  };

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
            <form
              // noValidate
              className={classes.form}
            // onSubmit={handleSubmit}
            >
              <ProfileTextField
                id="name"
                label="User Name"
                name="name"
                type="text"
                value={userName}
                onOpen={handleDialogOpen}
              />
              <ProfileTextField
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={email}
                onOpen={handleDialogOpen}
              />
              <ProfileTextField
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onOpen={handleDialogOpen}
              />
            </form>
          </Grid>
        </Grid>
        <AppDialog
          size="md"
          isOpen={isOpen}
          handleOpen={handleDialogOpen}
          handleClose={handleDialogClose}
          title={`Change ${openedField}`}
        >
          {/* {`Change ${openedField}`} */}
          <ProfileEdit field={openedField} />
        </AppDialog>
      </ThemeProvider>
    </ErrorBoundary>
  )
}