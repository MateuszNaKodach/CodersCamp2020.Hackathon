import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function FourIlu() {
  return (
    <div>
      <img
        src={`${PATH_FOR_IMAGES}/404Ilu.svg`}
        alt="work in progress illustration"
        style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translate(-50%)' }}
      />
    </div>
  );
}
