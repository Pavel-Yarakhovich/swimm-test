import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three';
import { useI18next } from 'gatsby-plugin-react-i18next';

import { useCanvasStore } from '../context/canvasContext';
import useDefferedVariable from '../hooks/useDefferedVariable';
import { useCMSdata } from '../hooks/useCMSdata';
import { preloadGlb } from '../utils/preloadGLB';
import { locations } from '../locations/all';

import { Composition } from './Composition';
// import { CameraResponsive } from './CameraResponsive.js';
import { ScrollContainer } from './ScrollContainer.js';
import { CompositionIndex } from './CompositionIndex';
import { NoGltf } from './NoGltf';

export function FiberScene({ location, className }) {
  const { active: loadingManagerActive } = useProgress();

  if (!loadingManagerActive) {
    document.dispatchEvent(new Event('SceneReady'));
  }
  const { setCanvasData, navigatingActiveUrl } = useCanvasStore();
  const experienceID = location.pathname?.split('/').pop();
  useCMSdata(experienceID);
  const { language } = useI18next();
  const i18n = useI18next();
  const dpr = 1.5;
  const currentPath = location.pathname;
  const path = useDefferedVariable(currentPath, 2000);
  const defferedPath = navigatingActiveUrl || currentPath.includes('audio/') ? path : currentPath;
  const locationData = useMemo(() => locations.find((el) => defferedPath.includes(el.slug)), [defferedPath]);

  useEffect(() => {
    setCanvasData({
      i18: i18n,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    preloadGlb('/glbs/egyptian_temple_v010_transformed.glb');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
      className={className}>
      {/* <CameraResponsive
        desktopFOV={39}
        mobileFOV={85}
      /> */}
      {/* <PerformanceMonitor /> */}
      <ScrollContainer>
        {defferedPath === '/' ||
        defferedPath === '/en/' ||
        defferedPath === '/nl/' ||
        defferedPath === '/fr/' ||
        location.pathname.includes('audio/') ? (
          <>
            <NoGltf />
            <CompositionIndex></CompositionIndex>
          </>
        ) : locationData?.slug ? (
          <Composition
            id={locationData.slug}
            composition={locationData.composition}
            stops={locationData.stops}
            location={location}></Composition>
        ) : (
          <>
            <NoGltf />
          </>
        )}
      </ScrollContainer>
    </Canvas>
  );
}
