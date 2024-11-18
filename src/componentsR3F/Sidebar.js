import React from 'react';

import { ScrollProgress } from './ScrollProgress';
import { ScrollButton } from './ScrollButton';

// Sidenavigation of an experience
export const Sidebar = ({ scrollIndicator, introPanel, scrollStops, triggers, langData, currentScroll }) => {
  return (
    <ScrollProgress>
      <ScrollButton
        active={scrollIndicator === 0}
        className="text-white"
        offset={0}>
        {introPanel?.nav_title_intro}
      </ScrollButton>

      {scrollStops?.length
        ? scrollStops.map((page, i) =>
            triggers[i].start_trigger ? (
              <ScrollButton
                key={`buton ${i}`}
                active={scrollIndicator === i + 1 && currentScroll < 0.95}
                className="text-white"
                offset={triggers[i]?.start_trigger || page.start_trigger}>
                {page.translations?.nav_title}
              </ScrollButton>
            ) : null
          )
        : null}

      <ScrollButton
        active={scrollIndicator === scrollStops?.length + 1}
        className="text-white"
        offset={0.95}>
        {langData?.experience.next}
      </ScrollButton>
    </ScrollProgress>
  );
};
