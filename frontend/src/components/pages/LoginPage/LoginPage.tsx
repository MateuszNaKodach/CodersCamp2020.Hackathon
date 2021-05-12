import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from 'react-google-login';
import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import LogInIlu from '../../atoms/alignedImages/LogInIlu';
import {useAsyncFn, useCookie} from "react-use";
import LogInSplash from '../../atoms/alignedImages/LogInSplash';
import {UserAccountsRestApi} from "../../../restapi/user-accounts/UserAccountsRestApi";
import { SignIn } from '../../molecules/SignIn/SignIn';
import ClickButton from '../../atoms/Button/ClickButton';
import { SignUp } from '../../molecules/SignUp/SignUp';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    width: '100vw',
    height: '95vh',
    backgroundColor: '#E8EBEE',
    alignItems: 'center',
  },
  bottomBar: {
    zIndex: theme.zIndex.appBar,
    position: 'sticky',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#153259',
    height: '5vh',
    alignContent: 'center',
    justifyContent: 'center',
  },
  insideGrid: {
    zIndex: 1,
  }
}));

export function LoginPage(props: { onAuthenticated?: (user: { email: string, userId: string, displayName: string }) => void }) {
  const styles = useStyles();
  const [currentUserCookie, updateCurrentUserCookie, deleteCurrentUserCookie] = useCookie("currentUser");
  const [currentAuthenticationToken, updateAuthenticationTokenCookie, deleteAuthenticationTokenCookie] = useCookie("authenticationToken");

  const [postUserAccountDisplayNameState, postUserAccountDisplayName] = useAsyncFn((props: { userId: string, displayName: string }) =>
      UserAccountsRestApi()
          .postDisplayName({userId: props.userId, displayName: props.displayName})
  )

  const onSuccess = (loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log("GOOGLE RESPONSE", loginResponse)
    if (loginResponse.code) {
      deleteCurrentUserCookie();
      deleteAuthenticationTokenCookie();
      return;
    }
    const successResponse = loginResponse as GoogleLoginResponse;
    updateAuthenticationTokenCookie(JSON.stringify({value: successResponse.tokenId}))
    if (props.onAuthenticated) {
      const displayName = `${successResponse.profileObj.givenName} ${successResponse.profileObj.familyName}`;
      const userId = successResponse.profileObj.googleId;
      props.onAuthenticated({email: successResponse.profileObj.email, userId: userId, displayName: displayName});
      postUserAccountDisplayName({userId, displayName}).then().catch()
    }
  };
  const onFailure = (error: any) => {
    deleteCurrentUserCookie();
    deleteAuthenticationTokenCookie();
  };

  if (googleClientId === undefined) {
    return <div>Logowanie za pomocą Google nie zostało skonfigurowane.</div>;
  }

  return (
      <>
        <Grid container className={styles.mainGrid}>
          <Grid item xs={12} md={6}></Grid>
          <Grid item xs={12} md={6} className={styles.insideGrid}>
            <Typography variant="h3" style={{fontWeight: 900}}>
              Cześć!
            </Typography>
            <Typography variant="h6">Poznaj swój nowy zespół dzięki Integramic.</Typography>
            <div style={{marginTop: '2rem'}} />

            {/*<SignIn />*/}
            <SignUp />
            <GoogleLogin
                clientId={googleClientId}
                buttonText="Zaloguj się za pomocą Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            <ClickButton text="Załóż konto" onClick={() => {alert("test")}} disabled={false} />
          </Grid>
          <LogInIlu />
          <LogInSplash />
        </Grid>
        <div className={styles.bottomBar}>
          <Typography variant="body1" style={{color: 'white'}}>
            CodersCamp Hackathon 2020
          </Typography>
        </div>
      </>
  );
}
