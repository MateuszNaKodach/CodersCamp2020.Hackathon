import { makeStyles, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PATH_FOR_MAIN_VIEW, PATH_FOR_USER_QUESTION } from '../../atoms/constants/routerPaths';
import { APP_BAR_HEIGHT } from '../../atoms/constants/sizes';
import { GroupQuestionContainer } from '../GroupQuestionContainer/GroupQuestionContainer';


export function AppMain() {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Router>

        <Switch>

          <Route path={PATH_FOR_MAIN_VIEW} exact>

            <Typography variant='h2'>Responsive h3</Typography>

          </Route>

          <Route path={PATH_FOR_USER_QUESTION} exact>

            <GroupQuestionContainer />

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
    backgroundColor: "#E8EBEE",
  },
}));
