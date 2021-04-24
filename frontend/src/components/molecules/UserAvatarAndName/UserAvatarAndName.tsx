import React from 'react';
import InitialsAvatar from '../../atoms/UserShort/InitialsAvatar';
import UserNameAndOrganization from '../../atoms/UserShort/UserNameAndOrganization';
import { Divider } from '@material-ui/core';
import {GoogleLogout} from "react-google-login";
import {useCookie} from "react-use";
import {useHistory} from "react-router-dom";

export default function UserAvatarAndName() {
  const history = useHistory()
  const [currentUserCookie, updateCurrentUserCookie, deleteCurrentUserCookie] = useCookie("currentUser");
  const [currentAuthenticationToken, updateAuthenticationTokenCookie, deleteAuthenticationTokenCookie] = useCookie("authenticationToken");

  const onSuccess = () => {
    deleteCurrentUserCookie()
    deleteAuthenticationTokenCookie()
    history.push("/")
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Divider />
        <InitialsAvatar />
        <UserNameAndOrganization />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem', justifyContent: 'center' }}>
        <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
