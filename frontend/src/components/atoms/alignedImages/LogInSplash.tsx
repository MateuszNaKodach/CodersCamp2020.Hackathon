import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function LogInSplash() {
  return (
    <div>
      <img
        src={`${PATH_FOR_IMAGES}/logInSplash.svg`}
        alt="log in splash illustration"
        style={{ position: 'absolute', right: '0', top: '0' }}
      />
    </div>
  );
}
