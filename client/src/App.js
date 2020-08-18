import React from "react";

import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Receipts } from './pages/Receipts';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './themes/theme';


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
          <Header /> {/*Router inside*/}
          {/* <Dashboard />  */}
          <Receipts />
        </ThemeProvider>
      </Box>
    )
  }
}

export default App;
