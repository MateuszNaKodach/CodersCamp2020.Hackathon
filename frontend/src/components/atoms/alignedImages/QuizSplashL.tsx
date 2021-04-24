import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function QuizSplashL() {
  return (
    <div>
      <img
        src={`${PATH_FOR_IMAGES}/quizSplashL.svg`}
        alt="log in splash illustration"
        style={{ position: 'absolute', left: '-140px', top: '150px' }}
      />
    </div>
  );
}
