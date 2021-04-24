import React from 'react';
import InitialsAvatar from '../../atoms/UserShort/InitialsAvatar';
import UserNameAndOrganization from '../../atoms/UserShort/UserNameAndOrganization';
import { Divider } from '@material-ui/core';
import {GoogleLogout} from "react-google-login";
import {useCookie} from "react-use";
import {useHistory} from "react-router-dom";

export default function UserAvatarAndName() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Divider />
        <InitialsAvatar />
        <UserNameAndOrganization />
      </div>
    </div>
  );
}
