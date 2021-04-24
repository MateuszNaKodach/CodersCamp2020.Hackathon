import React, { useState } from 'react';
import { AppBar as AppBarFromSigma, CssBaseline, makeStyles, MuiThemeProvider } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import { AppSidebar } from '../../organisms/AppSidebar/AppSidebar';
import { AppContext } from '../../atoms/hooks/AppContext';
import { AppBar } from '../../organisms/AppBar/AppBar';
import { AppMain } from '../../organisms/AppMain/AppMain';
import { LoginPage } from '../LoginPage/LoginPage';
import { NavBar } from '../../organisms/NavBar/NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

export function Integramic() {
  const classes = useStyles();
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setIsOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  const [state, setState] = useState<AuthState>({ authenticatedUser: undefined, isLoading: false });
  if (state.authenticatedUser === undefined) {
    return <LoginPage onAuthenticated={(user) => setState({ authenticatedUser: user, isLoading: false })} />;
  }

  return (
    <MuiThemeProvider theme={THEME}>
      <div className={classes.root}>
        <AppContext.Provider value={{ isOpenDrawer, handleDrawerOpen, handleDrawerClose }}>
          <Router>
            <NavBar />

            <CssBaseline />

            <AppBar />


            <AppSidebar />

            <AppMain />
          </Router>
        </AppContext.Provider>
      </div>
    </MuiThemeProvider>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export type AuthState = {
  readonly authenticatedUser: { email: string } | undefined;
  readonly isLoading: boolean;
};
