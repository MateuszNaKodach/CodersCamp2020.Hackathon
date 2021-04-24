import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

export const THEME = createMuiTheme({
  palette: {
    primary: {
      main: '#153259',
      contrastText: '#fff',
    },
    secondary: {
      main: '#666666',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: ['Poppins'].join(','),
  },
});
