import React from 'react';

// import { Model as ModelDebug } from '../../componentsR3F/GLTF';
import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised';
import { MouseControls } from '../../componentsR3F/MouseControls';
import { useCanvasStore } from '../../context/canvasContext';
import { SkyBox } from '../../componentsR3F/Skybox';

import { Model, Instances } from './Model.jsx';

export function EgyptianTempleComposition() {
  const { scrollEnabled, overlayIsOpen } = useCanvasStore();

  return (
    <>
      <MouseControls
        distance={0.6}
        cameraName="WebCamera"
        orbit={!overlayIsOpen}></MouseControls>
      <ModelJSX
        model={Model}
        instances={Instances}
        enableScroll={scrollEnabled}
        lightMap={true}
        className="fixed"
        cameraName="WebCamera"></ModelJSX>

      {/* <ModelDebug
        enableScroll={scrollEnabled}
        gltf="Egyptische_Tempel_Blend_Compressed_1-transformed.glb"
        lightMap={true}
        className="fixed"></ModelDebug> */}

      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
