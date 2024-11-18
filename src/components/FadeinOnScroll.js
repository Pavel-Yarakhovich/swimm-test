import React, { useEffect } from 'react';
import { useAnimationControls } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { detectIOS } from '../utils/detectBrowser';

const isBrowser = typeof window !== 'undefined';

const FadeInOnScroll = ({ children, container, refClassname, handleInView, slideIndex }) => {
  const threshold = 0.35;
  const containerOffset = 0.15;
  const isIos = detectIOS();
  const blockHeight = '30vh';

  const windowHeight = isBrowser ? window.innerHeight : 0;
  const margin = `-${windowHeight * containerOffset}px 0px 0px -${windowHeight * 0}px`;
  const [ref, inView] = useInView({
    root: container.current,
    rootMargin: margin, //requires root element
    threshold,
  });

  const animationControls = useAnimationControls();

  useEffect(() => {
    animationControls.set('enter');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleInView(inView, slideIndex);
  }, [inView]);

  return (
    <>
      <div
        className="sticky my-auto left-0 w-full block"
        style={{
          pointerEvents: !inView ? 'none' : null,
          top: blockHeight,
          height: '70vh',
          paddingBottom: blockHeight,
        }}
        ref={ref}>
        <div
          className="w-full h-full relative"
          style={
            {
              // top: isIos && slideIndex > 0 ? '' : `-${blockHeight}`,
            }
          }>
          {typeof children === 'function' ? children(inView) : children}
        </div>
      </div>

      <div
        className={`scroll-ref relative w-full pointer-events-none mb-1 ${refClassname || ''}`}
        style={{ height: blockHeight }}
        ref={ref}></div>
    </>
  );
};

export { FadeInOnScroll };
