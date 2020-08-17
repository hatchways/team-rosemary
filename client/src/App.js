import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route,
  Redirect,
  Switch } from "react-router-dom";

import { theme } from "./themes/theme";
import SigninPage from "./auth/pages/SignInPage";
import SignUpPage from "./auth/pages/SignUpPage";
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';


import "./App.css";

const  App = () => {
  const { token, login, logout, userId } = useAuth();

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
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
  
   <BrowserRouter>
     {routes}
   </BrowserRouter>
   
   </AuthContext.Provider>
  );
}

export default App;
