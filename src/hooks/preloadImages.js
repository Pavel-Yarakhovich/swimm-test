import { useEffect, useState } from 'react';

export const usePreloadImages = (IMAGES = []) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (src) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = src;
        loadImg.onload = () => resolve(src);
        loadImg.onerror = (err) => reject(err);
      });
    };

    Promise.all(IMAGES.map((image) => loadImage(image)))
      .then(() => setImgsLoaded(true))
      .catch((err) => console.log('Failed to load images', err));
  }, []);

  return imgsLoaded;
};
