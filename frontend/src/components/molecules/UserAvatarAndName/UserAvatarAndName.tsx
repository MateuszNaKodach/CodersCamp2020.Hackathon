import React from 'react';
import InitialsAvatar from '../../atoms/UserShort/InitialsAvatar';
import UserNameAndOrganization from '../../atoms/UserShort/UserNameAndOrganization';
import { Divider } from '@material-ui/core';

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
