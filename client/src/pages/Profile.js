import React, { useEffect, useContext, useState } from 'react';

import moment from 'moment';

import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import { green } from '@material-ui/core/colors';

import CategoryContext from '../shared/context/category-context';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import SuccessModal from '../shared/components/UIElements/SuccessModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

import { Panel } from '../shared/components/MainElements/Panel';
import { DateSelector } from '../shared/components/MainElements/DateSelector';
import TotalExpense from '../shared/components/MainElements/TotalExpense';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBoundary from '../shared/components/UIElements/ErrorBoundary';
import RollbarErrorTracking from '../helpers/RollbarErrorTracking';

const useStyles = makeStyles(theme => ({
  pRel: {
    position: 'relative',
  },
  container: {
    whiteSpace: 'nowrap',
  },
  button: {
    position: 'absolute',
    top: '1.5rem',
    right: '0.5rem',
    color: '#1b3460',
    textTransform: 'none',
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(1)
    }
  },
  thead: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '1rem',
    width: '1.5rem',
    height: '1.5rem',
    color: '#fff',
    backgroundColor: green[500],
  },
  txtCat: {
    color: 'grey',
    opacity: '0.8',
  },
}));

export default function Profile(props) {
  const classes = useStyles();

  const [message, setMessage] = useState('');

  const {
    isLoading,
    error,
    success,
    sendRequest,
    clearError,
    clearSuccess,
  } = useHttpClient();

  return (
    <ErrorBoundary>
      <Grid container spacing={3} xs={12} lg={10} className={classes.pRel}>
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
          <p>Profile</p>
        </Grid>
      </Grid>
    </ErrorBoundary>
  )
}