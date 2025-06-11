import { useState, useEffect } from 'react';

export const useColorScheme = (isMobile: boolean, verticalOffset: number = 0) => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const checkSection = () => {
      const diagonalSection = document.getElementById('diagonal-section');
      
      if (diagonalSection) {
        const sectionRect = diagonalSection.getBoundingClientRect();
        const navbarHeight = 80; // Hauteur approximative de la navbar

        // On change la couleur quand la navbar atteint le bas de la section
        if (sectionRect.bottom <= navbarHeight + 100) { // Ajout d'une marge de 100px pour déclencher plus tôt
          setIsLight(false);
        } else {
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