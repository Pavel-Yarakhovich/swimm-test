import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getAssetURL } from '../../utils/get-asset-url';
import { graphql, withPrefix } from 'gatsby';
import { useQuery, gql } from '@apollo/client';
import { PageContext } from '../../context/pageState';
import Logo from '../../images/logo.svg';
import ButtonIcon from '../../components/ButtonIcon.js';
import { audioFragment } from '../../fragments/audio.js';
import ClipSVG from '../../images/H-wide.svg';
import Audio from '../../components/AudioPlayer.js';
import ElasticModal from '../../components/ElasticModal.js';
import { useCanvasStore } from '../../context/canvasContext.js';
import { COLORS } from '../../const/colors.const';

const APOLLO_COLLECTION_QUERY = gql`
  ${audioFragment}
  query CollectionData($collectionSlug: String) {
    audio(filter: { slug: { _eq: $collectionSlug } }) {
      ...audioData
    }
  }
`;

export default function AudioPost({ slug }) {
  const { data } = useQuery(APOLLO_COLLECTION_QUERY, {
    variables: {
      collectionSlug: slug,
    },
  });
  const item = useMemo(() => data?.audio[0], [data]);

  const { setData } = useContext(PageContext);
  const [openModal, setOpenModal] = useState(false);
  const { completedAudios, setCanvasData } = useCanvasStore();
  useEffect(() => {
    setData({ themeColor: COLORS.DARK_GREEN, introFinished: true });
    setCanvasData({ completedAudios: [...completedAudios, slug] });
    setTimeout(() => {
      setOpenModal(true);
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ElasticModal
      bgClassName="z-10 fixed w-full h-screen"
      className="z-40 fixed w-full"
      isVisible={openModal}
      background={COLORS.GREEN}>
      <div className="audio-article pointer-events-auto grid grid-rows-[0px_auto_1fr] fixed bg-green flex-1 z-40 w-full h-full flex-col md:flex-row">
        <ClipSVG />
        <div className="w-full h-22 py-0 md:h-40 md:px-10 px-5font-sanstext-xs md:pt-10 md:pb-10 items-center justify-between flex z-10 ">
          <a
            href="/"
            className="block w-24 h-24 mx-auto md:m-0 md:w-28 md:h-28 self-end">
            <Logo
              className="w-full h-full object-contain  md:mt-0 mt-1"
              title="logo"
            />
          </a>
          <nav className="absolute right-5 top-6 md:right-10 md:top-12">
            <ButtonIcon
              invert
              variant="cross"
              className=" "
              to={'/'}></ButtonIcon>
          </nav>
        </div>
        <section className="h-full flex-1 flex flex-col md:flex-row-reverse">
          <div className="w-full md:h-full relative flex items-end justify-center">
            {item?.image && (
              <>
                <div className="w-full md:pr-6">
                  <img
                    style={{
                      aspectRatio: 1.12,
                      marginBottom: '-2px',
                      transition: 'clip-path 1s, -webkit-mask 1s',
                      mask: 'url(#clip-path) center center / cover',
                      WebkitMask: `url(${withPrefix('/img/H-wide.svg')}) center center / cover`,
                      WebkitMaskSize: '100% 100%',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                    src={getAssetURL(item.image.id) + `?fit=cover&quality=50`}
                    className="w-full h-full object-cover"
                    alt={item.image.description}></img>
                </div>
              </>
            )}
          </div>

          <div className="w-full flex-1 md:flex-auto flex flex-col md:px-10 px-8 pb-10  ">
            <div className="container font-title h-full flex flex-col justify-around md:justify-center">
              {item && (
                <>
                  <div>
                    <h1 className="text-lg font-semibold  md:text-2xl leading-tight mt-6">
                      {item.translations[0].title}
                    </h1>
                    {item.year && <div className="text-md md:text-lg md:mt-3 mb-6 md:mb-16">&#40;{item.year}&#41;</div>}
                  </div>
                  <Audio
                    invert
                    src={getAssetURL(item.audio.id)}
                    title={item.audio_title}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </ElasticModal>
  );
}

export const query = graphql`
  query {
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
