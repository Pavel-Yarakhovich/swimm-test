import React, { useContext, useMemo, useRef, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import cn from 'classnames';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useI18next } from 'gatsby-plugin-react-i18next';

import { PageContext } from '../context/pageState';
import { selectTranslation } from '../utils/selectTranslation';

import { FadeInOnScroll } from './FadeinOnScroll';
import AnimatedTextCharacter from './AnimatedTextCharacter';
import ButtonIcon from './ButtonIcon';
import { FadeInOut } from './FadeInOut';
import { ScrollIcon } from './ScrollIcon';

const scrollQuery = graphql`
  query introScroll {
    directus {
      Globals(filter: { key: { _eq: "scroll_intro" } }) {
        value {
          item {
            ... on DirectusData_intro_scroll_block {
              id
              image {
                id
                imageFile {
                  childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
                  }
                }
              }
              sort
              translations {
                languages_code {
                  code
                }
                title
                text
              }
            }
          }
        }
      }
    }
  }
`;

const VideoIntro = ({ children, data }) => {
  const scrollData = useStaticQuery(scrollQuery);
  const intro_scroll = scrollData?.directus?.Globals[0]?.value;

  const { language } = useI18next();

  const scrollContainer = useRef();

  const { setData } = useContext(PageContext);

  const exitVideo = () => {
    setData({ introFinished: true });
  };

  const [slideIndex, setSlideIndex] = useState(0);

  function useParallax(value, distance) {
    return useTransform(value, [1, 0], [0, distance]);
  }

  const { scrollYProgress } = useScroll({
    container: scrollContainer,
  });

  const scrollDistance = 200;
  const y = useParallax(scrollYProgress, scrollDistance);
  const bgImages = useMemo(
    () =>
      intro_scroll
        ? intro_scroll.map(({ item }) => item.image?.imageFile?.childImageSharp?.gatsbyImageData)?.slice(0, 4)
        : [],
    [intro_scroll]
  );

  const handleInView = (inView, index) => {
    if (inView) {
      setSlideIndex(index);
    }
  };

  return (
    <>
      <div className="overflow-hidden w-0 h-0">
        {/* preload Images */}
        {bgImages.map(
          (img, i) =>
            i < 3 &&
            img && (
              <GatsbyImage
                key={i}
                className="w-screen h-screen object-cover"
                image={img}
                alt="Intro scenic image of the zoo"></GatsbyImage>
            )
        )}
      </div>
      <div
        id="scroll-container"
        className="relative w-screen top-0 left-0 pointer-events-auto overflow-auto h-screen bg-green-map"
        ref={scrollContainer}>
        <div>
          {bgImages.map((img, i) => (
            <div
              key={img + i}
              className={cn('fixed overflow-hidden top-0 h-screen w-screen pointer-events-none', {
                'opacity-0': slideIndex < i,
                'opacity-1': slideIndex >= i,
              })}>
              <motion.div
                className="overflow-hidden"
                style={{
                  height: `calc(100% + ${scrollDistance}px)`,
                  marginTop: `-${(scrollDistance / (bgImages.length - 1)) * (bgImages.length - 1)}px`,
                  y,
                }}>
                <GatsbyImage
                  loading="eager"
                  className="w-full h-full object-cover"
                  image={img}
                  alt="Intro scenic image of the zoo"></GatsbyImage>
                <div className="absolute w-full h-full bg-black bg-opacity-40 top-0"></div>
              </motion.div>
            </div>
          ))}

          {intro_scroll[0] && (
            <FadeInOnScroll
              container={scrollContainer}
              refClassname=""
              slideIndex={0}
              handleInView={handleInView}>
              <div className="flex items-center justify-center  text-white flex-col w-full h-full px-4 pt-[20vh]   md:mx-auto md:w-1/2">
                <h1 className="text-xl font-title font-semibold md:text-3xl text-center leading-tight md:mb-28 mb-6">
                  <AnimatedTextCharacter
                    show={slideIndex === 0}
                    text={
                      selectTranslation(intro_scroll[0]?.item.translations, language)?.title
                    }></AnimatedTextCharacter>
                </h1>

                <FadeInOut
                  className="mt-5 flex flex-col items-center  mb-6"
                  active={slideIndex === 0}
                  init={{ y: 0 }}
                  enter={{ transition: { delay: 1, duration: 0.5 } }}>
                  <ScrollIcon className="md:rotate-180" />
                  <div className="mt-3 md:mt-6 text-center">{data.langData?.scroll_continue}</div>
                </FadeInOut>
              </div>
            </FadeInOnScroll>
          )}
          {intro_scroll[1] && (
            <FadeInOnScroll
              container={scrollContainer}
              slideIndex={1}
              handleInView={handleInView}>
              <div className="flex items-center text-center justify-center  text-white flex-col w-full h-full px-4  md:mx-auto md:w-1/2">
                <h1 className="text-xl font-title font-semibold  md:text-3xl leading-tight">
                  <AnimatedTextCharacter
                    show={slideIndex === 1}
                    text={
                      selectTranslation(intro_scroll[1]?.item.translations, language)?.title
                    }></AnimatedTextCharacter>
                </h1>
                <p className="font-title">
                  <AnimatedTextCharacter
                    stagger={0.003}
                    init={{ x: 5, y: 15 }}
                    show={slideIndex === 1}
                    text={
                      selectTranslation(intro_scroll[1]?.item.translations, language)?.text
                    }></AnimatedTextCharacter>
                </p>
              </div>
            </FadeInOnScroll>
          )}
          {intro_scroll[2] && (
            <FadeInOnScroll
              container={scrollContainer}
              slideIndex={2}
              handleInView={handleInView}>
              <div className="flex items-center text-center justify-center text-white flex-col w-full h-full px-4 md:mx-auto md:w-1/2">
                <h1 className="text-xl font-title font-semibold md:text-3xl leading-tight">
                  <AnimatedTextCharacter
                    show={slideIndex === 2}
                    text={
                      selectTranslation(intro_scroll[2]?.item.translations, language)?.title
                    }></AnimatedTextCharacter>
                </h1>
                <div className="font-title">
                  <AnimatedTextCharacter
                    stagger={0.003}
                    init={{ x: 5, y: 15 }}
                    show={slideIndex === 2}
                    text={
                      selectTranslation(intro_scroll[2]?.item.translations, language)?.text
                    }></AnimatedTextCharacter>
                  {intro_scroll.length === 3 && (
                    <FadeInOut
                      active={slideIndex === 2}
                      enter={{ transition: { delay: 1, duration: 0.5 } }}>
                      <div className="flex font-title flex-col items-center gap-3 mt-8">
                        <p>{data.langData?.click_continue}</p>
                        <ButtonIcon
                          variant="arrow"
                          onClick={exitVideo}></ButtonIcon>
                      </div>
                    </FadeInOut>
                  )}
                </div>
              </div>
            </FadeInOnScroll>
          )}
          {intro_scroll[3] && (
            <FadeInOnScroll
              container={scrollContainer}
              slideIndex={3}
              handleInView={handleInView}>
              <div className="flex items-center justify-center text-white flex-col w-full h-full px-4 md:mx-auto md:w-1/2">
                <h1 className="text-xl font-title font-semibold md:text-3xl leading-tight">
                  <AnimatedTextCharacter
                    show={slideIndex === 3}
                    text={
                      selectTranslation(intro_scroll[3]?.item.translations, language)?.title
                    }></AnimatedTextCharacter>
                </h1>
                <p>
                  <AnimatedTextCharacter
                    stagger={0.003}
                    init={{ x: 5, y: 15 }}
                    show={slideIndex === 3}
                    text={
                      selectTranslation(intro_scroll[3]?.item.translations, language)?.text
                    }></AnimatedTextCharacter>
                </p>
                <FadeInOut
                  active={slideIndex === 3}
                  enter={{ transition: { delay: 1, duration: 0.5 } }}>
                  <div className="flex font-title flex-col items-center gap-3 mt-8">
                    <p>{data.langData?.click_continue}</p>
                    <ButtonIcon
                      variant="arrow"
                      onClick={exitVideo}></ButtonIcon>
                  </div>
                </FadeInOut>
              </div>
            </FadeInOnScroll>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export { VideoIntro };
