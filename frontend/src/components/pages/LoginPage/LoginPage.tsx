import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import LogInIlu from '../../atoms/alignedImages/LogInIlu';
import {useCookie} from "react-use";
import AnswerIlu from '../../atoms/alignedImages/AnswerIlu';
import LeftSplash from '../../atoms/alignedImages/LeftSplash';
import LogInSplash from '../../atoms/alignedImages/LogInSplash';
import {useHistory} from "react-router-dom";

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
}));

export function LoginPage(props: { onAuthenticated?: (user: { email: string, userId: string }) => void }) {
  const styles = useStyles();
  const [currentUserCookie, updateCurrentUserCookie, deleteCurrentUserCookie] = useCookie("currentUser");
  const [currentAuthenticationToken, updateAuthenticationTokenCookie, deleteAuthenticationTokenCookie] = useCookie("authenticationToken");


  const onSuccess = (loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log("GOOGLE RESPONSE", loginResponse)
    if (loginResponse.code) {
      deleteCurrentUserCookie();
      deleteAuthenticationTokenCookie();
      return;
    }
    const successResponse = loginResponse as GoogleLoginResponse;
    updateCurrentUserCookie(JSON.stringify({ email: successResponse.profileObj.email, userId: successResponse.profileObj.googleId }))
    updateAuthenticationTokenCookie(JSON.stringify({ value: successResponse.tokenId }))
    if(props.onAuthenticated){
      props.onAuthenticated({ email: successResponse.profileObj.email, userId: successResponse.profileObj.googleId });
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
        <Grid item xs={12} md={6}>
          <Typography variant="h3" style={{ fontWeight: 900 }}>
            Cześć!
          </Typography>
          <Typography variant="h6">Poznaj swój nowy zespół dzięki Integramic.</Typography>
          <div style={{ marginTop: '2rem' }} />
          <GoogleLogin
            clientId={googleClientId}
            buttonText="Zaloguj się za pomocą Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </Grid>
        <LogInIlu />
        <LogInSplash />
      </Grid>
      <div className={styles.bottomBar}>
        <Typography variant="body1" style={{ color: 'white' }}>
          CodersCamp Hackathon 2020
        </Typography>
      </div>
    </>
  );
}
