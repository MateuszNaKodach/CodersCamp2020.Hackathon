import React from 'react';
import { UserQuestion } from '../../molecules/UserQuestion/UserQuestion';
import { Container, Typography } from '@material-ui/core';

export function GroupQuestionContainer() {

  return (
    <Container style={{height: "100%", width: "100%", textAlign: "center"}}>
      <Typography variant='h3' style={{margin: "90px 0"}}>Zadane pytanie</Typography>
      <UserQuestion />

    </Container>
  );
}