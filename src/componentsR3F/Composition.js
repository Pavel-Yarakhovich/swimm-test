import React, { useRef } from 'react';
import { Scroll } from '@react-three/drei';
import { CSSTransition } from 'react-transition-group';

import { CompositionExperience } from './CompositionExperience';

export function Composition({ composition, stops, location }) {
  const scrollGroup = useRef();
  const experienceID = location.pathname?.split('/').pop();

  return (
    <>
      <Scroll
        ref={scrollGroup}
        html
        className="!absolute !transform-none w-full h-full">
        <CSSTransition
          in={location.pathname.includes('experience')}
          timeout={2000}
          classNames="fade"
          unmountOnExit
          appear={true}
          to={true}>
          <CompositionExperience
            triggers={stops}
            scrollGroup={scrollGroup}
            id={experienceID}
          />
        </CSSTransition>
      </Scroll>

      {composition}
    </>
  );
}
