import React from 'react';
import { UserQuestion } from '../../molecules/UserQuestion/UserQuestion';
import { Container, makeStyles } from '@material-ui/core';
import LeftSplash from '../../atoms/alignedImages/LeftSplash';
import QuestionIlu from '../../atoms/alignedImages/QuestionIlu';

const useStyles = makeStyles((theme) => ({
  container: { height: '100%', width: '100%', textAlign: 'center' },
}));

export function GroupQuestionView() {

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <UserQuestion />
      <QuestionIlu />
      <LeftSplash />

    </Container>
  );
}