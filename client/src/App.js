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

import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Receipts } from './pages/Receipts';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes/theme';


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

// Siyuan's work below
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
          <Header /> {/*Router should be inside*/}
          {/* <Dashboard />  */}
          <Receipts />
        </ThemeProvider>
      </Box>
    )
  }
}

export default App;