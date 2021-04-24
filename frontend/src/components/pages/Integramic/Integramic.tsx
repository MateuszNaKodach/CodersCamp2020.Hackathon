import React, { useState } from 'react';
import {
  Badge,
  CssBaseline, Divider, Drawer, List,
  makeStyles,
  MuiThemeProvider,
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import ClickButton from '../../atoms/Button/ClickButton';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PATH_FOR_MAIN_VIEW } from '../../atoms/constants/routerPaths';
import clsx from 'clsx';
import { DRAWER_WIDTH } from '../../atoms/constants/sizes';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppSidebar } from '../../organisms/AppSidebar/AppSidebar';
import { AppContext } from '../../atoms/hooks/AppContext';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';
import { AppBar } from '../../organisms/AppBar/AppBar';
import { AppMain } from '../../organisms/AppMain/AppMain';
import { LoginPage } from '../LoginPage/LoginPage';


export function Integramic() {
  const classes = useStyles();
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setIsOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [state, setState] = useState<AuthState>({authenticatedUser: undefined, isLoading: false});
  if (state.authenticatedUser === undefined) {
    return <LoginPage onAuthenticated={user => setState({authenticatedUser: user, isLoading: false})} />
  }

  return (
    <MuiThemeProvider theme={THEME}>
      <div className={classes.root}>
        <AppContext.Provider value={{ isOpenDrawer, handleDrawerOpen, handleDrawerClose }}>
          <CssBaseline />

          <AppBar />

          <AppSidebar />
          <AppMain />

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
  readonly isLoading: boolean
}

