import { GLTFLoader, DRACOLoader, MeshoptDecoder } from 'three-stdlib';
import { useLoader } from '@react-three/fiber';

let dracoLoader = null;

function extensions(useDraco, useMeshopt, extendLoader) {
  return (loader) => {
    if (extendLoader) {
      extendLoader(loader);
    }
    if (useDraco) {
      if (!dracoLoader) {
        dracoLoader = new DRACOLoader();
      }
      dracoLoader.setDecoderPath(
        typeof useDraco === 'string' ? useDraco : 'https://www.gstatic.com/draco/versioned/decoders/1.5.5/'
      );
      loader.setDRACOLoader(dracoLoader);
    }
    if (useMeshopt) {
      loader.setMeshoptDecoder(typeof MeshoptDecoder === 'function' ? MeshoptDecoder() : MeshoptDecoder);
    }
  };
}

export const preloadGlb = (path, useDraco = true, useMeshOpt = true, extendLoader) =>
  useLoader.preload(GLTFLoader, path, extensions(useDraco, useMeshOpt, extendLoader));
