import React from "react";

import { LoginUploadBtn } from '../components/LoginUploadBtn';
import {ProfileAvator} from '../components/ProfileAvator';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  'container': {
    // position: 'relative',
    // display: 'flex',
    // alignItems:'center',
    width: '100%',
    height: '100vh'
  },
  'header': {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export function Dashboard(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <LoginUploadBtn>Upload Receipt</LoginUploadBtn>
        <ProfileAvator />
      </header>
    </div>
  )
}