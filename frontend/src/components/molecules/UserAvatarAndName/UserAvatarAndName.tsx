import React from 'react';
import InitialsAvatar from '../../atoms/UserShort/InitialsAvatar';
import UserNameAndOrganization from '../../atoms/UserShort/UserNameAndOrganization';

export default function UserAvatarAndName() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <InitialsAvatar />
      <UserNameAndOrganization />
    </div>
  );
}
