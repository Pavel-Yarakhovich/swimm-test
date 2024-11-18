/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.0 Zoo_Antwerpen_Latteria_v02.glb -I 
Files: Zoo_Antwerpen_Latteria_v02.glb [43.91MB] > /Users/katiasmet/Projects/2023/yondr/zoo/static/glbs/Zoo_Antwerpen_Latteria_v02-transformed.glb [2.99MB] (93%)
*/

import React, { useContext, useEffect, useRef } from 'react';
import { useGLTF, Merged, PerspectiveCamera, useAnimations } from '@react-three/drei';

const context = React.createContext();

export function Instances({ children, ...props }) {
  const { nodes } = useGLTF('/glbs/latteria_v02-transformed.glb');
  const instances = React.useMemo(
    () => ({
      BuitenkantLatteria: nodes.BuitenkantLatteria,
      Dak: nodes.Dak,
      Grond: nodes.Grond,
      TransparanteObjecten: nodes.TransparanteObjecten,
      TuinVloer: nodes.TuinVloer,
      TreeCutTreeCut: nodes.TreeCut_TreeCut_0001,
      RodeBloemen: nodes.RodeBloemen,
      RibbonGrass: nodes.RibbonGrass,
      Klimop: nodes.Klimop,
      Melkmeisje: nodes.Melkmeisje,
      BinnenkantLatteria: nodes.BinnenkantLatteria,
      GebouwenZijkant: nodes.GebouwenZijkant,
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
  const { nodes, animations } = useGLTF('/glbs/latteria_v02-transformed.glb');
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
          name="Target"
          position={[-8.635, 3.226, -4.718]}
        />
        <PerspectiveCamera
          name="Camera"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={37.299}
          position={[13.244, 1.933, 31.178]}
          rotation={[0.129, 0.337, -0.043]}
        />
        <PerspectiveCamera
          name="Camera001"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={41.112}
          position={[7.9, 0.002, -1.944]}
          rotation={[0.133, 0.398, -0.052]}
        />
        <PerspectiveCamera
          name="Camera002_1"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={64.652}
          position={[8.876, 0.002, -11.869]}
          rotation={[0.227, 0.392, -0.088]}
        />
        <PerspectiveCamera
          name="Camera003"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={41.112}
          position={[-17.909, 0.496, -10.104]}
          rotation={[Math.PI, -0.932, Math.PI]}
        />
        <PerspectiveCamera
          name="Camera004_1"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={53.702}
          position={[-9.404, 0.824, -11.866]}
          rotation={[Math.PI, -1.399, Math.PI]}
        />
        <PerspectiveCamera
          name="Camera005"
          makeDefault={false}
          far={100}
          near={0.1}
          fov={41.112}
          position={[-6.493, 0.444, -0.627]}
          rotation={[0, Math.PI / 4, 0]}
        />
        <PerspectiveCamera
          name="webCamera"
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={53.702}
          position={[27.933, 6.655, 39.093]}
          rotation={[-0.078, 0.694, 0.05]}
        />
        <instances.BuitenkantLatteria
          name="BuitenkantLatteria"
          position={[1.464, -0.723, -8.573]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <instances.Dak
          name="Dak"
          position={[-2.882, 7.42, -4.943]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <instances.Grond
          name="Grond"
          position={[3.012, -1.691, -3.095]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <instances.TransparanteObjecten
          name="TransparanteObjecten"
          position={[0.452, -0.723, 0.718]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <instances.TuinVloer
          name="TuinVloer"
          position={[5.057, -2.397, 8.597]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <instances.TreeCutTreeCut
          name="TreeCut_TreeCut_0001"
          position={[21.227, -1.305, -20.396]}
          rotation={[0, 0.036, 0]}
        />
        <instances.RodeBloemen
          name="RodeBloemen"
          position={[15.182, -2.382, 23.328]}
          rotation={[Math.PI / 2, 0, -0.838]}
        />
        <instances.RibbonGrass
          name="RibbonGrass"
          position={[11.304, -2.286, 16.824]}
          rotation={[Math.PI / 2, 0, -0.773]}
        />
        <instances.Klimop
          name="Klimop"
          position={[10.375, 4.592, -19.952]}
          rotation={[Math.PI / 2, 0, -0.79]}
        />
        <instances.Melkmeisje
          name="Melkmeisje"
          position={[5.618, 1.245, -16.477]}
          rotation={[Math.PI / 2, 0, -0.432]}
        />
        <instances.BinnenkantLatteria
          name="BinnenkantLatteria"
          position={[-6.251, 4.26, -7.747]}
          rotation={[0, -Math.PI / 4, 0]}
        />
        <instances.GebouwenZijkant
          name="GebouwenZijkant"
          position={[14.359, -0.691, -40.432]}
          rotation={[0, Math.PI / 4, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/glbs/latteria_v02-transformed.glb');