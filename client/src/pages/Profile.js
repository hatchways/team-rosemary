import React, { useContext, useState } from 'react';

import Grid from '@material-ui/core/Grid';

import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import SuccessModal from '../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import AppDialog from '../shared/components/UIElements/AppDialog.js';
import ErrorBoundary from '../shared/components/UIElements/ErrorBoundary';

import ProfileTextField from '../shared/components/FormElements/ProfileTextField';
import ProfileEdit from '../shared/components/FormElements/ProfileEdit';

import profileTheme from '../themes/profile-theme';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  textFields: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: theme.spacing(10),
    [theme.breakpoints.down("xs")]: {
      margin: '5rem auto'
    }
  }
}));

// password encryption
export default function Profile(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [openedField, setOpenedField] = useState(null);

  const [message, setMessage] = useState('');

  const { userName, email } = auth;

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

  const handleSuccessSubmit = msg => {
    setMessage(msg);
    handleDialogClose();
  }

  return (
    <ErrorBoundary>
      <ThemeProvider theme={profileTheme}>
        <Grid container spacing={3} xs={12} lg={10}>
          <ErrorModal error={error} onClear={clearError} />
          <SuccessModal
            success={success}
            successMessage={message}
            onClear={clearSuccess}
          />
          <Grid item xs className={classes.textFields}>
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
              value="************"
              onOpen={handleDialogOpen}
            />
          </Grid>
        </Grid>
        <AppDialog
          size="md"
          isOpen={isOpen}
          handleOpen={handleDialogOpen}
          handleClose={handleDialogClose}
          title={`Change ${openedField}`}
        >
          <ProfileEdit
            field={openedField}
            onSuccess={handleSuccessSubmit}
            onSubmit={sendRequest}
          >
            {isLoading && <LoadingSpinner asOverlay />}
          </ProfileEdit>
        </AppDialog>
      </ThemeProvider>
    </ErrorBoundary>
  )
}