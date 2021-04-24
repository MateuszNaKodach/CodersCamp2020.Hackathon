import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

export const THEME = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#153259',
    },
    secondary: {
      main: '#FFD100',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: ['Poppins'].join(','),
  },
});
