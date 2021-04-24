import React from 'react';
import Typography from '@material-ui/core/Typography';
import { THEME } from '../constants/ThemeMUI';
import {useCookie} from "react-use";
import {GoogleLogout} from "react-google-login";
import { useHistory } from 'react-router-dom';

export default function UserNameAndOrganization() {
  const history = useHistory();
  const [currentUserCookie, updateCurrentUserCookie, deleteCurrentUserCookie] = useCookie("currentUser");
  const [currentAuthenticationToken, updateAuthenticationTokenCookie, deleteAuthenticationTokenCookie] = useCookie("authenticationToken");
  const user = currentUserCookie ? JSON.parse(currentUserCookie) : undefined;

  const onSuccess = () => {
    history.push("/");
    deleteCurrentUserCookie()
    deleteAuthenticationTokenCookie()
  };

  return (
    <div>
      <Typography style={{ fontWeight: 700, fontSize: '16px', color: `${THEME.palette.primary.main}` }}>{user?.email}</Typography>
      <Typography style={{
        fontWeight: 400,
        fontSize: '11px',
        color: `${THEME.palette.secondary.main}`,
      }}>Organization</Typography>
      <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
          buttonText="Logout"
          onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
