import { Button, makeStyles } from '@material-ui/core';
import { THEME } from '../constants/ThemeMUI';
import SendIcon from '@material-ui/icons/Send';

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
    '&:hover': {
      background: '#3a5f91',
    },
  },
  icon: {
    marginLeft: '10px',
    marginBottom: "2px"
  },
}));

const FormButton = ({ text }: TextButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      size='large'
      type='submit'
      className={classes.button}
      endIcon={<SendIcon className={classes.icon} />}
    >
      {text}
    </Button>
  );
};

export default FormButton;
