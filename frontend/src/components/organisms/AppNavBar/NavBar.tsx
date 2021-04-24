import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { PATH_FOR_USER_ANSWER, PATH_FOR_USER_QUESTION, PATH_FOR_USER_QUIZ } from '../../atoms/constants/routerPaths';
import { APP_BAR_HEIGHT } from '../../atoms/constants/sizes';

const useStyles = makeStyles({
  root: {
    zIndex: 100,
    position: 'absolute',
    top: APP_BAR_HEIGHT,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    width: '100%',
  },
});

export function NavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let history = useHistory();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    switch (value) {
      case 0:
        history.push(PATH_FOR_USER_QUESTION);
        break;
      case 1:
        history.push(PATH_FOR_USER_ANSWER);
        break;
      case 2:
        history.push(PATH_FOR_USER_QUIZ);
        break;
      default:
    }
  }, [value]);


  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Twoje Pytanie' />
        <Tab label='Odpowiedź' />
        <Tab label='Quiz' />
      </Tabs>
    </div>
  );
}
