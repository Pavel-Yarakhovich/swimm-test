import { Html } from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { StaticImage } from 'gatsby-plugin-image';

import useMediaQuery from '../hooks/useMediaQuery.js';
import useViewport from '../hooks/useViewport.js';
import ButtonIcon from '../components/ButtonIcon.js';
import ButtonLink from '../components/ButtonLink.js';
import { audioLocationsFragment } from '../fragments/audio.js';
import { experienceLocationsFragment } from '../fragments/experience.js';
import { useCanvasStore } from '../context/canvasContext.js';
import { COLORS } from '../const/colors.const.js';

import { CameraRotateControls } from './CameraRotateControls.js';

const APOLLO_MAP_QUERY = gql`
  ${audioLocationsFragment}
  ${experienceLocationsFragment}
  query audioLocations {
    audio {
      ...locationAudioData
    }
    experience {
      ...locationData
    }
  }
`;

export function CompositionIndex({ children, ...props }) {
  const { loading, error, data } = useQuery(APOLLO_MAP_QUERY);
  const isDesktop = useMediaQuery();

  const { height } = useViewport();
  const ref = useRef();
  const [scale, setScale] = useState(!isDesktop ? 750 : 200 / height);

  useEffect(() => {
    const newScale = (!isDesktop ? 750 : 200) / height;
    if (scale !== newScale) {
      setScale(newScale);
    }
  }, [height, isDesktop, scale]);

  const locations = useMemo(
    () =>
      data?.experience
        ? [
            ...data?.experience.map((e) => ({
              ...e.location,
              sort: e.sort,
              slug: e.Slug,
              type: 'experience',
            })),
            ...data?.audio.map((e) => ({
              ...e.location,
              slug: e.slug,
              type: 'audio',
            })),
          ]
        : [],
    [data]
  );

  const { completedExperiences, completedAudios, setCanvasData, mapIndex } = useCanvasStore();

  useEffect(() => {
    setCanvasData({ loading, error, locations });
  }, [loading, error, locations, setCanvasData]);

  return (
    <>
      <group
        ref={ref}
        {...props}
        position={[0, 0, 1]}
        rotation={[0, 0.02, 0]}>
        <CameraRotateControls
          speed={4}
          minY={0}
        />
        <Html
          transform
          center
          wrapperClass="!fixed !z-0 bg-green-map"
          className="w-full h-full relative"
          scale={[scale, scale, scale]}>
          <div className="w-full h-full flex md:items-center">
            <StaticImage
              src="../images/map.jpg"
              alt="map of the zoo"
              className="w-full md:h-full object-contain md:object-center h-4/5 -mt-1/10 md:mt-0"
            />
            <div className="z-10 pointer-events-auto max-h-[100vh] max-w-[100vw] aspect-[1.756440281030445] md:aspect-auto md:bottom-0 bottom-1/5 top-0 absolute m-auto left-0 right-0">
              {locations &&
                locations.map((experience, i) =>
                  mapIndex !== i && !isDesktop ? null : experience.type === 'experience' ? (
                    <ButtonLink
                      key={i}
                      className="absolute flex items-end justify-center w-[0px] h-[0px]"
                      to={`/experience/${experience.slug}`}
                      style={{
                        top: `${experience.y}%`,
                        left: `${experience.x}%`,
                      }}>
                      <ButtonIcon
                        className="!h-14 !w-10 flex-shrink-0"
                        variant="map"
                        animated={false}
                        fill={completedExperiences.includes(`${experience.slug}`) ? COLORS.GREEN : COLORS.BLACK}
                      />
                      <span
                        className="font-title text-white absolute mb-4"
                        style={{ fontSize: '1.4rem' }}>
                        {experience.sort}
                      </span>
                    </ButtonLink>
                  ) : (
                    <ButtonLink
                      key={i}
                      className="absolute flex items-end justify-center w-[0px] h-[0px]"
                      style={{
                        top: `${experience.y}%`,
                        left: `${experience.x}%`,
                      }}
                      to={`/audio/${experience.slug}`}>
                      <ButtonIcon
                        className="!h-14 !w-10 flex-shrink-0"
                        variant="map-audio"
                        animated={false}
                        fill={completedAudios.includes(experience.slug) ? COLORS.GREEN : COLORS.BLACK}
                      />
                    </ButtonLink>
                  )
                )}
            </div>
          </div>
        </Html>
      </group>
    </>
  );
}
