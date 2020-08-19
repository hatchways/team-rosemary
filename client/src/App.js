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

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Home } from './pages/Home';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes/theme';


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

//       <Redirect to="/" />
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Box display="flex">
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Home />
        </ThemeProvider>
      </Box>
    )
  }
}

// Siyuan's work end

export default App;