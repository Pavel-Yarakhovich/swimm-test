import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import gsap from 'gsap';

import { PageContext } from '../context/pageState';

const Parallax = ({ children, depth, className, getContainerElem, getParentElem }) => {
  const pageState = useContext(PageContext);
  let [node, setNode] = useState(false);
  const imgLoaded = (e) => {
    setNode(e.target);
  };
  const setParallax = () => {
    const container = getParentElem();
    if (container && node && pageState.data.scrollAnimator && pageState.data.scrollAnimator.timelines) {
      const containerHeight = getContainerElem().offsetHeight;
      const movement = -(containerHeight * depth);
      const tl = pageState.data.scrollAnimator.timelines['parallax'];
      let timing = '<';
      tl.add(gsap.to(node, { y: movement, ease: 'none', duration: 1 }), `${timing}`);
    }
  };
  useEffect(() => {
    if (pageState.data.scrollAnimator) setParallax();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState.data.scrollAnimator, node]);

  return (
    <div
      onLoad={imgLoaded}
      className={className}>
      {children}
    </div>
  );
};

export default Parallax;
