import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function LogInIlu() {
  return (
    <div>
      <img src={`${PATH_FOR_IMAGES}/answerIlu.svg`} alt="log in illustration" style={{ position: 'absolute', right: '0', bottom: '0' }} />
    </div>
  );
}
