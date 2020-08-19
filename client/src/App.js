import React from "react";
import {
  BrowserRouter, Route,
  Redirect,
  Switch
} from "react-router-dom";

import SigninPage from "./user/pages/SignInPage";
import SignUpPage from "./user/pages/SignUpPage";
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import { Home } from './pages/Home';

// Varun's work start

// const App = () => {
//   const { token, login, logout, userId } = useAuth();

//   let routes;

//   routes = (
//     <Switch>
//       <Route path="/" exact>
//         <SigninPage />
//       </Route>

//       <Route path="/signup">
//         <SignUpPage />
//       </Route>

//       <Redirect to="/dashboard" />
//     </Switch>
//   );

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoggedIn: !!token,
//         token: token,
//         userId: userId,
//         login: login,
//         logout: logout
//       }}>

//       <BrowserRouter>
//         {routes}
//       </BrowserRouter>

//     </AuthContext.Provider>
//   );
// }

// Varun's work end

// Siyuan's work start
function App(props) {
  return <Home />
}

// Siyuan's work end

export default App;