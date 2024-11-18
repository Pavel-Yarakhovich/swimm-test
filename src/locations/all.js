import React from 'react';

import { EgyptianTempleComposition } from './egyptian-temple/composition';
import { MoorishTempleComposition } from './moorish-temple/composition';
import { RhinoBuildingComposition } from './rhino-building/composition';
import { BirdBuildingComposition } from './bird-building/composition';
import { EntrancePavilionComposition } from './entrance-pavilion/composition';
import { GrandCafeFlamingoComposition } from './grand-cafe-flamingo/composition';
import { AquariumComposition } from './aquarium/composition';
import { CattleBuildingComposition } from './cattle-building/composition';
import { LatteriaComposition } from './latteria/composition';
import { WintergardenComposition } from './wintergarden/composition';

// Info: A new slug should also be added to the Directus slug dropdown
export const locations = [
  {
    slug: 'egyptian-temple',
    composition: <EgyptianTempleComposition />,
    stops: [
      { start_trigger: 0.148, end_trigger: 0.175 },
      { start_trigger: 0.328, end_trigger: 0.369 },
      { start_trigger: 0.53, end_trigger: 0.577 },
      { start_trigger: 0.73, end_trigger: 0.773 },
      { start_trigger: 0.856, end_trigger: 0.89 },
    ],
  },
  {
    slug: 'moorish-temple',
    composition: <MoorishTempleComposition />,
    stops: [
      { start_trigger: 0.128, end_trigger: 0.175 }, // In
      { start_trigger: 0.305, end_trigger: 0.362 }, // Overview
      { start_trigger: 0.566, end_trigger: 0.62 }, // Tiles
      { start_trigger: 0.77, end_trigger: 0.833 }, // Okapi
    ],
  },
  {
    slug: 'rhino-building',
    composition: <RhinoBuildingComposition />,
    stops: [
      { start_trigger: 0.192, end_trigger: 0.256 }, // Overview
      { start_trigger: 0.426, end_trigger: 0.486 }, // Ambacht
      { start_trigger: 0.577, end_trigger: 0.65 }, // Perk
    ],
  },
  {
    slug: 'bird-building',
    composition: <BirdBuildingComposition />,
    stops: [
      { start_trigger: 0.067, end_trigger: 0.105 },
      { start_trigger: 0.233, end_trigger: 0.275 },
      { start_trigger: 0.361, end_trigger: 0.404 },
      { start_trigger: 0.561, end_trigger: 0.606 },
      { start_trigger: 0.8, end_trigger: 0.838 },
    ],
  },
  {
    slug: 'entrance-pavilion',
    composition: <EntrancePavilionComposition />,
    stops: [
      { start_trigger: 0.085, end_trigger: 0.123 },
      { start_trigger: 0.221, end_trigger: 0.255 },
      { start_trigger: 0.37, end_trigger: 0.4 },
      { start_trigger: 0.495, end_trigger: 0.53 },
      { start_trigger: 0.823, end_trigger: 0.85 },
    ],
  },
  {
    slug: 'grand-cafe-flamingo',
    composition: <GrandCafeFlamingoComposition />,
    stops: [
      { start_trigger: 0.085, end_trigger: 0.1 },
      { start_trigger: 0.3, end_trigger: 0.32 },
      { start_trigger: 0.512, end_trigger: 0.539 },
      { start_trigger: 0.796, end_trigger: 0.825 },
      { start_trigger: 0.921, end_trigger: 0.951 },
    ],
  },
  {
    slug: 'aquarium',
    composition: <AquariumComposition />,
    stops: [
      { start_trigger: 0.066, end_trigger: 0.11 },
      { start_trigger: 0.1825, end_trigger: 0.2296 },
      { start_trigger: 0.3585, end_trigger: 0.41095 },
      { start_trigger: 0.65565, end_trigger: 0.6845 },
      { start_trigger: 0.9163, end_trigger: 0.949 },
    ],
  },
  {
    slug: 'cattle-building',
    composition: <CattleBuildingComposition />,
    stops: [
      { start_trigger: 0.1203, end_trigger: 0.15 },
      { start_trigger: 0.36, end_trigger: 0.4 },
      { start_trigger: 0.65, end_trigger: 0.7 },
      { start_trigger: 0.879, end_trigger: 0.8943 },
    ],
  },
  {
    slug: 'latteria',
    composition: <LatteriaComposition />,
    stops: [
      { start_trigger: 0.1612, end_trigger: 0.2086 },
      { start_trigger: 0.3694, end_trigger: 0.4039 },
      { start_trigger: 0.5694, end_trigger: 0.6041 },
      { start_trigger: 0.7727, end_trigger: 0.8192 },
      { start_trigger: 0.9163, end_trigger: 0.9568 },
    ],
  },
  {
    slug: 'wintergarden',
    composition: <WintergardenComposition />,
    stops: [
      { start_trigger: 0.2261, end_trigger: 0.255 },
      { start_trigger: 0.4676, end_trigger: 0.5068 },
      { start_trigger: 0.7298, end_trigger: 0.7803 },
      { start_trigger: 0.9163, end_trigger: 0.9568 },
    ],
  },
];
