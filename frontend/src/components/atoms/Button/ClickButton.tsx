import { Button } from '@material-ui/core';
import { THEME } from '../constants/ThemeMUI';

type TextButtonProps = {
  readonly text: string;
  readonly onClick: undefined | (() => void);
  //   readonly onLink: string;
};

const ClickButton = ({ text, onClick }: TextButtonProps) => {
  return (
    <Button
      onClick={onClick}
      color="primary"
      size="large"
      type="submit"
      style={{ fontWeight: 500, backgroundColor: `${THEME.palette.primary.contrastText}`, padding: '8px 25px' }}
    >
      {text}
    </Button>
  );
};

export default ClickButton;
