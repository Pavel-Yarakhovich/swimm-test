import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, gql } from '@apollo/client';
import cn from 'classnames';

import useHorizontalScroll from '../hooks/useHorizontalScroll';
import useMediaQuery from '../hooks/useMediaQuery';
import { collectionApolloFragment } from '../fragments/collection';
import { getAssetURL } from '../utils/get-asset-url';
import { useCategories } from '../hooks/categories';
import { PageContext } from '../context/pageState';
import { selectTranslation } from '../utils/selectTranslation';

import ButtonIcon from './ButtonIcon';
import ButtonLink from './ButtonLink';
import ElasticModal from './ElasticModal';

const APOLLO_COLLECTION_QUERY = gql`
  ${collectionApolloFragment}
  query CollectionData {
    collection {
      ...collectionData
    }
  }
`;

const Gallery = (props) => {
  const { language, i18n } = useI18next();
  const langData = (i18n.options?.resources[language] && i18n.options?.resources[language]['common']) || {};

  const { isVisible, openCollection } = props;
  const filterList = useRef();
  const collectionList = useRef();
  const isDesktop = useMediaQuery();
  const { data } = useQuery(APOLLO_COLLECTION_QUERY);
  const categories = useCategories();
  const [selectedTopic, setTopic] = useState('featured');
  useHorizontalScroll({ ref: filterList, touchSpeedDivider: isDesktop ? 3 : 2 });
  const [resetScroll, scrollTo, scrollWidth, currentScrollPosition] = useHorizontalScroll({
    ref: collectionList,
    isDisabled: !isDesktop,
  });
  const { setData } = useContext(PageContext);

  const currentCategory = useMemo(
    () =>
      !selectedTopic ? categories.find((c) => c.key === 'featured') : categories.find((c) => c.key === selectedTopic),
    [selectedTopic, categories]
  );

  const filterCollection = useMemo(
    () =>
      data?.collection &&
      data.collection.filter((item) => item.categories.some((cat) => cat.categories_key.key === selectedTopic)),
    [data, selectedTopic]
  );

  const color = currentCategory?.color;

  const handlePrev = () => {
    scrollTo({ direction: 'prev' });
  };

  const handleNext = () => {
    scrollTo({ direction: 'next' });
  };

  const handleClose = () => {
    openCollection(false);
  };

  useEffect(() => {
    setTopic('featured');
  }, [isVisible, setTopic]);

  useEffect(() => {
    setData({ themeColor: currentCategory?.color });
  }, [currentCategory, isVisible, setData]);

  useEffect(() => {
    resetScroll();
  }, [selectedTopic]);

  return (
    <>
      <ElasticModal
        bgClassName="z-10 fixed w-full h-screen "
        className="z-40 fixed pt-28 md:pt-40 w-full  "
        isVisible={isVisible}
        background={color}>
        <div
          className="flex-1 flex flex-col h-full"
          style={{
            pointerEvents: isVisible ? 'auto' : 'none',
            visibility: isVisible ? 'visible' : 'hidden',
          }}>
          <ButtonIcon
            invert
            variant="cross"
            className={cn('top-6 !w-10 !h-10 md:!w-13 md:!h-13 md:top-[3.45rem] right-5 md:right-10 !absolute', {
              'pointer-events-auto': isVisible,
              'pointer-events-none': !isVisible,
            })}
            onClick={handleClose}></ButtonIcon>
          <ButtonIcon
            invert={true}
            className={cn(
              '!absolute bottom-7 flex-shrink-0 left-10 transition-opacity -rotate-90 z-10 hidden md:flex',
              {
                'pointer-events-none opacity-0': currentScrollPosition === 0,
              }
            )}
            noRotate={true}
            onClick={handlePrev}
            variant="arrow"
          />
          <ButtonIcon
            invert={true}
            className={cn(
              '!absolute bottom-7 flex-shrink-0 right-10 transition-opacity z-10 rotate-90 hidden md:flex',
              {
                'pointer-events-none opacity-0': currentScrollPosition === scrollWidth,
              }
            )}
            noRotate={true}
            onClick={handleNext}
            variant="arrow"
          />
          <ol
            className="text-black md:pl-6 text-lg md:text-xl flex overflow-x-auto [counter-reset:filter] list-none hide-scrollbar flex-shrink-0"
            ref={filterList}>
            {categories &&
              categories.map((category, index) => {
                if (!isDesktop || category.key === 'featured') {
                  return <li key={index}></li>;
                }

                const handleSetTopic = () => {
                  setTopic(category.key);
                };

                return (
                  <li
                    className="pr-[4vw] md:pr-12 mr-auto flex-shrink-0"
                    key={index}>
                    <ButtonLink
                      className={`ml-4 font-light uppercase md:ml-6 flex flex-col cursor-pointer [counter-increment:filter] before:[content:'0'_counters(filter,'.')]  before:text-[0.4em]`}
                      style={{
                        fontWeight: currentCategory.key === category.key ? '600' : '300',
                      }}
                      onClick={handleSetTopic}>
                      {selectTranslation(category.translations, language)?.name}
                    </ButtonLink>
                  </li>
                );
              })}
          </ol>

          <div className="md:flex-1 flex-col flex overflow-auto">
            <h2 className=" mx-4 md:mx-12 md:mr-0 uppercase border-b border-black mt-8">{currentCategory?.name}</h2>

            <ul
              className="md:flex-1 px-4 md:px-12 pb-12 md:pb-12 md:whitespace-nowrap flex flex-col md:flex-row py-10 gap-6 hide-scrollbar overflow-auto "
              ref={collectionList}>
              <AnimatePresence>
                {filterCollection &&
                  filterCollection.map((item) => (
                    <motion.li
                      key={item.slug}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full md:w-auto  flex flex-row flex-shrink-0 ">
                      <ButtonLink
                        to={'/collection/' + item.slug}
                        className="h-full w-full flex flex-col">
                        <div className=" flex-1 h-3/4">
                          <motion.img
                            alt={item.image.description || 'zoo herritage art collection item'}
                            src={getAssetURL(item.image.id) + `?fit=cover&quality=50`}
                            className="h-full min-w-full aspect-square object-cover"
                          />
                        </div>
                        <div className="flex-auto">
                          <h3 className="ml-3 text-md-big font-semibold mt-4">
                            {item.translations[0].title}
                            {item.year && <> &#40;{item.year}&#41;</>}
                          </h3>
                          <div className="uppercase ml-3 mt-1">&#8594; {langData?.gallery?.readmore}</div>
                        </div>
                      </ButtonLink>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </ElasticModal>
    </>
  );
};

export default Gallery;
