import { Typography } from '@material-ui/core';
import React from 'react';

type TitleProps = {
  readonly text: string;
};

export default function Title({ text }: TitleProps) {
  return (
    <div>
      <Typography variant="h1" color="primary" style={{zIndex: 1, position: 'relative', textAlign: 'center', fontSize: '36px', marginTop: '90px' }}>
        {text}
      </Typography>
    </div>
  );
}
