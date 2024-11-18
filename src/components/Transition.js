import { useI18next } from 'gatsby-plugin-react-i18next';
import React, { useEffect, useMemo, useRef } from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

import { useCanvasStore } from '../context/canvasContext';

//This variable will be responsible for our animation duration
const Transition = ({ children, className, activePaths = [] }) => {
  const { originalPath } = useI18next();
  const { setCanvasData } = useCanvasStore();
  const prevPath = useRef(originalPath);
  const navigatingActiveUrl = useMemo(
    () => activePaths.some((item) => originalPath.includes(item) || prevPath.current.includes(item)),
    [originalPath, activePaths]
  );
  const timeout = navigatingActiveUrl ? 1200 : originalPath === '/' || originalPath === '/audio/[slug]/' ? 300 : 0;
  const overlayDelay = navigatingActiveUrl ? 1000 : originalPath === '/' || originalPath === '/audio/[slug]/' ? 300 : 0;

  const defaultStyle = {
    transition: `opacity ${timeout}ms ease-in-out ${overlayDelay}ms, filter ${timeout}ms linear ${overlayDelay}ms`,
  };

  const transitionContent = {
    entering: {
      opacity: 0,
    },
    entered: {
      opacity: 1,
      transition: `opacity ${timeout}ms ease-in-out, filter ${timeout}ms linear`,
    },
    exiting: {
      opacity: 0,
    },
    exited: { opacity: 0 },
  };

  const statusCallBack = (status) => {
    if (status === 'entered' && prevPath.current !== originalPath) {
      prevPath.current = originalPath;
    }
  };

  useEffect(() => {
    if (originalPath) {
      setCanvasData({ navigatingActiveUrl });
    }
  }, [originalPath, setCanvasData, navigatingActiveUrl]);

  return (
    //Using TransitionGroup and ReactTransition which are both //coming from
    // 'react-transition-group' and are required for transitions to work
    <>
      <TransitionGroup className={`grid ${className || ''}`}>
        <ReactTransition
          onExiting={() => {
            if (prevPath.current !== originalPath) prevPath.current = originalPath;
          }}
          //the key is necessary here because our ReactTransition needs to know when pages are entering/exiting the DOM
          key={originalPath}
          timeout={{
            enter: timeout,
            exit: timeout + overlayDelay,
          }}>
          {
            //Application of the styles depending on the status of page(entering, exiting, entered) in the DOM
            (status) => {
              statusCallBack(status, originalPath);
              return (
                <>
                  <div
                    className={`col-[1/1] row-[1/1] ${status}`}
                    style={{
                      ...defaultStyle,
                      ...transitionContent[status],
                    }}>
                    {children}
                  </div>
                </>
              );
            }
          }
        </ReactTransition>
      </TransitionGroup>
    </>
  );
};

export default Transition;
