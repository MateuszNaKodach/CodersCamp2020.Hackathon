import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "react-google-login";
import {authenticated, unauthenticated} from "../../../restapi/authentication/authentication";
import React from "react";

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export function LoginPage(props: { onAuthenticated: (user: { email: string }) => void }) {
  const onSuccess = (loginResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (loginResponse.code) {
      unauthenticated();
      return;
    }
    const successResponse = loginResponse as GoogleLoginResponse
    authenticated({token: successResponse.tokenId, email: successResponse.profileObj.email})
    props.onAuthenticated({email: successResponse.profileObj.email});
  };
  const onFailure = (error: any) => {
    unauthenticated()
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
