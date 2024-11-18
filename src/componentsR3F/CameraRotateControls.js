import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

import useMediaQuery from '../hooks/useMediaQuery';

// exmaple
// https://codesandbox.io/s/szj6p7?file=/src/App.js:4168-4585
export const CameraRotateControls = ({ speed = 4, damping = 0.5, minY = 1.25 }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const distanceDivider = (1 / speed) * 50;

  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        Math.sin(state.pointer.x / distanceDivider) * 9,
        minY + (state.pointer.y * (speed / 2)) / 2,
        Math.cos(state.pointer.x / distanceDivider) * 9,
      ],
      damping,
      delta
    );
    state.camera.fov = isDesktop ? 39 : 85;
    state.camera.lookAt(0, 0, 0);
  });
};
