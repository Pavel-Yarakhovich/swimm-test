import React, { useMemo, useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import cn from 'classnames';

import { useCanvasStore } from '../context/canvasContext';
import useMediaQuery from '../hooks/useMediaQuery';

export const LangSwap = ({ className }) => {
  const [open, setOpen] = useState();
  const { languages, language: currentLang, changeLanguage } = useI18next();
  const { setCanvasData } = useCanvasStore();
  const restLanguages = useMemo(() => languages.filter((l) => l !== currentLang), [currentLang]);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleOpen = () => {
    setOpen((o) => !o);
  };

  return (
    <>
      <div
        className={cn(
          'font-title border transition md:text-md cursor-pointer px-3 md:px-6 border-black rounded-full flex items-center justify-center',
          className
        )}
        onClick={handleOpen}
        style={{
          height: isDesktop ? '2.75rem' : '2.25rem',
          width: open ? 'auto' : isDesktop ? '2.75rem' : '2.25rem',
        }}>
        <button
          className="uppercase"
          type="button">
          {currentLang}
        </button>
        {restLanguages.map((lang, i) => {
          const handleChangeLang = () => {
            changeLanguage(lang);
            setCanvasData({ i18: { language: lang } });
          };

          return (
            <button
              onClick={handleChangeLang}
              key={i}
              className={cn('transition-all uppercase hover:opacity-100 transition', {
                'opacity-50': lang !== currentLang,
              })}
              style={{
                marginLeft: open ? '0.75rem' : 0,
                width: open ? 'auto' : 0,
                overflow: open ? 'unset' : 'hidden',
              }}
              type="button">
              {lang}
            </button>
          );
        })}
      </div>
    </>
  );
};
