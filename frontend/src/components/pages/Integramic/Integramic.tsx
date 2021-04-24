import React, {useState} from 'react';
import {CssBaseline, makeStyles, MuiThemeProvider} from '@material-ui/core';
import {THEME} from '../../atoms/constants/ThemeMUI';
import {AppSidebar} from '../../organisms/AppSidebar/AppSidebar';
import {AppContext} from '../../atoms/hooks/AppContext';
import {AppBar} from '../../organisms/AppBar/AppBar';
import {AppMain} from '../../organisms/AppMain/AppMain';
import {LoginPage} from '../LoginPage/LoginPage';
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

  const [currentUserCookie, updateCurrentUserCookie, deleteCurrentUserCookie] = useCookie("currentUser");
  console.log("CURRENT USER", currentUserCookie)
  if (currentUserCookie === null) {
    return <LoginPage onAuthenticated={({email, userId}) => updateCurrentUserCookie(JSON.stringify({email, userId}))} />;
  }

  function onLoggedOut() {
    deleteCurrentUserCookie()
  }

  return (
      <MuiThemeProvider theme={THEME}>
        <div className={classes.root}>
          <AppContext.Provider value={{isOpenDrawer, handleDrawerOpen, handleDrawerClose}}>
            <Router>

              <CssBaseline />

              <AppBar />


              <AppSidebar onLoggedOut={onLoggedOut}/>

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
