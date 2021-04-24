import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function LogInIlu() {
  return (
    <div>
      <img src={`${PATH_FOR_IMAGES}/logInIllu.svg`} alt="log in illustration" style={{ position: 'absolute', left: '20px', top: '20px' }} />
    </div>
  );
}
