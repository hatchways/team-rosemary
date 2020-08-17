
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function SignIn()  {
    return <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.hatchways.io/">
         HatchWays
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    
  };

 