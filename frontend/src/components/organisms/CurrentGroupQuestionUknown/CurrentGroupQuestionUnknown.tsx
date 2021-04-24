import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import NoQuestionIlu from '../../atoms/alignedImages/NoQuestionIlu';
import Typography from '@material-ui/core/Typography';
import { THEME } from '../../atoms/constants/ThemeMUI';

const useStyles = makeStyles((theme) => ({
  container: { height: '100%', width: '100%', textAlign: 'center' },
  grid: { marginTop: '150px' },
  typography: { fontWeight: 700, fontSize: '24px', color: `${THEME.palette.primary.main}`, zIndex: 1 },
}));

export function CurrentGroupQuestionUnknown() {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className={classes.grid}
      >
        <Typography className={classes.typography}>Pytanie dnia nie jest jeszcze znane... </Typography>
        <Typography className={classes.typography}> Wróć później.</Typography>
        <NoQuestionIlu />
      </Grid>
    </Container>
  );
}