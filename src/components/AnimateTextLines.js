import React from 'react';
import { AnimatePresence, motion, useWillChange } from 'framer-motion';

const AnimatedTextLines = ({ show, text }) => {
  const willChange = useWillChange();
  const lines =
    typeof text === 'string' || text instanceof String ? text.trim().replace(/  +/g, '')?.split(/\r?\n/) : [''];

  const container = {
    init: { opacity: 0 },
    enter: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.02 * i },
    }),
    exit: { opacity: 0 },
  };

  const child = {
    init: {
      opacity: 0,
      y: 5,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          style={{ willChange }}
          variants={container}
          initial="init"
          animate="enter"
          exit="exit">
          {lines.map((line, index) => (
            <motion.div
              style={{ willChange }}
              variants={child}
              initial="init"
              animate="enter"
              exit="exit"
              key={index}>
              {line}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTextLines;
