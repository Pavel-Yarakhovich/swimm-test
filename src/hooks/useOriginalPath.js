import { useI18next } from 'gatsby-plugin-react-i18next';
import { useContext, useEffect, useMemo } from 'react';

import { PageContext } from '../context/pageState.js';

export function useOriginalPath(location = '/') {
  const { originalPath, defaultLanguage, language } = useI18next();

  // create path without language
  const pathWithoutLanguage = useMemo(() => {
    return defaultLanguage !== language ? `/${location.pathname?.split('/')?.slice(2)?.join('/')}` : location.pathname;
  }, [location.pathname, language, defaultLanguage]);

  // get context
  const {
    data: { previousPath, pathName },
    setData,
  } = useContext(PageContext);

  // update context
  useEffect(() => {
    if (previousPath !== originalPath) setData({ previousPath: originalPath });
    if (pathName !== pathWithoutLanguage) setData({ pathName: pathWithoutLanguage });
  }, [location, previousPath, originalPath, pathName, pathWithoutLanguage, setData]);

  return null;
}
