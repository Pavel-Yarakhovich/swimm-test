import React from 'react';

import AnimatedTextLines from '../components/AnimateTextLines';
import ButtonIcon from '../components/ButtonIcon';

import { ScrollVisible } from './ScrollVisible';

export const StopOutro = ({ data, langData }) => {
  if (!data || !langData) {
    return;
  }

  return (
    <ScrollVisible
      config={{ start: 0.95, end: 1 }}
      className="absolute w-full h-full flex flex-col justify-center bg-gray-800 bg-opacity-50">
      {(isVisible) => (
        <>
          <h1
            style={{ maxWidth: '1000px' }}
            className="text-xl px-2 mx-auto font-semibold md:text-2xl font-title text-center text-white  w-full flex items-center justify-center leading-[1.1] drop-shadow shadow-black">
            <AnimatedTextLines
              show={isVisible}
              text={data?.next?.location?.name}
            />
          </h1>
          <div className="flex flex-col items-center">
            <p className="font-title text-white mt-8 mb-4">{langData?.experience.next}</p>
            <ButtonIcon
              to={`/experience/${data?.next?.Slug}`}
              className={`relative md:mt-4 ${!isVisible ? '!pointer-events-none' : ''}`}
              variant="arrow"
            />
          </div>
        </>
      )}
    </ScrollVisible>
  );
};
