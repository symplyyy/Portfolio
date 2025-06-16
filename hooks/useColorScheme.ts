import { useState, useEffect } from 'react';

export const useNavbarColorScheme = (isMobile: boolean) => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const checkSection = () => {
      const navbarHeight = 80;
      const blackSkinSections = document.querySelectorAll('.blackskin');
      const whiteSkinSections = document.querySelectorAll('.whiteskin');
      
      // Vérifier si la navbar est dans une section blackskin
      for (const section of blackSkinSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarHeight && rect.bottom >= 0) {
          setIsLight(false);
          return;
        }
      }

      // Vérifier si la navbar est dans une section whiteskin
      for (const section of whiteSkinSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarHeight && rect.bottom >= 0) {
          setIsLight(true);
          return;
        }
      }

      // Par défaut, vérifier la section diagonale
      const diagonalSection = document.getElementById('diagonal-section');
      if (diagonalSection) {
        const sectionRect = diagonalSection.getBoundingClientRect();
        if (sectionRect.bottom <= navbarHeight + 100) {
          setIsLight(false);
          return;
        }
      }
      
      setIsLight(true);
    };

    checkSection();
    window.addEventListener('scroll', checkSection);
    return () => window.removeEventListener('scroll', checkSection);
  }, [isMobile]);

  return isLight;
};

export const useSpyNavColorScheme = (isMobile: boolean) => {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const checkSection = () => {
      const viewportMiddle = window.innerHeight / 2;
      const blackSkinSections = document.querySelectorAll('.blackskin');
      const whiteSkinSections = document.querySelectorAll('.whiteskin');
      
      // Vérifier si le point milieu est dans une section blackskin
      for (const section of blackSkinSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          setIsLight(false);
          return;
        }
      }

      // Vérifier si le point milieu est dans une section whiteskin
      for (const section of whiteSkinSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          setIsLight(true);
          return;
        }
      }

      // Par défaut, vérifier la section diagonale
      const diagonalSection = document.getElementById('diagonal-section');
      if (diagonalSection) {
        const sectionRect = diagonalSection.getBoundingClientRect();
        if (sectionRect.bottom <= viewportMiddle + 100) {
          setIsLight(false);
          return;
        }
      }
      
      setIsLight(true);
    };

    checkSection();
    window.addEventListener('scroll', checkSection);
    return () => window.removeEventListener('scroll', checkSection);
  }, [isMobile]);

  return isLight;
}; 