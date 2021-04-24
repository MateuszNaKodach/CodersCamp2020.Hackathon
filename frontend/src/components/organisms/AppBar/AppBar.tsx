import { Badge, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import { AppContext } from '../../atoms/hooks/AppContext';
import { DRAWER_WIDTH } from '../../atoms/constants/sizes';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { AppBar as AppBarFromSigma } from '@material-ui/core';

export function AppBar() {
  const classes = useStyles();
  const { handleDrawerOpen } = useContext(AppContext);
  const { isOpenDrawer } = useContext(AppContext);

  return (
    <AppBarFromSigma position='absolute' className={clsx(classes.appBar, isOpenDrawer && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, isOpenDrawer && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component='h1' variant='h6' color='inherit' noWrap className={classes.title}>
          Dashboard
        </Typography>
        <IconButton color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBarFromSigma>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));
