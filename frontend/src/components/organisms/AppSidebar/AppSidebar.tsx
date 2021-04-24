import { Drawer, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useContext } from 'react';
import { AppContext } from '../../atoms/hooks/AppContext';
import { DRAWER_WIDTH } from '../../atoms/constants/sizes';
import Logo from '../../atoms/alignedImages/Logo';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';
import {GoogleLogout} from "react-google-login";
import {useHistory} from "react-router-dom";
import {useCookie} from "react-use";

export function AppSidebar(props: {onLoggedOut: () => void}) {
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
      <div className={classes.toolbarIcon}>
        <Logo />
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <div style={{ position: 'absolute', bottom: '50px' }}>
        <UserAvatarAndName />
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', justifyContent: 'center' }}>
          <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
              buttonText="Logout"
              onLogoutSuccess={props.onLoggedOut}
          />
        </div>
      </div>
    </Drawer>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
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
      width: theme.spacing(9),
    },
  },
}));
