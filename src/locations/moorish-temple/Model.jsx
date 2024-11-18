/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.4.1 moorish-temple_v011.glb -I -T -R 2440 
Files: moorish-temple_v011.glb [16.01MB] > /Users/katiasmet/Projects/2023/yondr/zoo/static/glbs/moorish-temple_v011-transformed.glb [9.02MB] (44%)
*/

import React, { useContext, useEffect, useRef } from 'react';
import { useGLTF, Merged, PerspectiveCamera, useAnimations } from '@react-three/drei';

const context = React.createContext();

export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/glbs/moorish-temple_v011_transformed.glb');
  const instances = React.useMemo(
    () => ({
      GrassgreenGrassgreen: nodes.Grass_green013_Grass_green001_0,
      Cube: nodes.Cube,
      MoorseTempel: nodes.Moorse_Tempel,
      MoorseTuinMesh: nodes.Moorse_Tuin_Mesh002,
      MoorseTuinMesh1: nodes.Moorse_Tuin_Mesh002_1,
      Cube1: nodes.Cube003,
      Cube2: nodes.Cube003_1,
      Okapi: nodes.Okapi,
    }),
    [nodes]
  );
  return (
    <Merged
      meshes={instances}
      {...props}>
      {(instances) => (
        <context.Provider
          value={instances}
          children={children}
        />
      )}
    </Merged>
  );
}

export function Model({ children, gltfLoaded, ...props }) {
  const instances = useContext(context);
  const group = useRef();
  const { nodes, animations } = useGLTF('/glbs/moorish-temple_v011_transformed.glb');
  const { mixer, actions } = useAnimations(animations, group);

  useEffect(() => {
    gltfLoaded(nodes, animations, mixer, actions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}>
      <group name="Scene">
        {children}
        <PerspectiveCamera
          name="WebCamera"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={19.157}
          position={[68.678, 42.351, 218.067]}
          rotation={[-0.135, 0.253, 0.034]}
        />
        <instances.GrassgreenGrassgreen
          name="Grass_green013_Grass_green001_0"
          position={[84.415, -1.647, -49.283]}
          rotation={[-Math.PI, 1.267, -Math.PI]}
          scale={3.171}
        />
        <instances.Cube
          name="Cube"
          position={[-29.684, 1.303, 48.03]}
          rotation={[0, -0.553, 0]}
        />
        <instances.MoorseTempel
          name="Moorse_Tempel"
          position={[0, 0.218, 0]}
        />
        <group
          name="Moorse_Tuin002"
          position={[69.113, 0.668, 12.819]}
          scale={4.75}>
          <instances.MoorseTuinMesh name="Moorse_Tuin_Mesh002" />
          <instances.MoorseTuinMesh1 name="Moorse_Tuin_Mesh002_1" />
        </group>
        <group
          name="Tree_02_Branches002"
          position={[-10.524, 4.723, 4.889]}
          rotation={[1.405, 0.99, -1.114]}
          scale={0.226}>
          <instances.Cube1 name="Cube003" />
          <instances.Cube2 name="Cube003_1" />
        </group>
        <instances.Okapi
          name="Okapi"
          position={[72.335, -0.07, 9.41]}
          rotation={[0, -0.714, 0]}
          scale={0.075}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/glbs/moorish-temple_v011_transformed.glb');