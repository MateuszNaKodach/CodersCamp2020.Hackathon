import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function NoQuestionIlu() {
  return (
    <div>
      <img
        src={`${PATH_FOR_IMAGES}/noQuestionIlu.svg`}
        alt="log in splash illustration"
        style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translate(-50%)' }}
      />
    </div>
  );
}
