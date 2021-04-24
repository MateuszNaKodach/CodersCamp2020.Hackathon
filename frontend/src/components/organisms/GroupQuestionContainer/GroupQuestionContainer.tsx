import React from 'react';
import { UserQuestion } from '../../molecules/UserQuestion/UserQuestion';
import { Container, makeStyles } from '@material-ui/core';
import LeftSplash from '../../atoms/alignedImages/LeftSplash';
import AnswerIlu from '../../atoms/alignedImages/AnswerIlu';

const useStyles = makeStyles((theme) => ({
  container: {height: "100%", width: "100%", textAlign: "center"}
}));

export function GroupQuestionContainer() {

  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <UserQuestion />
      <AnswerIlu />
      <LeftSplash />

    </Container>
  );
}