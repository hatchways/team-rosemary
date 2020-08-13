import React from "react";

import { Dashboard } from './pages/Dashboard';

import { ThemeProvider } from '@material-ui/core/styles';
import { themeNoRipple } from './themes/theme';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <ThemeProvider theme={themeNoRipple}>
        <Dashboard />
      </ThemeProvider>
    )
  }
}

export default App;
