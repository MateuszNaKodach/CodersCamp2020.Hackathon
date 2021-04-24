import React from 'react';
import { MuiThemeProvider, Typography, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import ClickButton from '../../atoms/Button/ClickButton';
import UserAvatarAndName from '../../molecules/UserAvatarAndName/UserAvatarAndName';

const onClick = () => {};

export function Integramic() {
  return (
    <MuiThemeProvider theme={THEME}>
      <Typography variant="h2">Responsive h3</Typography>

      <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />

      <UserAvatarAndName />
    </MuiThemeProvider>
  );
}
