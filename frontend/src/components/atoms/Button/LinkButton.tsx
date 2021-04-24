import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { THEME } from '../constants/ThemeMUI';

type TextButtonProps = {
  readonly text: string;
  readonly onLink: string;
};

const LinkButton = ({ text, onLink }: TextButtonProps) => {
  return (
    <Link to={onLink} style={{ textDecoration: 'none' }}>
      <Button
        color="primary"
        size="large"
        style={{ fontWeight: 500, backgroundColor: `${THEME.palette.primary.contrastText}`, padding: '8px 25px' }}
      >
        {text}
      </Button>
    </Link>
  );
};

export default LinkButton;
