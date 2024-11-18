/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 rhino-building-v06.glb -I -T 
Files: rhino-building-v06.glb [34.09MB] > /Users/katiasmet/Projects/2023/yondr/zoo/static/glbs/rhino-building-v06-transformed.glb [6.75MB] (80%)
*/

import React, { useRef, useMemo, useContext, createContext, useEffect } from 'react';
import { useGLTF, Merged, PerspectiveCamera, useAnimations } from '@react-three/drei';

const context = createContext();
export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/glbs/rhino-building-v06-transformed.glb');
  const instances = useMemo(
    () => ({
      FourthWall: nodes.FourthWall,
      ThirdWall: nodes.ThirdWall,
      SecondWall: nodes.SecondWall,
      Roof: nodes.Roof,
      FifthWall: nodes.FifthWall,
      FirstWall: nodes.FirstWall,
      RockWall: nodes.RockWall,
      Floor: nodes.Floor,
      Plane: nodes.Plane,
      Floor1: nodes.Floor001,
      Trunks: nodes.Trunks,
      TreeLeafs: nodes.Tree_Leafs,
      GrassgreenGrassgreen: nodes.Grass_green013_Grass_green001_0,
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
  const { nodes, animations } = useGLTF('/glbs/rhino-building-v06-transformed.glb');
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
        <group
          name="Empty"
          position={[1.882, 0, 0]}
        />
        <PerspectiveCamera
          name="WebCamera"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={22.895}
          position={[-3.274, 0.592, 14.571]}
          rotation={[-0.041, -0.34, -0.014]}
        />
        <instances.FourthWall
          name="FourthWall"
          position={[0.378, 0.937, 1.386]}
          rotation={[Math.PI / 2, 0, -0.087]}
          scale={0.457}
        />
        <instances.ThirdWall
          name="ThirdWall"
          position={[-0.015, 0.146, -0.363]}
          rotation={[0, 0.087, 0]}
          scale={0.457}
        />
        <instances.SecondWall
          name="SecondWall"
          position={[-0.817, -1.007, -1.421]}
          rotation={[0, Math.PI / 4, Math.PI / 2]}
          scale={0.457}
        />
        <instances.Roof
          name="Roof"
          position={[0.173, 1.725, 1.081]}
          rotation={[0, 0.074, 0.781]}
          scale={0.457}
        />
        <instances.FifthWall
          name="FifthWall"
          position={[2.802, -1.054, 0.961]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.457}
        />
        <instances.FirstWall
          name="FirstWall"
          position={[-3.186, -1.07, -1.654]}
          rotation={[0, 0.074, 0]}
          scale={0.457}
        />
        <instances.RockWall
          name="RockWall"
          position={[4.979, -1.491, 1.143]}
          rotation={[1.662, 0, -0.161]}
          scale={0.457}
        />
        <instances.Floor
          name="Floor"
          position={[4.594, -1.924, 1.042]}
          scale={0.475}
        />
        <instances.Plane
          name="Plane"
          position={[2, -2.043, 1.116]}
          scale={34.958}
        />
        <instances.Floor1
          name="Floor001"
          position={[-8.742, -1.924, -5.655]}
          rotation={[0, -0.93, 0]}
        />
        <instances.Trunks
          name="Trunks"
          position={[-10.935, 1.452, 21.201]}
        />
        <instances.TreeLeafs
          name="Tree_Leafs"
          position={[-9.121, 3.176, 21.523]}
          rotation={[-0.241, -0.596, -0.145]}
          scale={0.808}
        />
        <instances.GrassgreenGrassgreen
          name="Grass_green013_Grass_green001_0"
          position={[-3.04, -1.647, 1.564]}
          rotation={[-Math.PI, 1.136, -Math.PI]}
          scale={0.317}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/glbs/rhino-building-v06-transformed.glb');
