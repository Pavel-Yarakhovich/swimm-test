import React, { useMemo, useRef } from 'react';
import { Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useProgress, useScroll } from '@react-three/drei';
import { AnimationMixer } from 'three';
import { useState } from 'react';

import { Model as DefaultModel, Instances } from '../locations/egyptian-temple/Model.jsx';
import useMediaQuery from '../hooks/useMediaQuery.js';

import { Loader } from './Loader';

export function Model({
  model,
  instances,
  gltf,
  cameraName,
  folder = '/glbs',
  lightMap = false,
  enableScroll = false,
  children,
  timeScale = 1,
  animationProgress,
  ...props
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const ref = useRef([]);

  const OptimisedModel = useMemo(() => (model ? model : DefaultModel), [model]);
  const InstancesGroup = useMemo(() => (instances ? instances : Instances), [instances]);

  document.loadingProgress = 0;

  const { progress } = useProgress();

  const isLoaded = useRef(false);
  if (!isLoaded.current) {
    if (progress === 100) isLoaded.current = true;
    document.dispatchEvent(
      new CustomEvent('ThreeLoading', {
        detail: {
          progress: Math.round(progress),
        },
      })
    );
  }

  let [mixer, setMixer] = useState();
  let [camera, setCamera] = useState({});

  const gltfLoaded = (nodes, animations, mixer, actions) => {
    if (lightMap) {
      Object.values(nodes).forEach((child) => {
        if (child.material && child.material.emissiveMap) {
          child.material.lightMap = child.material.emissiveMap;
        }
        if (child.type === 'PerspectiveCamera' || child.name === 'Camera') {
          setCamera(child);
        }
      });
    }

    // Custom controlled animationMixer
    const animMixer = new AnimationMixer(ref.current[0]);
    animMixer.timeScale = timeScale;
    animMixer.duration = 0;
    animations.forEach((clip) => {
      animMixer.duration = clip.duration > animMixer.duration ? clip.duration : animMixer.duration;
      const action = animMixer.clipAction(clip);
      action.play();
    });
    setMixer(animMixer);
  };

  const scroll = useScroll();
  useFrame(() => {
    if (mixer) mixer.setTime(0);
    if (!enableScroll) return;
    const animationProgress = scroll.range(0, 1) * 0.99;

    if (mixer && animationProgress !== undefined) {
      mixer.setTime(mixer.duration * animationProgress);
    }
  });

  return (
    <Suspense fallback={<Loader></Loader>}>
      <group
        ref={(group) => (ref.current[0] = group)}
        {...props}>
        <InstancesGroup>
          <OptimisedModel gltfLoaded={gltfLoaded}>
            <>
              <group
                {...camera}
                name={cameraName || 'Camera'}>
                <PerspectiveCamera
                  ref={(cam) => {
                    ref.current[1] = cam;
                  }}
                  fov={isDesktop ? camera.fov : camera.fov * 2}
                  makeDefault={true}
                  name="cameraObject"
                  position={[0.001, 0.001, 0.001]}
                />
                {typeof children === 'function' ? children(ref.current[0]) : children}
              </group>
            </>
          </OptimisedModel>
        </InstancesGroup>

        {children}
      </group>
    </Suspense>
  );
}
