import React from 'react';

import { Model as ModelJSX } from '../../componentsR3F/GLTFOptimised';
import { MouseControls } from '../../componentsR3F/MouseControls';
import { useCanvasStore } from '../../context/canvasContext';
import { SkyBox } from '../../componentsR3F/Skybox';

import { Model, Instances } from './Model.jsx';

export function MoorishTempleComposition() {
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
      <SkyBox
        folder="/hdri/bluesky/"
        ground={{ height: 60, radius: 830, scale: 550 }}
      />
    </>
  );
}
