import React from 'react';
import Typography from '@material-ui/core/Typography';
import {THEME} from '../constants/ThemeMUI';
import {useCookie} from "react-use";

export default function UserNameAndOrganization() {
  const [currentUserCookie] = useCookie("currentUser");
  const user = currentUserCookie ? JSON.parse(currentUserCookie) : undefined;

  return (
      <div>
        <Typography style={{fontWeight: 700, fontSize: '16px', color: `${THEME.palette.primary.main}`}}>{user?.email}</Typography>
        <Typography style={{
          fontWeight: 400,
          fontSize: '11px',
          color: `${THEME.palette.secondary.main}`,
        }}>Organization</Typography>
      </div>
  );
}
