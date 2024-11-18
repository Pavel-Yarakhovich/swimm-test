import * as React from 'react';
import { graphql } from 'gatsby';
import { useEffect, useRef, useContext } from 'react';
import { Link, withPrefix } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';

import Seo from '../components/Seo';
import '../styles/index.css';
import { PageContext } from '../context/pageState';
import { useLangData } from '../hooks/getLangData';

const ErrorPage = ({ data }) => {
  const container = useRef(null);
  const { setData } = useContext(PageContext);
  const { language } = useI18next();
  const {
    locales: { edges: allLangData },
  } = data;
  const langData = useLangData(language, allLangData);

  useEffect(() => {
    setData({ introFinished: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (typeof document !== 'undefined') {
    document.dispatchEvent(new Event('SceneReady'));
    document.dispatchEvent(new Event('ThreeLoading'));
  }

  return (
    <>
      <Seo title="404" />

      <div
        ref={container}
        class="pointer-events-auto">
        <div className="px-16 h-full-vh">
          <div className="min-h-full">
            <div className="md:px-32 pt-38 text-white pb-32">
              <h1 className="mb-8 mt-8 text-xl font-title font-semibold">404 - {langData?.notfound?.title}</h1>
              <Link
                className="button whitespace-nowrap text-center border rounded-full uppercase py-3 px-6 cursor-pointer"
                to={withPrefix('/')}>
                {langData?.notfound?.back}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
export const query = graphql`
  query ErrorPage {
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
