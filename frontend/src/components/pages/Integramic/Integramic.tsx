import React from 'react';
import { MuiThemeProvider, Typography, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { THEME } from '../../atoms/constants/ThemeMUI';
import ClickButton from '../../atoms/Button/ClickButton';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import Example from '../../molecules/example'



const onClick = () => {};

export function Integramic() {
  return (
    <MuiThemeProvider theme={THEME}>
      <Typography variant="h2">Responsive h3</Typography>

      <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />
        
    </MuiThemeProvider>
  );
}
