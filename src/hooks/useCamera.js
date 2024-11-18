import { useThree } from '@react-three/fiber';
import { useState, useEffect } from 'react';

// Pick Camera or a parent Object of the camera By Name
export function useCamera(cameraName = 'Camera') {
  const { camera } = useThree();
  const [cameraOrParent, setCameraOrParent] = useState(camera);

  useEffect(() => {
    if (camera && camera.name !== cameraName) {
      let tempCamera = camera;
      while (tempCamera.parent !== null && tempCamera.name !== cameraName) {
        tempCamera = tempCamera.parent;
      }
      setCameraOrParent(tempCamera);
    }
  }, [camera, cameraName]);

  return { camera: cameraOrParent, cameraObject: camera };
}
