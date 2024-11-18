variants = {
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
