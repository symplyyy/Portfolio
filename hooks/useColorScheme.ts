import { useState, useEffect } from 'react';

interface ColorScheme {
  isNavbarLight: boolean;
  isScrollSpyLight: boolean;
}

export const useColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>({
    isNavbarLight: true,
    isScrollSpyLight: true
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Points de changement (à ajuster selon vos besoins)
      const presentationSection = document.querySelector('.flex-1.space-y-2');
      const diagonalSection = document.getElementById('diagonal-section');
      const competencesSection = document.getElementById('competences');

      if (!presentationSection || !diagonalSection || !competencesSection) return;

      const presentationTop = presentationSection.getBoundingClientRect().top + window.scrollY;
      const diagonalTop = diagonalSection.getBoundingClientRect().top + window.scrollY;
      const competencesTop = competencesSection.getBoundingClientRect().top + window.scrollY;

      // Logique pour la Navbar
      const isNavbarLight = 
        scrollPosition < (presentationTop - viewportHeight * 0.5) || // Blanc en haut
        (scrollPosition >= (diagonalTop - viewportHeight * 0.3) && // Blanc dans diagonal-section
         scrollPosition < (competencesTop - viewportHeight * 0.3));

      // Logique pour la ScrollSpyNav
      const isScrollSpyLight = 
        scrollPosition < (presentationTop - viewportHeight * 0.5) || // Blanc en haut
        (scrollPosition >= (diagonalTop - viewportHeight * 0.3) && // Blanc dans diagonal-section
         scrollPosition < (competencesTop - viewportHeight * 0.3));

      setColorScheme({
        isNavbarLight,
        isScrollSpyLight
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier l'état initial

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return colorScheme;
}; 