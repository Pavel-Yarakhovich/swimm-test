import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';

import { useCamera } from '../hooks/useCamera.js';

const PI_2 = Math.PI / 2;

export function MouseControls({
  distance = 1,
  distanceX = distance,
  distanceY = distance,
  cameraName = 'Camera',
  orbit = false,
  children,
}) {
  const mouseController = useRef();
  const pointLockController = useRef();
  const { camera, cameraObject } = useCamera(cameraName);
  const [parent, setParent] = useState({});
  let vec = new THREE.Vector3();
  const state = useThree();

  const scroll = useScroll();
  useFrame(({ mouse }) => {
    if (!mouseController.current) return;
    vec
      .set(mouse.x * distanceX, mouse.y * distanceY, 0) //vector to mouse
      .applyEuler(camera.rotation); //apply camera rotation to position vector
    mouseController.current.position.lerpVectors(mouseController.current.position, vec, 0.05);
  });

  // copy parent props
  useEffect(() => {
    if (mouseController.current) {
      setParent(camera.parent);
      camera.parent = mouseController.current;
    }
  }, [camera, mouseController, pointLockController]);

  const previousEvent = React.useRef();
  const dragging = React.useRef(false);
  const yawObject = React.useRef(new THREE.Object3D());
  const pitchObject = React.useRef(new THREE.Object3D());

  React.useEffect(() => {
    if (!orbit) return;
    yawObject.current.add(pitchObject.current);
    function mouseDown(event) {
      dragging.current = true;
      previousEvent.current = event;
    }

    function mouseMove(event) {
      // Disable right click drag
      if (dragging.current && previousEvent.current) {
        const movementX = event.screenX - previousEvent.current.screenX;
        const movementY = event.screenY - previousEvent.current.screenY;
        const direction = 1;
        yawObject.current.rotation.y += movementX * 0.002 * direction;
        pitchObject.current.rotation.x += movementY * 0.002 * direction;
        pitchObject.current.rotation.x += movementY * 0.002 * direction;
        pitchObject.current.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.current.rotation.x));
      }

      previousEvent.current = event;
    }
    function mouseUp() {
      previousEvent.current = undefined;
      dragging.current = false;
    }
    document.addEventListener('mousedown', mouseDown, false);
    document.addEventListener('mousemove', mouseMove, false);
    document.addEventListener('mouseup', mouseUp, false);

    return () => {
      document.removeEventListener('mousedown', mouseDown);
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    };
  }, [state.gl.domElement, orbit]);

  useFrame(() => {
    if (scroll.delta > 0.0003) {
      pitchObject.current.rotation.x *= 0.9;
      yawObject.current.rotation.y *= 0.9;
    }

    cameraObject.rotation.y = THREE.MathUtils.lerp(cameraObject.rotation.y, yawObject.current.rotation.y, 0.05);
  });

  return (
    <>
      <group
        ref={mouseController}
        name="mouseController"
        {...parent}>
        <group
          ref={pointLockController}
          name="pointLockController">
          {children}
        </group>
      </group>
    </>
  );
}
