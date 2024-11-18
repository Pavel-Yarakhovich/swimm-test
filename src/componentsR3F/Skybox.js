import { useThree, extend } from '@react-three/fiber';
import React, { useState, useRef } from 'react';
import { useEffect, useMemo } from 'react';
import { CubeTextureLoader } from 'three';
import { GroundProjectedEnv as GroundProjectedEnvImpl } from 'three-stdlib';

export function SkyBox({ ground, folder = '/hdri/' }) {
  const { scene } = useThree();

  let [texture, setTexture] = useState();

  useEffect(() => {
    const extension = 'png';
    const hdrUrls = [
      `px.${extension}`,
      `nx.${extension}`,
      `py.${extension}`,
      `ny.${extension}`,
      `pz.${extension}`,
      `nz.${extension}`,
    ];

    const loader = new CubeTextureLoader().setPath(folder);

    // global enviermentmap for all objects
    const envMap = loader.load(hdrUrls);
    // envMap.encoding = THREE.RGBEEncoding
    scene.environment = envMap;

    const bg = loader.load(hdrUrls);
    scene.background = bg;
    setTexture(bg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const floorRef = useRef();

  // Set the scene background property to the resulting texture.
  useMemo(() => extend({ GroundProjectedEnvImpl }), []);

  const floor = ground && texture && (
    <groundProjectedEnvImpl
      ref={floorRef}
      args={[texture]}
      scale={ground?.scale}
      height={ground?.height}
      radius={ground?.radius}
    />
  );

  return <>{floor}</>;
}
