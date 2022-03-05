import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  overrides: {
    MuiOutlinedInput: {
      root: {
        borderRadius: 20,
        '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
          borderColor: 'rgba(0,0,0,0.4)',
        },
      },
    },
    MuiButton: {
      root: {
        height: 38,
        borderRadius: 20,
        textTransform: 'none'
      },
      containedPrimary: {
        backgroundColor: '#000000'
      },     
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: 'rgba(255,255,255,0.13)'
        }
      }      
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif'
  },
  palette: {
    primary: {
      main: 'rgba(0,0,0,1)',
    },
    secondary: {
      main: '#9cdf43',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#000000',
      secondary: '#000000'
    }
  },
});

export default theme;