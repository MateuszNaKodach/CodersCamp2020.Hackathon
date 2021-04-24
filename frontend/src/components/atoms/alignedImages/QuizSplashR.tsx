import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function QuizSplashR() {
  return (
    <div>
      <img
        src={`${PATH_FOR_IMAGES}/quizSplashR.svg`}
        alt="log in splash illustration"
        style={{ position: 'absolute', right: '0', top: '150px' }}
      />
    </div>
  );
}
