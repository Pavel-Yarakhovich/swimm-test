import React from 'react';
import { Html, useProgress } from '@react-three/drei';

import { CircularLoader } from '../components/CircularLoader';

export function Loader() {
  const { progress } = useProgress();

  return (
    <Html
      fullscreen
      center
      prepend
      className="transition-opacity">
      {/* <!-- LOADER --!> */}
      <div className="w-full h-full flex justify-center items-center flex-col bg-darkgray transition-colors duration-1000 translate-x-1/2 translate-y-1/2">
        <CircularLoader
          id="circular-loader"
          style={{ marginBottom: '1.5rem' }}
          progress={Math.round(progress)}
        />
      </div>
    </Html>
  );
}
