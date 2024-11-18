import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import Parallax from 'parallax-js';
import { useMemo } from 'react';

import useMediaQuery from '../hooks/useMediaQuery';
import { useCanvasStore } from '../context/canvasContext';
import { selectTranslation } from '../utils/selectTranslation';
import { useLangData } from '../hooks/getLangData';
import { scrollToLocation } from '../utils/scroll-to-location';

import { SceneConfig } from './SceneConfig';
import { StopIntro } from './StopIntro';
import { StopOutro } from './StopOutro';
import { Sidebar } from './Sidebar';
import { Stop } from './Stop';

export function CompositionExperience({ scrollGroup, triggers }) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [overlayIsOpen, overlaySetOpen] = useState(0);
  const [scrollIndicator, setScrollIndicator] = useState(0);
  const parallaxScene = useRef([]);

  const timerRef = useRef(null);
  const parallaxInstance = useRef([]);

  let { el, scroll } = useScroll();
  const { data, setCanvasData } = useCanvasStore();
  const { i18 } = useCanvasStore();
  const [memorizedData, setData] = useState(data);

  const currentLang = i18.language;
  const langData = useLangData(currentLang, i18.i18n?.options?.resources);
  const experienceData = useMemo(
    () => (Array.isArray(memorizedData?.experience) ? memorizedData?.experience[0] : []),
    [memorizedData]
  );

  const introPanel = useMemo(
    () => (experienceData ? selectTranslation(experienceData['enter_panel'], currentLang) : ''),
    [experienceData, currentLang]
  );

  const scrollStops = useMemo(
    () =>
      experienceData && Array.isArray(experienceData['scroll_stops'])
        ? experienceData['scroll_stops'].map((obj) => {
            let translations = selectTranslation(obj.experience_page_id.translations, currentLang);
            return { ...obj.experience_page_id, translations };
          })
        : [],
    [experienceData, currentLang]
  );

  const getScrollNumber = (scrollStops, scrollProgress) =>
    scrollStops &&
    scrollStops.findIndex(
      (scrollpage, i) =>
        scrollpage.start_trigger <= scrollProgress &&
        ((typeof scrollStops[i + 1] !== 'undefined' && scrollStops[i + 1].start_trigger > scrollProgress) ||
          (typeof scrollStops[i + 1] === 'undefined' && scrollProgress < 0.95))
    );

  const toggleOverlay = (e, isActive, i) => {
    if (!parallaxScene.current[i] || !parallaxInstance.current[i]) {
      return;
    }
    clearTimeout(timerRef.current);

    if (isActive) {
      timerRef.current = setTimeout(() => {
        if (scrollGroup.current) {
          scrollGroup.current.parentNode.style.zIndex = 40;
          overlaySetOpen(isActive);
          setCanvasData({ overlayIsOpen: isActive });
        }
      }, 200);
      el.classList.add('overflow-hidden-important', 'touch-none');
      parallaxInstance.current[i].limit(0.001, 0.001);
    } else {
      timerRef.current = setTimeout(() => {
        if (scrollGroup.current?.parentNode) {
          scrollGroup.current.parentNode.style.zIndex = null;
        }
        overlaySetOpen(isActive);
        setCanvasData({ overlayIsOpen: isActive });
      }, 500);
      el.classList.remove('overflow-hidden-important', '!overflow-hidden', 'touch-none');
      parallaxInstance.current[i].limit(false, false);
    }
  };

  const handleScroll = (offset) => {
    setTimeout(() => {
      scrollToLocation({ el, scroll }, offset);
    }, 700);
  };

  const checkInstances = () => {
    if (!parallaxScene.current.length) {
      return;
    }
    const initParallax = (ref) =>
      new Parallax(ref, {
        relativeInput: true,
        hoverOnly: true,
        frictionX: 0.05,
        frictionY: 0.05,
      });

    parallaxScene.current.forEach((ref, i) => {
      if (ref) {
        parallaxInstance.current[i] = initParallax(ref);
      }
    });
    if (isDesktop) {
      parallaxInstance.current.forEach((ref) => ref.enable());
    } else {
      parallaxInstance.current.forEach((ref) => ref.disable());
    }
  };

  const handleRef = (ref, i) => {
    parallaxScene.current[i] = ref;
    checkInstances();
  };

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setData(data);

      if (data?.experience && data?.experience[0]?.sort !== experienceData?.sort) {
        handleScroll(0);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, experienceData]);

  useFrame(() => {
    if (!scrollStops.length) return;

    const scrollIndex = getScrollNumber(triggers || scrollStops, scroll.current);

    if (scrollIndex + 1 !== scrollIndicator && scrollIndex !== -1) {
      setScrollIndicator(scrollIndex + 1);
    } else if (scroll.current < triggers[0]?.start_trigger) {
      setScrollIndicator(0);
    } else if (scroll.current > 0.95) {
      setScrollIndicator(scrollStops.length + 1);
    }
  });

  if (scrollStops.length !== triggers.length) {
    return <></>;
  }

  return (
    <>
      <SceneConfig
        timeout={800}
        config={{
          scrollEnabled: true,
          sceneScroll: 1,
          offset: 0,
          pages: isDesktop ? 5 : 5,
          maxSpeed: isDesktop ? 1 : 1,
          damping: isDesktop ? 0.15 : 0.1,
          speed: isDesktop ? 5 : 10,
        }}>
        {/* INTRO */}
        <StopIntro panel={introPanel} />

        {/* INFO STOPS */}
        {scrollStops?.length > 0 &&
          scrollStops.map(
            (page, i) =>
              triggers[i]?.start_trigger && (
                <Stop
                  key={`scroll-stop-${i}`}
                  i={i}
                  start={triggers[i]?.start_trigger || page.start_trigger}
                  end={triggers[i]?.end_trigger || page.end_trigger}
                  currentLang={currentLang}
                  page={page}
                  toggleOverlay={toggleOverlay}
                  overlayIsOpen={overlayIsOpen}
                  handleRef={handleRef}
                  langData={langData}
                />
              )
          )}

        {/* outro */}
        <StopOutro
          data={data}
          langData={langData}
        />

        {/* sidenav */}
        <Sidebar
          scrollIndicator={scrollIndicator}
          scrollStops={scrollStops}
          introPanel={introPanel}
          currentScroll={scroll.current}
          triggers={triggers}
          langData={langData}
        />
      </SceneConfig>
    </>
  );
}
