import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import { THEME } from '../constants/ThemeMUI';

export default function InitialsAvatar() {
  return (
    <div>
      <Avatar
        style={{
          fontWeight: 700,
          backgroundColor: `${THEME.palette.primary.contrastText}`,
          marginRight: '25px',
          width: '60px',
          height: '60px',
        }}
      >
        IN
      </Avatar>
    </div>
  );
}
