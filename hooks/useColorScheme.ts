import { useState, useEffect } from 'react';

export const useColorScheme = (isMobile: boolean, verticalOffset: number = 0) => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const checkSection = () => {
      const scrollPosition = window.scrollY;
      const headerHeight = isMobile ? 450 : 900;
      const isInMain = scrollPosition > headerHeight * 0.8;

      const boxReveal = document.querySelector('.clip-triangle-right');
      const diagonalSection = document.querySelector('.relative.py-3.overflow-x-hidden');
      
      if (boxReveal && diagonalSection) {
        const boxRevealRect = boxReveal.getBoundingClientRect();
        const diagonalSectionRect = diagonalSection.getBoundingClientRect();
        const viewportPosition = window.innerHeight / 2 + verticalOffset;

        // Si on est dans la section diagonale, on est en blanc
        if (diagonalSectionRect.top <= viewportPosition) {
          setIsLight(true);
        }
        // Si on est après la BoxReveal mais avant la section diagonale, on est en noir
        else if (boxRevealRect.top <= viewportPosition || isInMain) {
          setIsLight(false);
        }
        // Au début, on est en blanc
        else {
          setIsLight(true);
        }
      }
    };

    checkSection();
    window.addEventListener('scroll', checkSection);
    return () => window.removeEventListener('scroll', checkSection);
  }, [isMobile, verticalOffset]);

  return isLight;
}; 