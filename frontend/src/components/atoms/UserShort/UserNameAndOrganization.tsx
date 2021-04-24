import React from 'react';
import Typography from '@material-ui/core/Typography';
import { THEME } from '../constants/ThemeMUI';

export default function UserNameAndOrganization() {
  return (
    <div>
      <Typography style={{ fontWeight: 700, fontSize: '16px', color: `${THEME.palette.primary.main}` }}>Name
        Surname</Typography>
      <Typography style={{
        fontWeight: 400,
        fontSize: '11px',
        color: `${THEME.palette.secondary.main}`,
      }}>Organization</Typography>
    </div>
  );
}
