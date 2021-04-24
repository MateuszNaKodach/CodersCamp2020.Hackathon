import { Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { THEME } from '../constants/ThemeMUI';

type TextButtonProps = {
  readonly text: string;
  readonly onLink: string;
};

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: 500,
    backgroundColor: `${THEME.palette.primary.main}`,
    color: `${THEME.palette.primary.contrastText}`,
    padding: '8px 25px',
    zIndex: 1,
  },
}));

const LinkButton = ({ text, onLink }: TextButtonProps) => {
  const classes = useStyles();
  return (
    <Link to={onLink} style={{ textDecoration: 'none' }}>
      <Button
        color="primary"
        size="large"
        className={classes.button}
      >
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
