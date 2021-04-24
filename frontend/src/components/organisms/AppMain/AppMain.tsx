import { makeStyles, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PATH_FOR_MAIN_VIEW } from '../../atoms/constants/routerPaths';
import ClickButton from '../../atoms/Button/ClickButton';
import { APP_BAR_HEIGHT } from '../../atoms/constants/sizes';

const onClick = () => {
};

export function AppMain() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Router>

        <Switch>

          <Route path={PATH_FOR_MAIN_VIEW} exact>

            <Typography variant='h2'>Responsive h3</Typography>

            <ClickButton text={'ZADAJ PYTANIE'} onClick={() => onClick()} />

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
  },
}));
