import React, {useState} from 'react';
import {MuiThemeProvider, Typography} from '@material-ui/core';
import {THEME} from '../../atoms/constants/ThemeMUI';
import ClickButton from '../../atoms/Button/ClickButton';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PATH_FOR_MAIN_VIEW} from '../../atoms/constants/routerPaths';
import {LoginPage} from "../LoginPage/LoginPage";
import Logo from "../../atoms/Logo/Logo";

const onClick = () => {
};

export function Integramic() {
  const [state, setState] = useState<AuthState>({authenticatedUser: undefined, isLoading: false});
  if (state.authenticatedUser === undefined) {
    return <LoginPage onAuthenticated={user => setState({authenticatedUser: user, isLoading: false})} />
  }
  return (
      <MuiThemeProvider theme={THEME}>
        <Router>
          <Switch>
            <Route path={PATH_FOR_MAIN_VIEW} exact>
              <Typography variant="h2">Responsive h3</Typography>

              <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />

              <UserAvatarAndName />
              <Logo />
            </Route>
          </Switch>
        </Router>
      </MuiThemeProvider>
  );
}

export type AuthState = {
  readonly authenticatedUser: { email: string } | undefined;
  readonly isLoading: boolean
}

