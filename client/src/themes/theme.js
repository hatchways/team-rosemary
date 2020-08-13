import { createMuiTheme } from '@material-ui/core/styles';

export const themeNoRipple = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});