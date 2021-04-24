import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function AnswerIlu() {
  return (
    <div>
      <img src={`${PATH_FOR_IMAGES}/questionIlu.svg`} alt="log in illustration" style={{ position: 'absolute', right: '0', bottom: '0' }} />
    </div>
  );
}
