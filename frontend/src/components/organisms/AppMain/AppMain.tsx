import { makeStyles, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PATH_FOR_MAIN_VIEW } from '../../atoms/constants/routerPaths';
import ClickButton from '../../atoms/Button/ClickButton';
import { APP_BAR_HEIGHT } from '../../atoms/constants/sizes';
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import Example from '../../molecules/example'

const onClick = () => {};

export function AppMain() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Router>
        <Switch>
          <Route path={PATH_FOR_MAIN_VIEW} exact>
            <Typography variant="h2">Responsive h3</Typography>

            <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />
          </Route>
          <Route path="/quiz" exact>
          <DndProvider backend={HTML5Backend}>
              <Example />
            </DndProvider>
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    overflow: 'auto',
    position: 'relative',
    paddingTop: APP_BAR_HEIGHT,
    minHeight: `calc(100vh - ${APP_BAR_HEIGHT})`,
    flexGrow: 1,
  },
}));
