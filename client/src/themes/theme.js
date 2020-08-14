import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    fontWeightRegular: 600,
    fontWeightLight: 400,
    fontWeightMedium: 400
  }
});