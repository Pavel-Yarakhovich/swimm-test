import { useScroll } from '@react-three/drei';
import { useEffect } from 'react';

// Pick Camera or a parent Object of the camera By Name
export function useScrollStop(isVisible, timeout = 1500) {
  const { el } = useScroll();

  useEffect(() => {
    let timerId;

    if (isVisible) {
      if (el) el.classList.add('!overflow-hidden');
      timerId = setTimeout(() => {
        if (el) el.classList.remove('!overflow-hidden');
      }, timeout);
    }

    return () => {
      clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return null;
}
