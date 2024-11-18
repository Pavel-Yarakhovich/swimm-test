import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

import { scrollVisible } from '../utils/scroll-visible';

export function useScrollVisible({ page = 1, start, end, startOffset = 0, endOffset = 0 }) {
  const scroll = useScroll();
  const isCurrVisable = scrollVisible(scroll, {
    page,
    start,
    end,
    startOffset,
    endOffset,
  });
  const [visible, setVisible] = useState(isCurrVisable);
  useFrame(() => {
    const isVisible = scrollVisible(scroll, {
      page,
      start,
      end,
      startOffset,
      endOffset,
    });
    if (visible !== isVisible) setVisible(isVisible);
  });

  return visible;
}
