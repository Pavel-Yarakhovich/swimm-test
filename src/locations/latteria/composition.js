import React from 'react';

import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised';
import { MouseControls } from '../../componentsR3F/MouseControls';
import { useCanvasStore } from '../../context/canvasContext';
import { SkyBox } from '../../componentsR3F/Skybox';

import { Instances, Model } from './Model.jsx';

export function LatteriaComposition() {
  const { scrollEnabled, overlayIsOpen } = useCanvasStore();

  return (
    <>
      <MouseControls
        distance={0.6}
        cameraName="webCamera"
        orbit={!overlayIsOpen}></MouseControls>
      <ModelJSX
        model={Model}
        instances={Instances}
        enableScroll={scrollEnabled}
        lightMap={true}
        className="fixed"
        cameraName="webCamera"></ModelJSX>
      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
