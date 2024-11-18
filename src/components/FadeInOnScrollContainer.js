import React from 'react';
import { useInView } from 'react-intersection-observer';

const isBrowser = typeof window !== 'undefined';

const FadeInOnScrollContainer = ({ children, container, refClassname }) => {
  const threshold = 0.35;
  const containerOffset = 0.15;
  const blockHeight = '30vh';

  const windowHeight = isBrowser ? window.innerHeight : 0;
  const margin = `-${windowHeight * containerOffset}px 0px 0px -${windowHeight * 0}px`;
  const [ref, inView] = useInView({
    root: container.current,
    rootMargin: margin, //requires root element
    threshold,
  });

  return (
    <>
      <div
        className="sticky bottom-0 left-0 w-full h-screen"
        style={{
          pointerEvents: !inView ? 'none' : null,
          top: blockHeight,
          height: '70vh',
          paddingBottom: blockHeight,
        }}>
        <div
          className="w-full h-full relative"
          style={{
            top: `-${blockHeight}`,
          }}>
          {typeof children === 'function' ? children(inView) : children}
        </div>
      </div>
      <div
        className={`scroll-ref relative pointer-events-none w-full mb-1 ${refClassname || ''}`}
        style={{ height: blockHeight }}
        ref={ref}></div>
    </>
  );
};

export { FadeInOnScrollContainer };
