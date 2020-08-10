import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import { Login } from './pages/Login';
import {Dashboard} from './pages/Dashboard';


// One single <Login /> without router, BtnTop/BtnLogin changes App.state/context, App.state changes Login.props, Login.props changes the page functions

/* Login page behaviors
Login: {
  btnTop: {
    text: 'Create',
    onclick: redirect to <Signup />
  },
  btnLogin: {
    text: 'Log In',
    onclick: {
      res: redirect to <Dashboard />,
      rej: information not matching database
    }
  }
}
Signup: {
  btnTop: {
    text: 'Login',
    onclick: redirect to <Login />
  },
  btnLogin: {
    text: 'Create',
    onclick: {
      res: redirect to <Login />,
      rej: account existed / invalid password
    }
  }
}
*/

function App() {
  return (
    <>
      <Login page="login" />
      <Login page="signup" />
      <Dashboard />
    </>

  )
}

export default App;
