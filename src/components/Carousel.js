import React, { useRef, useState, useEffect, useMemo } from 'react';
import { easeOut, motion, useAnimationControls } from 'framer-motion';
import cn from 'classnames';

import ButtonIcon from './ButtonIcon';

const Carousel = ({
  className,
  images = [],
  variant = 'over',
  invert = false,
  pageCallback = () => {},
  startIndex,
  content = [],
  buttons = false,
  disable = false,
}) => {
  const container = useRef();
  const [page, setPage] = useState(0);
  const [width, setWidth] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const controls = useAnimationControls();
  const length = useMemo(() => (images.length > content.length ? images.length : content.length), [images, content]);

  useEffect(() => {
    if (startIndex) {
      setSlide(startIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSlide = (i) => {
    // container.current.offsetWidth
    if (!container.current) return;
    controls.start({
      x: -container.current.offsetWidth * i,
      transition: { duration: 0.6, ease: easeOut },
    });
    setPage(i);
    pageCallback(i);
  };

  const sequence = async (animation) => {
    setIsAnimating(true);
    await animation;
    setIsAnimating(false);
  };

  const handleDragEnd = (event, info) => {
    swipe(info.point.x);
  };

  const handlePrev = () => {
    setSlide(page > 1 ? page - 1 : 0);
  };

  const handleNext = () => {
    setSlide(page < length - 1 ? page + 1 : length - 1);
  };

  useEffect(() => {
    if (disable) {
      setPage(0);
      controls.start({
        x: 0,
        transition: { duration: 0.6, ease: easeOut },
      });
    }
  }, [disable, setPage, controls]);

  useEffect(() => {
    if (container.current) {
      setWidth(container.current.offsetWidth);
    }
  }, [setWidth]);

  const swipe = (x) => {
    if (x < 150 && length - 1 > page) {
      setPage(page + 1);
      pageCallback(page + 1);
      sequence(
        controls.start({
          x: -container.current.offsetWidth * (page + 1),
          transition: { duration: 0.4 },
        })
      );
    } else if (x > 250 && page > 0) {
      setPage(page - 1);
      pageCallback(page - 1);
      sequence(
        controls.start({
          x: -container.current.offsetWidth * (page - 1),
          transition: { duration: 0.4 },
        })
      );
    }
  };

  const controlsStyle = variant === 'over' ? 'absolute bottom-5' : variant === 'under' ? '' : '';

  return (
    <>
      <div
        className={' w-full relative ' + className || ''}
        ref={container}>
        <motion.div
          drag="x"
          onDragEnd={handleDragEnd}
          dragConstraints={{
            left: isAnimating && length ? -width * (length - 1) : -width * page,
            right: -width * page,
          }}
          className="flex h-full"
          animate={controls}>
          {images.length > 0 &&
            images.map((img, i) => (
              <img
                key={i}
                src={img.src}
                sizes="100vw"
                alt={img.alt || 'History image'}
                className="h-full object-cover w-full shrink-0"
              />
            ))}
          {content.length > 0 &&
            content.map((item, i) => (
              <motion.div
                className="shrink-0 w-full"
                key={i}
                animate={{ opacity: i === page ? 1 : 0.1 }}>
                {item}
              </motion.div>
            ))}
        </motion.div>
        <div className={`${controlsStyle} w-full justify-center  flex gap-4`}>
          {buttons && (
            <ButtonIcon
              onClick={handlePrev}
              variant="arrow"
              border={false}
              noHover={true}
              animated={false}
              invert={true}
              className="-rotate-90"
            />
          )}
          <div className="flex gap-4 self-center">
            {[...Array(length)].map((img, i) => {
              const handleSetSlide = () => {
                setSlide(i);
              };

              return (
                <button
                  aria-label={i}
                  key={i}
                  onClick={handleSetSlide}
                  className={cn('w-3 h-3 rounded-full border', {
                    'border-white': invert,
                    'border-black': !invert,
                    'bg-white': page === i && invert,
                    'bg-black': page === i && !invert,
                  })}></button>
              );
            })}
          </div>
          {buttons && (
            <ButtonIcon
              onClick={handleNext}
              variant="arrow"
              border={false}
              noHover={true}
              animated={false}
              invert={true}
              className="rotate-90"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;
