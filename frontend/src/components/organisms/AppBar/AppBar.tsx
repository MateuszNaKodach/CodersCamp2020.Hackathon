import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import React, { useContext } from 'react';
import { AppContext } from '../../atoms/hooks/AppContext';
import { APP_BAR_HEIGHT, DRAWER_WIDTH } from '../../atoms/constants/sizes';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar as AppBarFromSigma } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';

export function AppBar() {
  const classes = useStyles();
  const { handleDrawerOpen } = useContext(AppContext);
  const { isOpenDrawer } = useContext(AppContext);

  return (
    <AppBarFromSigma position='absolute' className={clsx(classes.appBar, isOpenDrawer && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge='start'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, isOpenDrawer && classes.menuButtonHidden)}
        >
          <MenuIcon className={classes.menuButtonIcon} />
        </IconButton>
        <Typography component='h1' variant='h4' color='inherit' noWrap className={classes.title}>
          Grupa 1
        </Typography>
      </Toolbar>
    </AppBarFromSigma>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    position: 'relative',
    height: APP_BAR_HEIGHT,
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    height: APP_BAR_HEIGHT,
    backgroundColor: THEME.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    height: APP_BAR_HEIGHT,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    paddingRight: 36,
    paddingLeft: 36,
    color: theme.palette.primary.contrastText,
  },
  menuButtonIcon: {
    height: '45px',
    width: '45px',
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: 'translate(-50%, -50%)',
    flexGrow: 1,
  },
}));
