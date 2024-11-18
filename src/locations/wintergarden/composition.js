import React from 'react';

import { Model as ModelDebug } from '../../componentsR3F/GLTF';
import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised';
import { MouseControls } from '../../componentsR3F/MouseControls';
import { useCanvasStore } from '../../context/canvasContext';
import { SkyBox } from '../../componentsR3F/Skybox';

import { Instances, Model } from './Model.jsx';

export function WintergardenComposition() {
  const { scrollEnabled, overlayIsOpen } = useCanvasStore();

  return (
    <>
      <MouseControls
        distance={0.6}
        cameraName="WebCamera"
        orbit={!overlayIsOpen}></MouseControls>
      {/* <ModelJSX
        model={Model}
        instances={Instances}
        enableScroll={scrollEnabled}
        lightMap={true}
        className="fixed"
        cameraName="WebCamera"></ModelJSX> */}
      <ModelDebug
        enableScroll={scrollEnabled}
        gltf="wintertuin_v02-transformed.glb"
        lightMap={true}
        className="fixed"></ModelDebug>
      <SkyBox
        folder="/hdri/wintergarden/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
