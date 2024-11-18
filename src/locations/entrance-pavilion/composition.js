import React from 'react';

import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised';
import { MouseControls } from '../../componentsR3F/MouseControls';
//import { Model as ModelDebug } from '../../componentsR3F/GLTF';
import { SkyBox } from '../../componentsR3F/Skybox';
import { useCanvasStore } from '../../context/canvasContext';

import { Model, Instances } from './Model.jsx';

export function EntrancePavilionComposition() {
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
        gltf="entrance-pavilion-v02-transformed.glb"
        lightMap={true}
        className="fixed"></ModelDebug> */}

      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
