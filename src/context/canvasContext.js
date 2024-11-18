import { create } from 'zustand';

export const useCanvasStore = create((set) => ({
  i18: { language: null },
  mapIndex: 0,
  completedExperiences: [],
  completedAudios: [],
  overlayIsOpen: false,
  isLoaded: false,
  setCanvasData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
