import React from 'react';
import cn from 'classnames';

import ButtonLink from './ButtonLink';

const ButtonIcon = ({
  variant,
  children,
  border = true,
  noHover = false,
  noRotate = false,
  invert = false,
  animated = true,
  fill,
  to,
  className,
  ...props
}) => {
  const ignoredVariantRotation = ['home', 'hamburger'];

  return (
    <ButtonLink
      to={to}
      title={variant}
      {...props}
      className={cn('justify-center items-center relative inline-flex w-10 h-10 md:w-14 md:h-14 group', className, {
        'hover-btn-invert': invert,
        'hover-btn': !invert,
        'overflow-hidden': animated,
        'no-hover': noHover,
      })}>
      {animated && <div className="hover-btn-bg" />}
      {variant !== 'map' && variant !== 'map-audio' && <div className={cn({ 'hover-btn-border': border })}></div>}
      {variant === 'scroll' && <div className="btn-border-drip"></div>}
      <div
        className={cn('hover-btn-content rotate-0', {
          'group-hover:rotate-180': animated && !noRotate && !ignoredVariantRotation.includes(variant),
          'rotate-180': variant === 'scroll',
        })}>
        {children}
        {variant === 'arrow' || variant === 'scroll' ? (
          <svg
            className="mx-auto w-2/3 md:w-full"
            width={variant === 'arrow' ? '24' : '34'}
            height={variant === 'arrow' ? '24' : '34'}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd">
            <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
          </svg>
        ) : variant === 'cross' ? (
          <svg
            className="mx-auto w-4/5 md:w-full"
            width="40"
            height="40"
            viewBox="0 0 1000 1000">
            <path d=" M 300 287C 303 287 306 289 309 291C 309 291 500 482 500 482C 500 482 691 291 691 291C 693 289 697 287 700 287C 705 287 710 290 712 295C 714 300 713 305 709 309C 709 309 518 500 518 500C 518 500 709 691 709 691C 712 694 713 699 712 703C 711 708 708 711 703 712C 699 713 694 712 691 709C 691 709 500 518 500 518C 500 518 309 709 309 709C 306 712 301 713 297 712C 292 711 289 708 288 703C 287 699 288 694 291 691C 291 691 482 500 482 500C 482 500 291 309 291 309C 288 305 286 300 288 295C 290 290 295 287 300 287C 300 287 300 287 300 287" />
          </svg>
        ) : variant === 'home' ? (
          <svg
            className="mx-auto w-2/3 md:w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="16.234"
            height="23.021"
            viewBox="0 0 21.234 28.021">
            <path
              d="M25.57,40.854H17.135V24.092L27.9,12.833,38.369,24.092V40.854H25.57Z"
              transform="translate(-17.135 -12.833)"
              fillRule="evenodd"
            />
          </svg>
        ) : variant === 'map' ? (
          <svg
            className="w-full"
            viewBox="0 0 24.689 35.162">
            <path
              d="M12.345,0C5.512,0,0,5.239,0,11.68a11.114,11.114,0,0,0,1.676,5.874.306.306,0,0,1,.014.028.235.235,0,0,1,.014.027l.014.028v.014l10.7,17.512,10.6-17.6h0c0-.01.009-.019.014-.028a.335.335,0,0,1,.014-.042h.014s0-.009,0-.014.009-.019.014-.028a11.106,11.106,0,0,0,1.621-5.777C24.689,5.262,19.215.036,12.414,0h-.069Z"
              fill={fill || '#00da9e'}
            />
          </svg>
        ) : variant === 'map-audio' ? (
          <>
            <svg
              viewBox="0 0 24.689 35.162"
              style={{
                width: '70%',
              }}>
              <path
                d="M12.345,0C5.512,0,0,5.239,0,11.68a11.114,11.114,0,0,0,1.676,5.874.306.306,0,0,1,.014.028.235.235,0,0,1,.014.027l.014.028v.014l10.7,17.512,10.6-17.6h0c0-.01.009-.019.014-.028a.335.335,0,0,1,.014-.042h.014s0-.009,0-.014.009-.019.014-.028a11.106,11.106,0,0,0,1.621-5.777C24.689,5.262,19.215.036,12.414,0h-.069Z"
                fill={fill || '#00da9e'}
              />
            </svg>
            <div className="absolute top-[0.45rem] left-[0.65rem] m-auto border-t-transparent border-b-transparent border-l-white border-y-[0.5rem] border-l-[0.65rem] border-r-0 w-0 h-0"></div>
          </>
        ) : variant === 'hamburger' ? (
          <div className="px-[0.56rem] w-8 h-8  flex flex-col justify-center ">
            <span
              className={cn('w-full border-b mb-1 ', {
                'border-black': invert,
                'border-white': !invert,
                'animate-border': animated,
              })}></span>
            <span
              className={cn('w-full border-b mb-1 ', {
                'border-black': invert,
                'border-white': !invert,
                'animate-border': animated,
              })}></span>
            <span
              className={cn('w-full border-b', {
                'border-black': invert,
                'border-white': !invert,
                'animate-border': animated,
              })}></span>
          </div>
        ) : null}
      </div>
    </ButtonLink>
  );
};

export default ButtonIcon;
