import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route,
  Redirect,
  Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SigninPage from "./auth/pages/SignInPage";
import SignUpPage from "./auth/pages/SignUpPage";
import { AuthContext } from './shared/context/auth-context';


import "./App.css";

const  App = () => {
  
  let routes;

  routes = (
    <Switch>
      <Route path="/" exact>
        <SigninPage />
      </Route>
     
      <Route path="/signup">
        <SignUpPage />
      </Route>
      
      <Redirect to="/" />
    </Switch>
  );

  return (
   <BrowserRouter>
   
    {routes}
  </BrowserRouter>

  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <img src={logo} className="App-logo" alt="logo" /> */}
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
