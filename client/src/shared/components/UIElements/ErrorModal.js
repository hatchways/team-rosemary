import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const ErrorModal = (props) => {

  function Alert(props) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }
  return (
    <div>
  
    <Snackbar
      open={!!props.error} 
      autoHideDuration={3000}
      onClose={props.onClear}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
     
    >
      <Alert onClose={props.onClear} severity='error'>
       {props.error}
      </Alert>
    </Snackbar>
    </div>
  );
};

export default ErrorModal;
