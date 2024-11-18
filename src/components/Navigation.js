import React, { useState, useEffect, useContext, useRef } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import cn from 'classnames';

import { PageContext } from '../context/pageState';
import Logo from '../images/logo.svg';
import useDefferedVariable from '../hooks/useDefferedVariable';
import useMediaQuery from '../hooks/useMediaQuery';
import { useIntl } from '../hooks/internationalization';
import { useLangData } from '../hooks/getLangData';

import ButtonIcon from './ButtonIcon';
import ButtonLink from './ButtonLink';
import Button from './Button';
import { LangSwap } from './LangSwap';

const Navbar = ({ location, toggleConnect, openCollection, collectionVisible }) => {
  const [hambugerOpen, toggleHamburger] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const defferedPath = useDefferedVariable(location.pathname, 2000);
  const showHamburger = !defferedPath.includes('experience/') && !hambugerOpen && !collectionVisible;
  const showCross = hambugerOpen && !defferedPath.includes('experience/') && hambugerOpen && !collectionVisible;
  const showHome = defferedPath.includes('experience/');

  // intl
  const langObjects = useIntl();
  const { language } = useI18next();
  const langData = useLangData(language, langObjects);

  const pageState = useContext(PageContext);
  const anchorLink = useRef(null);
  const removeScrollto = useRef(null);

  const handleHamburger = () => {
    toggleHamburger(!hambugerOpen);
  };

  const handleClose = () => {
    toggleConnect(false);
    toggleHamburger(false);
  };

  const handleCollection = () => {
    toggleConnect(false);
    toggleHamburger(false);
    openCollection((isOpen) => (isOpen ? false : isOpen));
  };

  const handleOpenCollection = () => {
    openCollection((o) => (o === false ? 1 : o + 1));
    toggleHamburger(false);
  };

  useEffect(() => {
    if (pageState.data.scrollAnimator) {
      removeScrollto.current = pageState.data.scrollAnimator.scrollTo(anchorLink.current);
    }
  }, [pageState.data.scrollAnimator]);

  // const { navigatingActiveUrl } = useCanvasStore()
  // const defferedPath = navigatingActiveUrl ? path : location.pathname

  return (
    <nav className="fixed z-40 h-18 md:h-40 font-sans text-xs py-5 md:py-10 px-8 md:px-10 w-full-vw items-center flex">
      <div className="flex flex-row-reverse md:flex-row w-full md:w-auto justify-between items-center">
        {Boolean(showHamburger) && (
          <>
            <LangSwap className={cn('top-6 right-18 !absolute md:hidden')} />
            <ButtonIcon
              to="/"
              invert
              animated={false}
              activeClassName="active"
              className={cn('w-9 h-9 top-6 right-5 !absolute md:hidden')}
              onClick={handleHamburger}
              variant="hamburger"></ButtonIcon>
          </>
        )}
        {Boolean(showCross) && (
          <div className="absolute md:hidden bg-green rounded-lg right-0 top-0 h-full z-[60] px-5 pt-6 flex justify-center items-top">
            <ButtonIcon
              to="/"
              invert
              animated={false}
              activeClassName="active"
              style={{
                zIndex: 60,
              }}
              onClick={handleHamburger}
              variant="cross"></ButtonIcon>
          </div>
        )}
        {Boolean(showHome) && (
          <ButtonIcon
            to="/"
            animated={false}
            invert
            noHover={true}
            activeClassName="active"
            className="w-10 h-10 top-6 right-5 !absolute md:hidden "
            onClick={handleClose}
            variant="home"></ButtonIcon>
        )}

        <a
          href="/"
          ref={anchorLink}
          className="block w-24 h-24 mt-4 md:w-28 md:h-28 mx-auto md:m-0">
          <Logo
            className={cn('w-full h-full object-contain', {
              invert: defferedPath.includes('experience/'),
            })}
            title="logo"
            onClick={handleCollection}
          />
        </a>
      </div>
      <ul
        className={`[counter-reset:nav] flex  overflow-x-auto overflow-y-hidden z-50 md:z-30 md:flex-1 items-center md:justify-center fixed md:relative bg-green md:bg-transparent rounded-b-[1rem] h-20 md:h-full w-full  top-0 left-0 ${
          hambugerOpen && !defferedPath.includes('experience/') ? 'flex' : 'hidden md:flex'
        }`}
        style={{
          marginLeft: isDesktop ? '18rem' : 0,
        }}>
        {!defferedPath.includes('experience/') ? (
          <>
            <li className="inline-block md:ml-auto">
              {isDesktop ? (
                <Button
                  to={'/'}
                  variant="black"
                  activeClassName={!collectionVisible ? 'active' : ''}
                  onClick={handleCollection}
                  className="text-base !capitalize font-title ">
                  {langData?.nav.map}
                </Button>
              ) : (
                <ButtonLink
                  className={`ml-6 uppercase text-lg flex flex-col [counter-increment:nav] before:[content:'0'_counters(nav,'.')]  before:text-[0.4em]`}
                  onClick={handleCollection}>
                  {langData?.nav.map}
                </ButtonLink>
              )}
            </li>
            <li className="inline-block md:ml-5 md:mr-auto">
              {isDesktop ? (
                <Button
                  variant="black"
                  onClick={handleOpenCollection}
                  className={`text-base  !capitalize font-title ${collectionVisible ? 'active' : ''}`}>
                  {langData?.nav.collections}
                </Button>
              ) : (
                <ButtonLink
                  className={`ml-6 uppercase text-lg flex flex-col [counter-increment:nav] before:[content:'0'_counters(nav,'.')]  before:text-[0.4em]`}
                  onClick={handleOpenCollection}>
                  {langData?.nav.collections}
                </ButtonLink>
              )}
            </li>
            <li
              className="hidden md:flex mr-6 justify-end gap-3 items-center "
              style={{
                width: '25rem',
              }}>
              <LangSwap />
              <div
                className="hidden overflow-hidden h-full md:flex items-center"
                style={{
                  transition: `opacity 0.3s, max-width 0.6s ${collectionVisible ? '0.3s' : ''}`,
                  maxWidth: collectionVisible ? '3rem' : '20rem',
                  opacity: collectionVisible ? 0 : 1,
                  pointerEvents: collectionVisible ? 'none' : 'auto',
                }}>
                <Button
                  to="/experience/egyptian-temple"
                  activeClassName="active"
                  onClick={handleClose}
                  variant="green-invert"
                  className="text-base font-title">
                  {langData?.nav.start}
                </Button>
              </div>
            </li>
          </>
        ) : defferedPath.includes('experience/') ? (
          <li
            className={cn('inline-block md:ml-auto transition-opacity', {
              'opacity-0 pointer-events-none': collectionVisible,
            })}>
            <ButtonIcon
              to="/"
              animated={false}
              activeClassName="active"
              onClick={handleClose}
              variant="home"></ButtonIcon>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default React.memo(Navbar);
