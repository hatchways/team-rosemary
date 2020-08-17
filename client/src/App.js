import React from "react";
import { BrowserRouter, Route,
  Redirect,
  Switch } from "react-router-dom";

import SigninPage from "./user/pages/SignInPage";
import SignUpPage from "./user/pages/SignUpPage";
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
