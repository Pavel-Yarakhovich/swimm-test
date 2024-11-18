import React, { useEffect, useState } from 'react';
import { animate, useMotionValue, motion, useMotionTemplate } from 'framer-motion';
import cn from 'classnames';

const ElasticModal = ({
  className = '',
  bgClassName = '',
  isVisible = false,
  children,
  background = '#000',
  ...props
}) => {
  const [firstUpdate, hasRendered] = useState(true);

  const movement = useMotionValue(100);
  const movement2 = useMotionValue(100);
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (isVisible > 1) {
      return;
    }

    if (firstUpdate) {
      hasRendered(false);
    } else {
      movement.set(0);
      movement2.set(0);

      animate(movement, 100, {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
        delay: !isVisible ? 0.4 : 0.05,
      });

      animate(movement2, 100, {
        duration: 1.3,
        ease: [0.22, 1, 0.36, 1],
        delay: !isVisible ? 0.4 : 0,
      });

      animate(opacity, isVisible ? 1 : 0, {
        duration: isVisible ? 1 : 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: isVisible ? 0.5 : 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const shape = useMotionTemplate`M 0, ${isVisible ? '0' : '100'} L 100, ${
    isVisible ? '0' : '100'
  } L 100, ${movement} Q 50 ${movement2} , 0 ${movement}z`;

  return (
    <>
      <motion.svg
        {...props}
        animate={{
          fill: background,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`h-full w-full block fixed top-0 left-0 bottom-0-z-10 pointer-events-none ${bgClassName}`}>
        <motion.path d={shape}></motion.path>
      </motion.svg>
      <motion.div
        {...props}
        className={cn('w-full h-full fixed pointer-events-none', className)}
        style={{ opacity, ...props.style }}>
        {children}
      </motion.div>
    </>
  );
};

export default ElasticModal;
