import React from 'react';

import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised.js';
import { MouseControls } from '../../componentsR3F/MouseControls.js';
import { Model as ModelDebug } from '../../componentsR3F/GLTF';
import { SkyBox } from '../../componentsR3F/Skybox.js';
import { useCanvasStore } from '../../context/canvasContext.js';

import { Model, Instances } from './Model.jsx';

export function GrandCafeFlamingoComposition() {
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
        gltf="grand_cafe_flamingo_v06-transformed.glb"
        lightMap={true}
        className="fixed"></ModelDebug> */}

      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
