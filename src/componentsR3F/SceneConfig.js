import { useScroll } from '@react-three/drei';
import React, { useEffect } from 'react';

import { useCanvasStore } from '../context/canvasContext';
import { scrollToLocation } from '../utils/scroll-to-location';

export function SceneConfig({ config, timeout = 800, children, className }) {
  const { setCanvasData } = useCanvasStore();
  let scroll = useScroll();

  useEffect(() => {
    let timerId = setTimeout(() => {
      scrollToLocation(scroll, config.offset);
      setCanvasData(config);
    }, timeout);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={className}>{children}</div>;
}
