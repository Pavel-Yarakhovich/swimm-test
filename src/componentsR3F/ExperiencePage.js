import React, { useMemo } from 'react';
import ReactPlayer from 'react-player';
import cn from 'classnames';

import ButtonIcon from '../components/ButtonIcon';
import useMediaQuery from '../hooks/useMediaQuery';
import Audio from '../components/AudioPlayer';
import { selectTranslation } from '../utils/selectTranslation';
import { getAssetURL } from '../utils/get-asset-url';
import PlayBtn from '../images/play.svg';
import Carousel from '../components/Carousel';

export function ExperiencePage({ data, isOpen, currentLang, closeOverlay, resetScroll }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const images = useMemo(() => {
    let images = [];
    data.gallery.forEach((img, i) => {
      images[i] = {
        src: getAssetURL(img.directus_files_id.id),
        alt: img.directus_files_id?.description,
      };
    });
    return images;
  }, [data]);

  const handleClick = () => {
    resetScroll();
    closeOverlay();
  };

  return (
    <>
      <ButtonIcon
        invert={isDesktop}
        className={cn('!absolute top-6 flex-shrink-0 right-6 transition-opacity z-10', {
          'opacity-0': !isOpen,
        })}
        onClick={handleClick}
        variant="cross"
      />

      <div
        style={{
          width: !isOpen || !isDesktop ? '100%' : '50vw',
          height: !isOpen || isDesktop ? '100%' : '60vh',
        }}
        className="h-full flex-shrink-0 transition-[width,height] duration-300 delay-100">
        {images.length === 1 && (
          <img
            src={images[0].src}
            alt={images[0].alt || 'History image'}
            className="h-full object-cover w-full shrink-0"
          />
        )}
        {images.length > 1 && (
          <Carousel
            className="h-full object-cover w-full overflow-hidden"
            images={images}
            invert={true}
            disable={!isOpen}
          />
        )}
      </div>

      <div
        className="p-8 md:p-18 md:pt-22 md:h-full flex flex-col"
        style={{ width: isDesktop ? '40vw' : 'auto' }}>
        <div className="md:flex-1">
          <div className="uppercase">{data.langData?.experience.history}</div>
          {data.translations !== undefined && (
            <h2
              className="text-lg  font-semibold md:text-2xl mt-4 md:mt-8 leading-tight"
              dangerouslySetInnerHTML={{
                __html: data.translations?.detail_subtitle?.replace(/\n/g, '<br />'),
              }}></h2>
          )}
          {data.year && <div className="text-md md:text-lg mt-4 md:mt-8">&#40;{data.year} &#41;</div>}
        </div>

        <div
          className="flex-1 flex flex-col md:justify-center  mt-8 md:mt-0 wysiwyg"
          dangerouslySetInnerHTML={{
            __html: data.translations?.detail_text,
          }}></div>
      </div>
      {data?.content &&
        data.content.map((contentBlock, i) =>
          contentBlock.collection === 'image' ? (
            <figure
              className="pr-9 py-8 md:px-9 md:py-36 md:aspect-[0.7] w-full md:w-auto md:h-full  flex flex-col"
              key={i}>
              <figcaption className="my-4 px-8 italic">
                {selectTranslation(contentBlock.item.translations, currentLang)?.caption}
              </figcaption>
              <img
                className="w-full object-cover h-full object-center"
                src={getAssetURL(contentBlock.item.image?.id)}
                alt={contentBlock.item.image?.description || 'history image'}
              />
            </figure>
          ) : contentBlock.collection === 'image_landscape' ? (
            <figure
              className="md:pb-0 w-full md:w-auto h-full flex flex-col justify-end pr-9 py-8"
              key={i}>
              <figcaption className="my-4 px-8 italic">
                {selectTranslation(contentBlock.item.translations, currentLang)?.caption}
              </figcaption>
              <img
                className="w-full object-cover h-full object-center"
                src={getAssetURL(contentBlock.item.image?.id)}
                alt={contentBlock.item.image?.description || 'history image'}
              />
            </figure>
          ) : contentBlock.collection === 'audio_text' || contentBlock.collection === 'audiofile' ? (
            <div
              className="md:w-[40rem] px-9 py-8 md:py-36 md:h-full flex flex-col justify-between"
              key={i}>
              <Audio
                className="w-full "
                style={{
                  paddingBottom: contentBlock.collection === 'audio_text' ? '2rem' : 0,
                }}
                invert
                src={getAssetURL(contentBlock.item.audio?.id)}
                title={selectTranslation(contentBlock.item.translations, currentLang)?.audio_title}
              />
              {contentBlock.collection === 'audio_text' && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectTranslation(contentBlock.item.translations, currentLang)?.text,
                  }}
                />
              )}
            </div>
          ) : contentBlock.collection === 'video' ? (
            <div
              className="w-full md:w-auto md:h-full md:pb-0 flex flex-col   "
              key={i}>
              <figure className="h-full w-full flex flex-col justify-end px-9 py-8 md:pb-0">
                <div
                  className="md:px-4 pt-2"
                  dangerouslySetInnerHTML={{
                    __html: selectTranslation(contentBlock.item.translations, currentLang)?.text,
                  }}
                />
                <figcaption className="text-md-big font-semibold md:px-4 my-4">
                  {selectTranslation(contentBlock.item.translations, currentLang)?.video_caption}
                </figcaption>
                <div className="md:h-1/2 md:mb-36 ">
                  <div className="aspect-video w-full md:w-auto md:h-full">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      controls
                      config={{
                        file: {
                          attributes: { crossOrigin: 'anonymous' },
                          ...contentBlock.item.translations.map((track, i) => ({
                            kind: 'subtitles',
                            src: getAssetURL(track?.video_subtitles?.id),
                            srcLang: track?.languages_code.code,
                            default: track?.languages_code.code === currentLang,
                          })),
                        },
                      }}
                      light={contentBlock.item.video_cover?.id ? getAssetURL(contentBlock.item.video_cover?.id) : false}
                      playIcon={
                        <div className="bg-slate-500 bg-opacity-40 w-full h-full flex items-center justify-center">
                          <PlayBtn />
                        </div>
                      }
                      url={getAssetURL(selectTranslation(contentBlock.item.translations, currentLang)?.video?.id)}
                    />
                  </div>
                </div>
              </figure>
            </div>
          ) : contentBlock.collection === 'text' ? (
            <div
              className="wysiwyg md:w-[40rem] px-9 py-8 md:py-36 md:h-full flex flex-col justify-end"
              key={i}>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectTranslation(contentBlock.item.translations, currentLang)?.text,
                }}
              />
            </div>
          ) : null
        )}
    </>
  );
}
