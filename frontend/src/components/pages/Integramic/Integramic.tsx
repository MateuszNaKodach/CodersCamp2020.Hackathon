import React, {createContext, useContext, useReducer} from 'react';
import {MuiThemeProvider, Typography, unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core';
import {THEME} from '../../atoms/constants/ThemeMUI';
import ClickButton from '../../atoms/Button/ClickButton';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {PATH_FOR_MAIN_VIEW} from '../../atoms/constants/routerPaths';
import Cookies from "universal-cookie";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";

const onClick = () => {
};

function Application() {
  const {authenticatedUser} = useAuthState()
  if (!authenticatedUser) {
    return <LoginPage />
  }
  return (
      <Router>
        <Switch>
          <Route path={PATH_FOR_MAIN_VIEW} exact>
            <Typography variant="h2">Responsive h3</Typography>

            <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />

            <UserAvatarAndName />
          </Route>
        </Switch>
      </Router>
  );
}

export function Integramic() {
  return (
        <MuiThemeProvider theme={THEME}>
          <Application />
        </MuiThemeProvider>
  );
}


const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID!;


// export type AuthState = {
//   readonly authenticatedUser: { email: string } | undefined;
//   readonly isLoading: boolean
// }
// export type AuthAction =
//     | { type: 'AUTH_SUCCESS', payload: { token: string, email: string } }
//     | { type: 'AUTH_FAILED' }
//     | { type: 'AUTH_LOADING' }
//
// const cookies = new Cookies();
// const authReducer = (state: AuthState, action: AuthAction): AuthState => {
//   switch (action.type) {
//     case "AUTH_SUCCESS": {
//       cookies.set("authenticationToken", JSON.stringify({type: 'Google', value: action.payload.token}));
//       cookies.set("currentUser", JSON.stringify({email: action.payload.email}));
//       return {
//         ...state,
//         authenticatedUser: {email: action.payload.email},
//         isLoading: false
//       }
//     }
//     case "AUTH_FAILED": {
//       cookies.remove("authenticationToken");
//       cookies.remove("currentUser");
//       return {
//         ...state,
//         authenticatedUser: undefined,
//         isLoading: false
//       }
//     }
//     case "AUTH_LOADING": {
//       return {
//         ...state,
//         authenticatedUser: undefined,
//         isLoading: true
//       }
//     }
//   }
// }
//
// const authInitialState = {authenticatedUser: undefined, isLoading: false}
// const AuthContext = createContext<AuthState>(authInitialState)
// export const useAuthState = (): AuthState => {
//   return useContext(AuthContext)
// }

const cookies = new Cookies();
export function LoginPage() {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  const onSuccess = (loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (loginResponse.code) {
      cookies.remove("authenticationToken");
      cookies.remove("currentUser");
      return;
    }
    const successResponse = loginResponse as GoogleLoginResponse
    cookies.set("authenticationToken", JSON.stringify({type: 'Google', value: action.payload.token}));
    cookies.set("currentUser", JSON.stringify({email: action.payload.email}));
    dispatch({
      type: "AUTH_SUCCESS",
      payload: {
        token: successResponse.tokenId,
        email: successResponse.profileObj.email
      }
    })
  };

  const onFailure = (error: any) => {
    cookies.remove("authenticationToken");
    cookies.remove("currentUser");
  };

  if (googleClientId === undefined) {
    return <div>Logowanie za pomocą Google nie zostało skonfigurowane.</div>
  }

  return (
      <GoogleLogin
          clientId={googleClientId}
          buttonText="Zaloguj się za pomocą Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
      />
  )
}

