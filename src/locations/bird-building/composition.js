import React from 'react';

import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised';
import { SkyBox } from '../../componentsR3F/Skybox';
import { useCanvasStore } from '../../context/canvasContext';
import { MouseControls } from '../../componentsR3F/MouseControls';

import { Model, Instances } from './Model.jsx';

export function BirdBuildingComposition() {
  const { scrollEnabled, overlayIsOpen } = useCanvasStore();

  return (
    <>
      <MouseControls
        distance={1}
        cameraName="WebCamera"
        orbit={!overlayIsOpen}></MouseControls>
      <ModelJSX
        model={Model}
        instances={Instances}
        enableScroll={scrollEnabled}
        lightMap={true}
        className="fixed"
        cameraName="WebCamera"></ModelJSX>
      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
