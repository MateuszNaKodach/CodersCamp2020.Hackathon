import React from 'react';
import Typography from '@material-ui/core/Typography';
import { THEME } from '../constants/ThemeMUI';

export default function UserNameAndOrganization() {
  return (
    <div>
      <Typography style={{ fontWeight: 700, fontSize: '18px', color: `${THEME.palette.primary.contrastText}` }}>Name Surname</Typography>
      <Typography style={{ fontWeight: 400, fontSize: '13px', color: `${THEME.palette.secondary.main}` }}>Organization</Typography>
    </div>
  );
}
