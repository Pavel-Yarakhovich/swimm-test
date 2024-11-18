import React, { useEffect, useRef } from 'react';
import { Suspense } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Clone, PerspectiveCamera, useScroll } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { AnimationMixer } from 'three';
import { useState } from 'react';

import { Loader } from './Loader';

const dracoLoader = new DRACOLoader();

export function Model({
  gltf,
  folder = '/glbs',
  getCamera,
  lightMap = false,
  enableScroll = false,
  children,
  timeScale = 1,
  animationProgress,
  ...props
}) {
  const ref = useRef([]);

  useEffect(() => {
    document.loadingProgress = 0;
  }, []);

  const obj = useLoader(
    GLTFLoader,
    folder + '/' + gltf,
    (loader) => {
      document.dispatchEvent(
        new CustomEvent('ThreeLoading', {
          detail: {
            progress: process.env.NODE_ENV === 'development' ? 100 : 0,
          },
        })
      );
      dracoLoader.setDecoderPath('/glbs/decoders/');
      loader.setMeshoptDecoder(MeshoptDecoder);
      loader.setDRACOLoader(dracoLoader);
    },
    (xhr) => {
      const progress = Math.round((xhr.loaded / xhr.total) * 100);
      document.dispatchEvent(
        new CustomEvent('ThreeLoading', {
          detail: {
            progress: progress > 100 ? 100 : progress,
          },
        })
      );
    }
  );
  const { animations, nodes, scene } = obj;
  useEffect(() => {
    ref.current[2] = animations;
  }, [ref.current[2]]);
  useEffect(() => {
    if (lightMap) {
      scene.traverse((child) => {
        if (child.material && child.material.emissiveMap) {
          child.material.lightMap = child.material.emissiveMap;
        }
      });
    }
  }, [scene]);

  let [mixer, setMixer] = useState();
  useEffect(() => {
    if (ref.current[0]) {
      const animMixer = new AnimationMixer(ref.current[0]);
      animMixer.timeScale = timeScale;
      animMixer.duration = 0;
      animations.forEach((clip) => {
        animMixer.duration = clip.duration > animMixer.duration ? clip.duration : animMixer.duration;
        const action = animMixer.clipAction(clip);
        action.play();
      });
      setMixer(animMixer);
    }
  }, [ref.current[0]]);

  let { WebCamera: camera } = obj.nodes;

  const scroll = useScroll();
  useFrame(() => {
    if (mixer) mixer.setTime(0);
    if (!enableScroll) return;
    const animationProgress = scroll.range(0, 1) * 0.99;
    // Info(Katia): Uncomment to get scroll positions
    console.log('animationProgress:', scroll.scroll.current);
    if (mixer && animationProgress !== undefined) {
      mixer.setTime(mixer.duration * animationProgress);
    }
  });

  return (
    <Suspense fallback={<Loader></Loader>}>
      <group
        ref={(group) => (ref.current[0] = group)}
        {...props}>
        {children}
        <group
          {...camera}
          name="WebCamera">
          <PerspectiveCamera
            ref={(cam) => (ref.current[1] = cam)}
            makeDefault={true}
            name="cameraObject"
            position={[0.001, 0.001, 0.001]}
          />
        </group>
        {typeof children === 'function' ? children(ref.current[0]) : children}
        <Clone object={scene} />
      </group>
    </Suspense>
  );
}
