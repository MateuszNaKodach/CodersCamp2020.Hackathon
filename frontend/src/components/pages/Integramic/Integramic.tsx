import React, {useState}from 'react';
import {
   Badge,
  CssBaseline, Divider, Drawer, List,
  makeStyles,
  MuiThemeProvider,
  Typography,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';import { THEME } from '../../atoms/constants/ThemeMUI';
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

const onClick = () => {};

export function Integramic() {
  const classes = useStyles();
  const [isOpenDrawer, setIsOpenDrawer] = useState(true);

  const handleDrawerOpen = () => {
    setIsOpenDrawer(true);
  };
  const handleDrawerClose = () => {
    setIsOpenDrawer(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <MuiThemeProvider theme={THEME}>
      <div className={classes.root}>
        <AppContext.Provider value={{ isOpenDrawer, handleDrawerOpen, handleDrawerClose }}>
        <CssBaseline />

        <AppBar/>

       <AppSidebar/>

        <main className={classes.content}>
        <Router>


          <Switch>

            <Route path={PATH_FOR_MAIN_VIEW} exact>
              <Typography variant='h2'>Responsive h3</Typography>

              <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />

            </Route>

          </Switch>

        </Router>

        </main>
        </AppContext.Provider>
      </div>
    </MuiThemeProvider>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));
