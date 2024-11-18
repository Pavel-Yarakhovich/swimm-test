import React, { useContext, useEffect, useMemo } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import { useQuery, gql } from '@apollo/client';

import { getAssetURL } from '../../utils/get-asset-url';
import { PageContext } from '../../context/pageState';
import Logo from '../../images/logo.svg';
import ButtonIcon from '../../components/ButtonIcon.js';
import { collectionApolloFragment } from '../../fragments/collection';
import useMediaQuery from '../../hooks/useMediaQuery.js';
import Seo from '../../components/Seo';
import { selectTranslation } from '../../utils/selectTranslation';
import { useLangData } from '../../hooks/getLangData';

const APOLLO_COLLECTION_QUERY = gql`
  ${collectionApolloFragment}
  query CollectionData($collectionSlug: String) {
    collection(filter: { slug: { _eq: $collectionSlug } }) {
      ...collectionData
    }
  }
`;

export default function CollectionPost({ data: pageData, slug }) {
  const { language } = useI18next();
  const { data } = useQuery(APOLLO_COLLECTION_QUERY, {
    variables: {
      collectionSlug: slug,
    },
  });
  const {
    locales: { edges: allLangData },
  } = pageData;
  const item = useMemo(() => data?.collection[0], [data]);
  const {
    data: { themeColor },
    setData,
  } = useContext(PageContext);
  const langData = useLangData(language, allLangData);

  useEffect(() => {
    setData({ introFinished: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const category = useMemo(
    () =>
      data?.collection[0].categories.filter((c, i, a) => a.length === 1 || c.categories_key.key !== 'featured')[0]
        ?.categories_key || { color: themeColor },
    [data, themeColor]
  );
  const categoryTranslations = selectTranslation(category.translations, language);

  const isDesktop = useMediaQuery();

  return (
    <div
      className="pointer-events-auto fixed flex-1 z-40 w-full h-full flex-col md:flex-row"
      style={{ backgroundColor: category.color }}>
      <Seo title={`Collection | ${slug}`} />
      <section className="h-full flex-1 grid grid-cols-1 md:grid-cols-2 md:grid-rows-[auto_1fr] overflow-auto">
        <div className="w-full h-full md:row-span-2 row-start-1 col-[1/1] relative">
          {item?.image && (
            <>
              <img
                src={getAssetURL(item.image.id) + `?fit=cover&quality=50`}
                className="w-full h-full object-cover"
                alt={item.image.description}></img>

              <div className="md:hidden bg-black bg-opacity-20 w-full h-full absolute top-0 left-0"></div>
            </>
          )}
        </div>
        <div className="w-full h-24 md:h-40 md:px-10 px-8 font-sans text-xs pt-10 pb-10 row-start-1 col-[1/1] md:col-[2/3] items-center flex z-10 relative">
          <div className="uppercase hidden md:block">
            {item && categoryTranslations && `${langData?.nav.collections} - ${categoryTranslations?.name}`}
          </div>
          <a
            href="/"
            className="block md:hidden w-28 h-28 mx-auto">
            <Logo
              className="w-full h-full object-contain invert "
              title="logo"
            />
          </a>
          <nav>
            <ButtonIcon
              variant="cross"
              invert={isDesktop}
              className="top-8 md:top-12 right-8 md:right-10 !absolute"
              to={'/'}></ButtonIcon>
          </nav>
        </div>
        <div className="w-full  flex flex-col md:px-10 px-8 md:col-start-2 pb-10  ">
          <div className="container h-full">
            {item && (
              <>
                <div className="md:hidden uppercase text-sm mt-6 mb-7">
                  {categoryTranslations && `${langData?.nav.collections} - ${categoryTranslations?.name}`}
                </div>
                <h1 className="text-lg md:text-2xl font-sans leading-tight">{item.translations[0].title}</h1>
                {item.year && <div className="text-md md:text-lg mt-3">&#40;{item.year}&#41;</div>}

                <p
                  className="mt-6 md:mt-12 text-md"
                  dangerouslySetInnerHTML={{
                    __html: item.translations[0].content,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
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
