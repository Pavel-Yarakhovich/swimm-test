import React, { useRef } from 'react';
import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion';

const VerticalScroll = ({ children, isDisabled, className, ...props }) => {
  const scrollRef = useRef(null);
  const scrollTop = useMotionValue(0);

  const resetScroll = () => {
    if (!scrollRef.current) return;
    scrollTop.set(scrollRef.current.scrollTop); //set current scroll position
    animate(scrollTop, 0, {
      //animate to start
      duration: 0.2,
      ease: 'easeOut',
    });
  };

  //UpdateScroll position
  useMotionValueEvent(scrollTop, 'change', (latest) => {
    scrollRef.current.scrollTop = latest;
  });

  return (
    <div
      ref={scrollRef}
      {...props}
      className={`${className || ''} ver-scroll ${isDisabled ? 'overflow-y-hidden' : 'overflow-y-auto'} `}>
      {typeof children === 'function' ? children(resetScroll) : children}
    </div>
  );
};

export default VerticalScroll;
