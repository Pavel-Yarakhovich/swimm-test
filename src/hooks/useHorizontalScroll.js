import { animate, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const useHorizontalScroll = ({
  ref,
  scrollDistance = 100,
  touchSpeedDivider = 3, // trackpad for desktop and mobile touch
  isDisabled = false,
}) => {
  const scrollLeft = useMotionValue(0);
  const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  useMotionValueEvent(scrollLeft, 'change', (latest) => {
    ref.current.scrollLeft = latest;
  });

  // MouseWheel
  const wheelEventHandler = (e) => {
    // if (isDisabled) return
    e.preventDefault();
    const deltaX = Math.max(-1, Math.min(1, e.deltaX));
    const deltaY = Math.max(-1, Math.min(1, e.deltaY));
    const delta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
    const scrollAmount = delta * scrollDistance;
    const newScrollLeft = ref.current.scrollLeft + scrollAmount;

    animate(scrollLeft, newScrollLeft, {
      duration: 0.2,
      ease: 'easeOut',
    });
  };

  // TouchPad
  const previousTouchPositionRef = useRef(null);
  const handleTouchStart = (e) => {
    if (isDisabled) return;
    // e.preventDefault()
    previousTouchPositionRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchMove = (e) => {
    if (isDisabled) return;
    e.preventDefault();
    const touchPositionY = e.touches[0].clientY;
    const touchDistanceY = touchPositionY - previousTouchPositionRef.current.y;
    const touchPositionX = e.touches[0].clientX;
    const touchDistanceX = touchPositionX - previousTouchPositionRef.current.x;
    const scrollAmountY = touchDistanceY / touchSpeedDivider;
    const scrollAmountX = touchDistanceX / touchSpeedDivider;
    const scrollAmount = Math.abs(scrollAmountY) > Math.abs(scrollAmountX) ? scrollAmountY : scrollAmountX;
    const newScrollLeft = ref.current.scrollLeft - scrollAmount;

    animate(scrollLeft, newScrollLeft, {
      duration: 0.2,
      ease: 'easeOut',
    });
  };

  const reset = () => {
    scrollLeft.set(ref.current.scrollLeft); //set current scroll position
    animate(scrollLeft, 0, {
      //animate to start
      duration: 0.2,
      ease: 'easeOut',
    });
  };

  const scrollTo = ({ direction, percent, screenPercentage, value }) => {
    let scrollPosition;
    let scrollStep = percent
      ? scrollWidth * (percent / 100)
      : screenPercentage && typeof document !== 'undefined'
      ? document.body.clientWidth * (screenPercentage / 100)
      : value || 400;
    if (direction === 'next') {
      // scroll forwards
      scrollPosition = Math.min(scrollWidth, scrollLeft.current + scrollStep);
    } else if (direction === 'prev') {
      // scroll backwards
      scrollPosition = Math.max(0, scrollLeft.current - scrollStep);
    } else {
      scrollPosition = percent ? scrollWidth * percent : value;
    }
    animate(scrollLeft, scrollPosition, {
      //animate to start
      duration: 0.3,
      ease: 'easeInOut',
      onComplete: () => {
        setCurrentScrollPosition(scrollPosition);
      },
    });
  };

  // Add EventListener
  useEffect(() => {
    const el = ref.current;

    if (!el || isDisabled) return;
    el.addEventListener('wheel', wheelEventHandler, {
      passive: false,
    });
    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    });

    return () => {
      if (!el) return;
      el.removeEventListener('wheel', wheelEventHandler);
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, isDisabled]);

  useEffect(() => {
    if (!ref?.current) return;
    if (ref.current) setScrollWidth(ref.current.scrollWidth - ref.current.offsetWidth);

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
          if (scrollWidth !== ref.current?.scrollWidth - ref.current?.offsetWidth)
            setScrollWidth(ref.current.scrollWidth - ref.current.offsetWidth);
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(ref.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.scrollWidth, ref.current?.offsetWidth, setScrollWidth]);

  return [reset, scrollTo, scrollWidth, currentScrollPosition];
};

export default useHorizontalScroll;
