import { createMuiTheme } from '@material-ui/core/styles';

const profileTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        color: '#38cc89',
        '&$disabled': {
          color: '#38cc89'
        }
      }
    },
    MuiInputBase: {
      root: {
        color: '#000',
        '&$disabled': {
          color: '#000'
        }
      }
    },
    MuiInput: {
      root: {
        overflow: "hidden",
        borderRadius: 10,
        paddingLeft: "1rem"
      },
      formControl: {
        'label + &': {
          margin: '2rem 0'
        }
      }
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export default profileTheme;