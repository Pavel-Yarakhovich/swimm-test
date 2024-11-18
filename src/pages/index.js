import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { graphql } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import Seo from '../components/Seo';
import { PageContext } from '../context/pageState';
import { VideoIntro } from '../components/VideoIntro';
import Logo from '../images/logo.svg';
import ButtonIcon from '../components/ButtonIcon';
import ElasticModal from '../components/ElasticModal.js';
import { useCanvasStore } from '../context/canvasContext';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import { useLangData } from '../hooks/getLangData';

import(
  /* webpackChunkName: "index", webpackPrefetch: true */
  '../styles/index.css'
);

const IndexPage = ({ data }) => {
  const { language, originalPath } = useI18next();
  const { locations, mapIndex, setCanvasData } = useCanvasStore();
  const {
    data: { introFinished, themeColor, previousPath },
    setData,
  } = useContext(PageContext);

  const {
    locales: { edges: allLangData },
    directus,
  } = data;

  const intro_scroll = (directus && directus?.Globals[0]?.value) || [];
  const langData = useLangData(language, allLangData);

  const [openModal, setOpenModal] = useState(
    previousPath === originalPath || previousPath === '/collection/[slug]/' ? false : true
  );

  const handlePageCallback = (index) => {
    setCanvasData({ mapIndex: index });
  };

  const handleIntro = () => {
    setData({ introFinished: true });
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(false);
    }, 200);
  }, []);

  return (
    <div className="w-full h-full ">
      <Seo title={'home'} />
      <ElasticModal
        bgClassName="elastic z-40 fixed w-full h-screen "
        isVisible={openModal}
        background={themeColor}
      />

      <div className="hidden md:block fixed bottom-10 right-10">
        <div className="flex ">
          <div className="flex items-center">
            <ButtonIcon
              variant="map"
              fill="#00DA9E"
              className="!w-7"
            />
            <span className="text-white text-md-big ml-3">{langData?.map.visited}</span>
          </div>
          <div className="flex items-center ml-6">
            <ButtonIcon
              variant="map"
              fill="#000000"
              className="!w-7"
            />
            <span className="text-white text-md-big ml-3">{langData?.map.explore}</span>
          </div>
        </div>
      </div>
      {Array.isArray(locations) && (
        <div className="md:hidden absolute bottom-0 pointer-events-auto w-full items-center flex flex-col pb-8 gap-3">
          <Carousel
            variant="under"
            buttons={true}
            startIndex={mapIndex}
            pageCallback={handlePageCallback}
            content={locations.map((mapLocation, i) => (
              <div className="flex flex-col items-center gap-3 pb-3 justify-end h-full flex-1">
                <h1
                  key={i}
                  className="text-xl font-semibold text-center leading-tight pb-2 px-8">
                  {mapLocation.name}
                </h1>
                <Button
                  variant="green-invert"
                  to={`/${mapLocation.type === 'audio' ? 'audio' : 'experience'}/${mapLocation.slug}`}>
                  {mapLocation.type === 'audio' ? langData?.nav?.play_audio : langData?.nav?.start}
                </Button>
              </div>
            ))}></Carousel>
        </div>
      )}
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            className="h-full w-full fixed z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="absolute top-0 z-50 h-20 md:h-40 font-sans text-xs md:pt-10 px-10 md:pb-10 w-full-vw flex justify-between items-center">
              <div className="w-16 h-16 md:w-28 md:h-28">
                <Logo
                  className="w-full h-full object-contain invert"
                  title="logo"
                />
              </div>
              <ButtonIcon
                variant="cross"
                className="!absolute top-6 right-5 md:top-0 md:right-0 md:!relative "
                onClick={handleIntro}></ButtonIcon>
            </div>

            <VideoIntro data={{ intro_scroll, langData }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndexPage;
export const query = graphql`
  query Homepage {
    locales: allLocale {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
