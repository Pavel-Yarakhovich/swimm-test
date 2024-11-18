import { useFrame, useThree } from '@react-three/fiber';

import useMediaQuery from '../hooks/useMediaQuery';

export function CameraResponsive({ desktopFOV = 75, mobileFOV = 100 }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { camera } = useThree();

  useFrame(() => {
    if (typeof camera.fov === 'undefined') return;
    if (camera.fov !== desktopFOV && isDesktop) {
      camera.fov = desktopFOV;
    } else if (camera.fov !== mobileFOV && !isDesktop) {
      camera.fov = mobileFOV;
    }
  });

  return null;
}
