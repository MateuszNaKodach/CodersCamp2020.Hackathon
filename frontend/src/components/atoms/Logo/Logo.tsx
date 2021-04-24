import React from 'react';
import { PATH_FOR_IMAGES } from '../../atoms/constants/imgPaths';

export default function Logo() {
  return (
    <div>
      <img src={`${PATH_FOR_IMAGES}/logo.svg`} alt="logo" />
    </div>
  );
}
