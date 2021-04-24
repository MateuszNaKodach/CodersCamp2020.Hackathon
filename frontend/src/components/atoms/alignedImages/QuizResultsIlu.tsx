import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function QuizSplashR() {
  return (
    <div>
      <img src={`${PATH_FOR_IMAGES}/quizResultsIlu.svg`} alt="log in splash illustration" style={{ position: 'absolute', left: '50px' }} />
    </div>
  );
}
