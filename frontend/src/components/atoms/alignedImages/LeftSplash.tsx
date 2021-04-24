import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function LogInIlu() {
  return (
    <div>
      <img
        src={`${PATH_FOR_IMAGES}/leftSplash.svg`}
        alt="log in illustration"
        style={{ position: 'absolute', left: '80px', bottom: '0' }}
      />
    </div>
  );
}
