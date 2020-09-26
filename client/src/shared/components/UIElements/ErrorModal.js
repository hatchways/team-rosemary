import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ErrorModal = (props) => (
  <Snackbar
    open={!!props.error}
    autoHideDuration={5000}
    onClose={props.onClear}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  >
    <MuiAlert
      elevation={6}
      variant="filled"
      severity="error"
    >
      {props.error}
    </MuiAlert>
  </Snackbar>
);

export default ErrorModal;
