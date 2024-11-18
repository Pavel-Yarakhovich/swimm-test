import React, { useRef, useEffect } from 'react';
import cn from 'classnames';

import useHorizontalScroll from '../hooks/useHorizontalScroll';
import useMediaQuery from '../hooks/useMediaQuery';

const HorizontalScroll = ({ children, isDisabled, containerClass, className, ...props }) => {
  const scrollRef = useRef(null);
  const isDesktop = useMediaQuery();

  const [resetScroll, scrollTo] = useHorizontalScroll({
    ref: scrollRef,
    isDisabled: !isDesktop,
  });

  useEffect(() => {
    resetScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled]);

  return (
    <div
      ref={scrollRef}
      {...props}
      className={cn('hor-scroll', className, {
        'overflow-x-hidden': isDisabled,
        'overflow-x-auto': !isDisabled,
      })}>
      <div className={`h-full ${containerClass || 'w-max'} shrink-0-children flex `}>
        {typeof children === 'function' ? children(resetScroll, scrollTo) : children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
