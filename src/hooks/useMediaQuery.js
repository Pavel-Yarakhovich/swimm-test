import { useState, useEffect } from 'react';

import useViewport from './useViewport';
const useMediaQuery = (query = '(min-width: 768px)') => {
  let desktopWidth = query.replace(/\(|\)|px/g, '')?.split(': ');
  desktopWidth = desktopWidth.length > 1 ? Number(desktopWidth[1]) : 768;
  const { width } = useViewport();

  const [isDesktop, setIsDesktop] = useState(width > desktopWidth);

  useEffect(() => {
    if (width > desktopWidth) setIsDesktop(true);
    if (width < desktopWidth) setIsDesktop(false);
  }, [width, desktopWidth, setIsDesktop]);

  return isDesktop;
};

export default useMediaQuery;
