import React from 'react';

import { Model as ModelDebug } from '../../componentsR3F/GLTF';
import { SkyBox } from '../../componentsR3F/Skybox';
import { useCanvasStore } from '../../context/canvasContext';

export function Template() {
  const { scrollEnabled } = useCanvasStore();

  return (
    <>
      <ModelDebug
        enableScroll={scrollEnabled}
        gltf="moorish-temple-v02.glb"
        lightMap={true}
        className="fixed"></ModelDebug>

      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
