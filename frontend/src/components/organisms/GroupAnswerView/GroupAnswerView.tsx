import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
import AnswerIlu from '../../atoms/alignedImages/AnswerIlu';
import LeftSplash from '../../atoms/alignedImages/LeftSplash';
import { UserAnswer } from '../../molecules/UserAnswer/UserAnswer';

const useStyles = makeStyles((theme) => ({
  container: {height: "100%", width: "100%", textAlign: "center"}
}));

export function GroupAnswerView() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <UserAnswer />
      <AnswerIlu />
      <LeftSplash />

    </Container>
  );
}
