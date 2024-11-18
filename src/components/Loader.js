import * as React from 'react';
import { useProgress } from '@react-three/drei';

import { useCanvasStore } from '../context/canvasContext';

import { CircularLoader } from './CircularLoader';

const Loader = () => {
  const { progress } = useProgress();
  const { setCanvasData } = useCanvasStore();
  const to = React.useRef();

  React.useEffect(() => {
    clearTimeout(to.current);
    if (progress === 100) {
      to.current = setTimeout(() => {
        setCanvasData({ isLoaded: true });
      }, 2000);
    } else {
      setCanvasData({ isLoaded: false });
    }
  }, [progress]);

  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex justify-center bg-white items-center flex-col transition-colors duration-1000">
      <CircularLoader
        id="circular-loader"
        style={{ marginBottom: '1.5rem' }}
        progress={Math.round(progress)}
      />
    </div>
  );
};

export default Loader;
