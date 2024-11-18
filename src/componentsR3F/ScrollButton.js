// import { Billboard } from "@react-three/drei"
// Context issues : https://docs.pmnd.rs/react-three-fiber/advanced/gotchas
import { useScroll } from '@react-three/drei';
import React from 'react';
import { useRef } from 'react';
import cn from 'classnames';

import { scrollToLocation } from '../utils/scroll-to-location';

export function ScrollButton({ children, active, className, offset = 0, ...props }) {
  let scroll = useScroll();
  const btn = useRef();

  const handleScroll = () => {
    scrollToLocation(scroll, offset);
  };

  return (
    <button
      ref={btn}
      className={cn(
        'text-right md:mr-3 font-title md:my-2 group flex justify-center md:justify-end items-center',
        className
      )}
      onClick={handleScroll}
      {...props}>
      <span className="hidden md:inline-block">{children}</span>
      <span
        className={cn(
          'transition-colors duration-300 md:group-hover:bg-white w-2 h-2 inline-block rounded-full mx-2 border border-white',
          { 'bg-white': active }
        )}></span>
    </button>
  );
}
