import React from 'react';
import { PATH_FOR_IMAGES } from '../constants/imgPaths';

export default function Logo() {
  return (
    <div>
      <img src={`${PATH_FOR_IMAGES}/logo.svg`} alt='logo' style={{ width: '100%', paddingLeft: '5%' }} />
    </div>
  );
}
