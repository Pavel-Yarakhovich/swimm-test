import * as React from 'react';
import { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
// import { Leva } from 'leva';
import { navigate } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { CSSTransition } from 'react-transition-group';

import NavBar from '../components/Navigation';
import { PageContext } from '../context/pageState';
import Transition from '../components/Transition';
import { FiberScene } from '../componentsR3F/Scene';
import '../styles/index.scss';
import { VideoTransition } from '../components/VideoTransition';
import Gallery from '../components/Gallery';
import { useCustomCss } from '../hooks/customCss';
import { useOriginalPath } from '../hooks/useOriginalPath';
import { useCanvasStore } from '../context/canvasContext';
import Loader from '../components/Loader';

const Layout = ({ location, children, pageContext, isNotFound }) => {
  useOriginalPath(location);
  const customCSS = useCustomCss();
  const [connectOpen, toggleConnect] = useState(0);
  const [collectionVisible, openCollection] = useState(0);
  const { changeLanguage } = useI18next();
  const { setCanvasData, isLoaded } = useCanvasStore();

  const {
    data: { themeColor },
  } = useContext(PageContext);

  React.useEffect(() => {
    if (location.pathname.includes('/en/')) {
      navigate(location.pathname.replace('/en/', '/'));
      changeLanguage('en');
      setCanvasData({ i18: { language: 'en' } });
    }
  }, []);

  return (
    <>
      {/* <div className="h-full scollbar" data-is-root-path={isRootPath}> */}
      <Helmet>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <style>{customCSS}</style>
      </Helmet>
      {/* <Leva hidden={process.env.NODE_ENV !== 'development'} /> */}
      <div
        className="z-10 h-full"
        style={{ backgroundColor: themeColor }}>
        <NavBar
          toggleConnect={toggleConnect}
          connectOpen={connectOpen}
          openCollection={openCollection}
          collectionVisible={collectionVisible}
          location={location}
        />

        <Gallery
          isVisible={collectionVisible}
          openCollection={openCollection}
        />

        <main className="h-full w-full relative">
          {!isNotFound && (
            <div className="canvas-container absolute w-full h-full">
              <FiberScene
                className="w-full h-full hide-scrollbar"
                location={location}
                context={pageContext}
                isNotFound={isNotFound}></FiberScene>
            </div>
          )}

          <Transition
            location={location}
            className="pointer-events-none "
            activePaths={['experience/']}>
            <div className="page-UI w-full h-full-vh z-20 ">{children}</div>
          </Transition>
        </main>
      </div>

      {/* Only visible on experinces */}
      <CSSTransition
        in={location.pathname.includes('experience') && !isLoaded}
        timeout={2000}
        classNames="fade"
        unmountOnExit>
        <Loader />
      </CSSTransition>

      <VideoTransition
        location={location}
        isLoaded={isLoaded}
        activePaths={['experience/']}></VideoTransition>
    </>
  );
};

export default Layout;
