import { Button, makeStyles } from '@material-ui/core';
 import { THEME } from '../constants/ThemeMUI';

 type TextButtonProps = {
   readonly text: string;
   readonly onClick: undefined | (() => void);
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

 const ClickButton = ({ text, onClick }: TextButtonProps) => {
   const classes = useStyles()
   return (
     <Button
       onClick={onClick}
       color="primary"
       size="large"
       className={classes.button}
     >
       {text}
     </Button>
   );
 };

 export default ClickButton;