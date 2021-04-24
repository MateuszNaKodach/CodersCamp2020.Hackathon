import React from 'react';
import { MuiThemeProvider, Typography, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import { UserQuestion } from '../../../../../frontend/src/components/molecules/UserQuestion/UserQuestion';

export function Integramic() {
  return (
    <MuiThemeProvider theme={THEME}>
      <Typography>Responsive h3</Typography>
      <UserQuestion />
    </MuiThemeProvider>
  );
}
