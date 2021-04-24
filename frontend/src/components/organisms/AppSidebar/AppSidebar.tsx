import { Drawer, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useContext } from 'react';
import { AppContext } from '../../atoms/hooks/AppContext';
import { DRAWER_WIDTH } from '../../atoms/constants/sizes';
import Logo from '../../atoms/alignedImages/Logo';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';
import Box from '@material-ui/core/Box';

export function AppSidebar() {
  const classes = useStyles();
  const { handleDrawerClose } = useContext(AppContext);
  const { isOpenDrawer } = useContext(AppContext);

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !isOpenDrawer && classes.drawerPaperClose),
      }}
      open={isOpenDrawer}
    >
      <Box display='flex' flexDirection='column' justifyContent='space-between' p={1} m={1} bgcolor='background.paper' height='100%'>
        <div className={classes.toolbarIcon}>
          <Logo />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <div style={{}}>
          <UserAvatarAndName />
        </div>

      </Box>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    paddingTop: '30px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
}));