import React from 'react';

import ButtonIcon from '../components/ButtonIcon';
import VerticalScroll from '../components/VerticalScroll';
import HorizontalScroll from '../components/HorizontalScroll';
import useMediaQuery from '../hooks/useMediaQuery';

import { ExperiencePage } from './ExperiencePage';
import { ScrollVisible } from './ScrollVisible';
import { GrowImage } from './GrowImage';

export const Stop = ({ i, start, end, toggleOverlay, overlayIsOpen, handleRef, page, langData, currentLang }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleHide = () => {
    setTimeout(() => {
      toggleOverlay(null, false);
    }, 500);
  };

  return (
    <ScrollVisible
      className="h-full w-full absolute bg-gray-800 bg-opacity-50"
      config={{
        start,
        end,
      }}
      stopInView={true}
      style={{
        zIndex: overlayIsOpen ? 10 : null,
      }}
      hideCallback={handleHide}>
      {(isVisble) => (
        <>
          <div
            ref={(ref) => handleRef(ref, i)}
            className={`w-full h-full flex items-center ${!isVisble ? 'pointer-events-none' : ''}`}>
            <div
              data-depth="0.15"
              className="h-full !hidden md:!flex flex-col justify-center ml-12 text-white w-4/12 text-center">
              <h1 className="text-xl font-semibold md:text-2xl leading-tight font-title">{page.translations?.title}</h1>
              <p className="text-md-big mt-3">{page.translations?.preview_text}</p>
            </div>
            <GrowImage
              active={isVisble}
              dataDepth={isDesktop ? '0.4' : null}
              clicked={(e, isActive) => {
                toggleOverlay(e, isActive, i);
              }}
              previewText={
                <div className="">
                  <h2 className="text-xs font-title mb-1 uppercase ">{langData?.experience.history}</h2>
                  <h1 className="leading-[1] font-title font-semibold md:leading-[1.2] md:text-lg ">
                    {langData?.experience.explore_more}
                  </h1>
                </div>
              }>
              {(isOpen, closeOverlay, hasOpened) => {
                if (isDesktop) {
                  return (
                    <HorizontalScroll
                      isDisabled={!isOpen}
                      className="h-full min-w-full bg-pink-history"
                      containerClass={`${hasOpened ? 'w-max' : 'w-full'} transition-all `}>
                      {(resetScroll, scrollTo) => {
                        const handlePrev = () => {
                          scrollTo({ direction: 'prev' });
                        };

                        const handleNext = () => {
                          scrollTo({ direction: 'next' });
                        };

                        return (
                          <>
                            <ExperiencePage
                              isOpen={isOpen}
                              data={{ ...page, langData }}
                              resetScroll={resetScroll}
                              closeOverlay={closeOverlay}
                              currentLang={currentLang}
                            />
                            {isOpen && (
                              <ButtonIcon
                                invert={true}
                                className="!absolute bottom-6 flex-shrink-0 right-24 transition-opacity z-10 -rotate-90 hidden md:flex"
                                noRotate={true}
                                onClick={handlePrev}
                                variant="arrow"
                              />
                            )}
                            {isOpen && (
                              <ButtonIcon
                                invert={true}
                                className="!absolute bottom-6 flex-shrink-0 right-6 transition-opacity z-10 rotate-90 hidden md:flex"
                                noRotate={true}
                                onClick={handleNext}
                                variant="arrow"
                              />
                            )}
                          </>
                        );
                      }}
                    </HorizontalScroll>
                  );
                }

                return (
                  <VerticalScroll className="bg-pink-history h-full">
                    {(resetScroll) => (
                      <ExperiencePage
                        isOpen={isOpen}
                        data={{ ...page, langData }}
                        resetScroll={resetScroll}
                        closeOverlay={closeOverlay}
                        currentLang={currentLang}
                      />
                    )}
                  </VerticalScroll>
                );
              }}
            </GrowImage>
          </div>
        </>
      )}
    </ScrollVisible>
  );
};
