// import { Billboard } from "@react-three/drei"
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

export function ScrollProgress({ children }) {
  const sroll = useScroll();
  const progressBar = useRef();

  useFrame(() => {
    if (progressBar.current) progressBar.current.style.height = `${sroll.offset * 100}%`;
  });

  return (
    <>
      <div className="scroll-progress fixed h-full bg-pink-history bg-opacity-40 right-0 w-2">
        <div
          ref={progressBar}
          className="bg-black bg-opacity-60 border-b-green border-b-2"></div>
      </div>
      <div className="scroll-buttons fixed flex md:flex-col w-full md:w-auto justify-evenly md:justify-center md:top-0 my-auto md:right-2  md:h-full bottom-12 md:bottom-0 px-8 md:px-0">
        {children}
      </div>
    </>
  );
}
