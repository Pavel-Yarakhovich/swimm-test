import React from 'react';
import { ScrollControls } from '@react-three/drei';
import { useEffect } from 'react';

import { useCanvasStore } from '../context/canvasContext.js';

export function ScrollContainer({ children }) {
  const { maxSpeed, speed, pages, damping, enableScroll, setCanvasData } = useCanvasStore();

  useEffect(() => {
    setCanvasData({
      dpr: 1.5,
      scrollPosition: 1.5,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollControls
      maxSpeed={maxSpeed}
      pages={pages} // Each page takes 100% of the height of the canvas
      distance={speed} // A factor that increases scroll bar travel (default: 1)
      damping={damping} // Friction, higher is faster (default: 4)
      horizontal={false} // Can also scroll horizontally (default: false)
      enabled={enableScroll}>
      {children}
    </ScrollControls>
  );
}
