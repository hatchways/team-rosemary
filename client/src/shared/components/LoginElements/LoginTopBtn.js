import React from "react";

import { Link } from 'react-router-dom';

import { Button } from "@material-ui/core";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    '&::before': {
      content: ({ label }) => `"${label}"`,
    },
    [theme.breakpoints.down("xs")]: {
      right: '0.5rem',
      fontSize: '0.8rem'
    }
  },
  button: {
    width: '7rem',
    height: '3rem',
    marginLeft: '1rem',
    backgroundColor: '#fafafa',
    boxShadow: '2px 2px 5px grey',
    fontSize: 'inherit',
    textTransform: 'none',
    [theme.breakpoints.down("xs")]: {
      width: '5rem',
      height: '2rem',
      marginLeft: '0.5rem'
    }
  }
}));

export function LoginTopBtn(props) {
  const pageText = {
    login: {
      label: 'Don\'t have an account?',
      btnText: 'Create',
      link: '/signup'
    },
    signup: {
      label: 'Already have an account?',
      btnText: 'Log In',
      link: '/'
    }
  }

  const { page } = props;
  const { label, btnText, link } = pageText[page];

  const classes = useStyles({ label });

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        component={Link}
        to={link}
        className={classes.button}
      >
        {btnText}
      </Button>
    </div>
  )
}