import { motion } from 'framer-motion';
import React, { useRef } from 'react';

import { useScrollStop } from '../hooks/scroll-visble-speedStop';
import { useScrollVisible } from '../hooks/scroll-visible-hook';

export function ScrollVisible({
  config,
  stopInView = false,
  children,
  hideCallback = () => {},
  showCallback = () => {},
  className,
  ...props
}) {
  const container = useRef();
  const isVisible = useScrollVisible(config);
  useScrollStop(isVisible && stopInView, 1000);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
        className={className}
        ref={container}
        {...props}>
        {typeof children === 'function' ? children(isVisible) : children}
      </motion.div>
    </>
  );
}
