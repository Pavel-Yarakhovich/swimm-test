// import { Billboard } from "@react-three/drei"
// Context issues : https://docs.pmnd.rs/react-three-fiber/advanced/gotchas
import { withPrefix } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import ClipSVG from '../images/zoo-H.svg';
import useMediaQuery from '../hooks/useMediaQuery';

export function GrowImage({ children, className, active = true, previewText, dataDepth, clicked, ...props }) {
  const vmax = window.innerWidth < window.innerHeight ? window.innerHeight : window.innerWidth;
  const isDesktop = useMediaQuery();
  const [radius, setRadius] = useState(85);
  const [isOpen, setOpen] = useState(false);
  const [openAnimationFinished, hasOpened] = useState(false);

  const timeoutid = useRef(null);

  const openOverlay = () => {
    if (!active) {
      return;
    }
    clicked(null, true);
    setOpen(true);
    setRadius(vmax);

    timeoutid.current = setTimeout(() => {
      hasOpened(true);
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (radius !== vmax) {
      setRadius(85);
    }
  };

  const closeOverlay = () => {
    setOpen(false);
    clicked(null, false);
    setRadius(85);
    hasOpened(false);
  };

  useEffect(() => {
    return clearTimeout(timeoutid.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!active) {
      closeOverlay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div
      className={cn('image-circle w-full h-full top-0 left-0 fixed z-[1000] pointer-events-none', className)}
      data-depth={!isOpen ? dataDepth : '0'}
      {...props}>
      <div
        className={cn('absolute top-0 bottom-0 left-0 right-0 m-auto cursor-pointer aspect-[0.8]')}
        style={{
          pointerEvents: isOpen || !active ? 'none' : 'auto',
          width: isDesktop ? '27.6vmin' : '40vmin',
          left: isDesktop ? 0 : '2rem',
          right: isDesktop ? 0 : 'auto',
        }}
        onClick={openOverlay}
        type="button">
        <div className="absolute top-0 left-0 w-full px-[2.2vmin] bg-pink-history h-full "></div>
        <div className="absolute top-full left-0 w-full px-[2.2vmin] bg-pink-history pb-[2.2vh]">{previewText}</div>
      </div>
      <ClipSVG />
      <div
        onMouseLeave={handleMouseLeave}
        className="top-0 left-0 w-full h-full"
        style={{
          pointerEvents: !isOpen || !active ? 'none' : 'auto',
          transition: isOpen ? `-webkit-mask 300ms ease-in-out` : `-webkit-mask 500ms `,
          marginLeft: !isDesktop && !isOpen && '-1.2vw',
          WebkitMask: `url(${withPrefix('/img/zoo-H.svg')}) ${
            isDesktop || isOpen ? '50%' : '1.6rem'
          } center  / cover no-repeat`,

          WebkitMaskSize:
            !isOpen && isDesktop
              ? '30% 30%'
              : !isOpen && !isDesktop
              ? '45% 45%'
              : radius === 100
              ? '40% 40%'
              : '500% 500%',
        }}
        type="button">
        <div
          className={`absolute top-0 bottom-0 m-auto transition-all ${
            !isOpen ? 'delay-300 duration-300' : 'duration-100'
          }`}
          style={{
            width: !isOpen && isDesktop ? '30%' : !isOpen && !isDesktop ? '45%' : '100%',
            right: isDesktop ? 0 : null,
            left: isDesktop || isOpen ? 0 : '2rem',
            height: !isOpen && isDesktop ? '30%' : !isOpen && !isDesktop ? '45%' : '100%',
          }}>
          {typeof children === 'function' ? children(isOpen, closeOverlay, openAnimationFinished) : children}
        </div>
      </div>
    </div>
  );
}
