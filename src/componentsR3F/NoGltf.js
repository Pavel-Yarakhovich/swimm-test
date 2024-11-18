import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export function NoGltf(bg) {
  const { scene } = useThree();

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent('ThreeLoading', {
        detail: {
          progress: 100,
        },
      })
    );

    if (bg) {
      scene.background = bg;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
