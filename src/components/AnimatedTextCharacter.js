import React from 'react';
import { AnimatePresence, motion, useWillChange } from 'framer-motion';

const AnimatedTextCharacter = ({ show, text = '', stagger = 0.03, init = {} }) => {
  const willChange = useWillChange();
  const words = text?.trim().replace(/  +/g, '').replace(/\n/, ' <br> ')?.split(' ');

  const sentance = [];

  const container = {
    init: { opacity: 0 },
    enter: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger },
    }),
  };

  const child = {
    init: {
      opacity: 0,
      x: 5,
      y: 20,
      ...init,
      rotate: 20,
      transition: {
        duration: 0,
      },
    },
    enter: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  words?.forEach((word, i) => {
    let letters;
    if (word === '<br>') {
      letters = [word];
    } else {
      letters = Array.from(word.trim().replace(/  +/g, ''));
    }
    sentance[i] = { word, letters };
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          variants={container}
          style={{ willChange }}
          initial="init"
          animate="enter">
          {sentance.map(({ word, letters = [] }, i) =>
            letters[0] === '<br>' ? (
              <div key={word + i}></div>
            ) : (
              <span
                key={word + i}
                className="inline-block">
                &nbsp;
                {letters.map((letter, index) => (
                  <motion.span
                    variants={child}
                    className="inline-block"
                    initial="init"
                    animate="enter"
                    exit="exit"
                    style={{ willChange }}
                    key={index}
                    dangerouslySetInnerHTML={{
                      __html: letter === ' ' ? '\u00A0' : letter,
                    }}></motion.span>
                ))}
              </span>
            )
          )}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTextCharacter;
