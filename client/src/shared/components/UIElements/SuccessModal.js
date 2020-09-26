import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SuccessModal = (props) => (
  <Snackbar
    open={!!props.success}
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
      severity="success"
    >
      {props.successMessage}
    </MuiAlert>
  </Snackbar>
);

export default SuccessModal;
