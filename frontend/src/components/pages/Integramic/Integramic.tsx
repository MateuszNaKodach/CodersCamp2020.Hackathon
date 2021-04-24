import React from 'react';
import { MuiThemeProvider, Typography, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import ClickButton from '../../atoms/Button/ClickButton';

const onClick = () => {};

export function Integramic() {
  return (
    <MuiThemeProvider theme={THEME}>
      <Typography>Responsive h3</Typography>
      <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />
    </MuiThemeProvider>
  );
}
