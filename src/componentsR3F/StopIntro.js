import React from 'react';

import AnimatedTextLines from '../components/AnimateTextLines';
import { ScrollIcon } from '../components/ScrollIcon';

import { ScrollVisible } from './ScrollVisible';

export const StopIntro = ({ panel }) => {
  if (!panel) {
    return;
  }

  return (
    <ScrollVisible config={{ start: 0, end: 0.015 }}>
      {(isVisible) => (
        <>
          <div className="flex w-full h-full items-center justify-center flex-col fixed bg-gray-800 bg-opacity-50">
            <h1
              style={{ maxWidth: '1000px' }}
              className="text-xl px-2 font-semibold  md:text-2xl font-title text-center text-white  w-full flex items-center justify-center leading-[1.1] drop-shadow shadow-black">
              <AnimatedTextLines
                show={isVisible}
                text={panel.title_intro}
              />
            </h1>
            <div className="flex flex-col items-center mt-14">
              <ScrollIcon />
            </div>
          </div>
        </>
      )}
    </ScrollVisible>
  );
};
