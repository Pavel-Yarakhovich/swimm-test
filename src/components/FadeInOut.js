import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// https://codesandbox.io/s/framer-motion-animate-in-view-gqcc8?file=/src/index:313-322 ==> in view fade in
// https://www.framer.com/motion/use-scroll/##scroll-offsets ==> in view fade in

const FadeInOut = ({ children, className, active, init = {}, enter = {}, exit = {}, ...props }) => {
  const variants = {
    init: {
      opacity: 0,
      y: 20,
      transition: { duration: 0 },
      ...init,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3 },
      ...enter,
    },
    exit: {
      opacity: 0,
      y: 0,
      ...exit,
    },
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  };

  const animationControls = useAnimationControls();

  const fadeIn = async () => {
    await animationControls.start('init'); //duration 0
    animationControls.start('enter');
  };
  const fadeOut = async () => {
    await animationControls.start('exit');
    animationControls.start('init');
  };

  useEffect(() => {
    active ? fadeIn() : fadeOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    animationControls.set('init');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={animationControls}
      variants={variants}
      className={className}
      {...props}>
      {typeof children === 'function' ? children(active) : children}
    </motion.div>
  );
};

export { FadeInOut };
