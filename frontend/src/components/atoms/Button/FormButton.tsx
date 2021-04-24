import { Button, makeStyles } from '@material-ui/core';
import { THEME } from '../constants/ThemeMUI';

type TextButtonProps = {
  readonly text: string;
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

const FormButton = ({ text }: TextButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      size='large'
      type='submit'
      className={classes.button}
    >
      {text}
    </Button>
  );
};

export default FormButton;
