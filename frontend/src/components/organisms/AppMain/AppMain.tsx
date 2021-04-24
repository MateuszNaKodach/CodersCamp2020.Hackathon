import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PATH_FOR_MAIN_VIEW, PATH_FOR_QUIZ, PATH_FOR_USER_ANSWER, PATH_FOR_USER_QUESTION } from '../../atoms/constants/routerPaths';
import { APP_BAR_HEIGHT } from '../../atoms/constants/sizes';
import { GroupQuestionView } from '../GroupQuestionView/GroupQuestionView';
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {Quiz} from '../../molecules/Quiz'

import Title from '../../atoms/Title/Title';
import { GroupAnswerView } from '../GroupAnswerView/GroupAnswerView';

export function AppMain() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Router>
        <Switch>
          <Route path={PATH_FOR_MAIN_VIEW} exact>
            <Title text="Here goes question???" />
          </Route>
          <Route path={PATH_FOR_USER_QUESTION} exact>
            <GroupQuestionView />
          </Route>
          <Route path={PATH_FOR_USER_ANSWER} exact>
            <GroupAnswerView />
          </Route>

          <Route path={PATH_FOR_QUIZ} exact>
            <Quiz  />
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
    minHeight: `100vh`,
    flexGrow: 1,
    backgroundColor: '#E8EBEE',
  },
}));
