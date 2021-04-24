import React, { useState } from 'react';
import { CssBaseline, makeStyles, MuiThemeProvider } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import { AppSidebar } from '../../organisms/AppSidebar/AppSidebar';
import { AppContext } from '../../atoms/hooks/AppContext';
import { AppBar } from '../../organisms/AppBar/AppBar';
import { AppMain } from '../../organisms/AppMain/AppMain';
import { LoginPage } from '../LoginPage/LoginPage';
import {useCookie} from "react-use";
import {BrowserRouter as Router} from "react-router-dom";

export function Integramic() {
  const classes = useStyles();
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setIsOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  const [currentUserCookie] = useCookie("currentUser");
  if (!currentUserCookie) {
    return <LoginPage />;
  }

  return (
    <MuiThemeProvider theme={THEME}>
      <div className={classes.root}>
        <Router>
        <AppContext.Provider value={{ isOpenDrawer, handleDrawerOpen, handleDrawerClose }}>
          <CssBaseline />

          <AppBar />

          <AppSidebar />

          <AppMain />
        </AppContext.Provider>
        </Router>
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
