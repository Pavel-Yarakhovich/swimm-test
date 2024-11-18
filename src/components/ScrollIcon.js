import * as React from 'react';
import '../styles/scroll-animation.css';

export const ScrollIcon = ({ className = '' }) => {
  return (
    <>
      <div className={`scroll-container md:rotate-180 ${className}`}>
        <div className="ball"></div>
        <div className="scroller"></div>
        <div className="scroller-grow"></div>
      </div>
    </>
  );
};
