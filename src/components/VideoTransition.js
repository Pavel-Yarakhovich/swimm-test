import { withPrefix } from 'gatsby';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Helmet from 'react-helmet';
import cn from 'classnames';

import { PageContext } from '../context/pageState';
import '../styles/react-player.css';
import { STATE } from '../const/state.const';

const VideoTransition = React.memo(({ location, activePaths = [], isLoaded }) => {
  //Destructuring props to avoid garbage this.props... in return statement
  const fadeOut = useRef();
  const fadeIn = useRef();

  // const [state, setState] = useState(null);
  const [firstPlay, setFirstPlay] = useState(false);
  const [preloaderReady, setPreloaderState] = useState(true);
  const currentlocation = useRef();

  const {
    data: { pathName, videoState: state },
    setData,
  } = useContext(PageContext);

  const prevPath = useRef(pathName || location.pathname);
  const navigatingActiveUrl = activePaths.some((item) => pathName?.includes(item) || prevPath.current.includes(item));

  const handlePlayIn = () => {
    setData({ videoState: STATE.ENTERING });
    if (!firstPlay) setFirstPlay(true);
  };

  const handleEndedIn = () => {
    fadeOut.current.currentTime = 0;
    setData({ videoState: STATE.ENTERED });
  };

  const handlePlayOut = () => {
    setData({ videoState: STATE.EXITING });
  };

  const handleEndedOut = () => {
    fadeIn.current.currentTime = 0;
    setData({ videoState: STATE.EXITED });
  };

  useEffect(() => {
    if (!preloaderReady) {
      setData({ videoState: STATE.ENTERING });
      setPreloaderState(true);
    }
  }, [preloaderReady]);

  useEffect(() => {
    if (
      // typeof currentlocation.current !== 'undefined' &&
      currentlocation.current !== pathName &&
      preloaderReady &&
      state !== STATE.EXITING
    ) {
      // exit transition on path change
      currentlocation.current = pathName;
      setData({ videoState: STATE.EXITING });
    } else if (preloaderReady && state !== STATE.EXITING) {
      // No exit transition on inital load
      currentlocation.current = pathName;
    }
  }, [pathName, preloaderReady, state]);

  useEffect(() => {
    if (state === STATE.ENTERING) {
      prevPath.current = pathName;
    }

    if (state === STATE.EXITED) {
      setData({ videoState: STATE.ENTERING });
    }
    if (state === STATE.DELAYED_EXIT) {
      setTimeout(() => {
        setData({ videoState: STATE.ENTERING });
      }, 100);
    }
  }, [state, pathName]);

  useEffect(() => {
    if (state === STATE.ENTERING && !fadeIn.current?.playing && isLoaded) {
      fadeIn.current?.play();
    }
    if (state === STATE.DELAYED_EXIT || state === STATE.EXITING) {
      fadeOut.current?.play();
    }
  }, [state, isLoaded]);

  return (
    //Using TransitionGroup and ReactTransition which are both //coming from
    // 'react-transition-group' and are required for transitions to work
    <>
      <Helmet>
        <link
          rel="preload"
          as="video"
          href="/videos/fogtransition_out.mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/fogtransition_in.mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/fogtransition_out.webm"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/fogtransition_in.webm"
        />
      </Helmet>
      <div
        className={`w-full h-full absolute bg-white top-0 left-0 pointer-events-none ${
          (state === STATE.EXITED || state === STATE.DELAYED_EXIT) && navigatingActiveUrl ? 'z-50' : '-z-10'
        }`}></div>

      <div className="mix-blend-screen absolute top-0 left-0 w-full h-full pointer-events-none z-50">
        <div
          className={cn('overlay-player absolute top-0 left-0 w-full h-full', {
            'opacity-0': fadeIn.current?.playing || state === STATE.ENTERED || !navigatingActiveUrl,
          })}>
          <video
            ref={fadeOut}
            className={cn('w-full h-full')}
            width="100%"
            height="100%"
            webkit-playsinline="true"
            x5-playsinline="true"
            playsInline
            muted
            preload="auto"
            loop={false}
            onEnded={handleEndedOut}
            onPlay={handlePlayOut}>
            <source
              src={withPrefix('/videos/fogtransition_out.webm')}
              type="video/webm"
            />
            <source
              src={withPrefix('/videos/fogtransition_out.mp4')}
              type="video/mp4"
            />
          </video>
        </div>

        <div
          className={cn('overlay-player absolute top-0 left-0 w-full h-full', {
            'opacity-0': !navigatingActiveUrl || state === STATE.EXITING || state === STATE.EXITED,
          })}>
          <video
            className={cn('w-full h-full')}
            ref={fadeIn}
            width="100%"
            height="100%"
            webkit-playsinline="true"
            x5-playsinline="true"
            playsInline
            muted
            loop={false}
            preload="auto"
            onEnded={handleEndedIn}
            onPlay={handlePlayIn}>
            <source
              src={withPrefix('/videos/fogtransition_in.webm')}
              type="video/webm"
            />
            <source
              src={withPrefix('/videos/fogtransition_in.mp4')}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  );
});

export { VideoTransition };
