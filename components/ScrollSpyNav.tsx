'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpyNavColorScheme } from '@/hooks/useColorScheme';

interface Section {
  id: string;
  label: string;
}

interface ScrollSpyNavProps {
  sections: Section[];
  isLoading?: boolean;
}

export const ScrollSpyNav: React.FC<ScrollSpyNavProps> = ({ sections, isLoading = false }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const isLight = useSpyNavColorScheme(isMobile);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Trouver la section active et calculer la progression
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const absoluteTop = rect.top + scrollPosition;
          const nextSection = sections[sections.indexOf(section) + 1];
          const nextElement = nextSection ? document.getElementById(nextSection.id) : null;
          const sectionEnd = nextElement 
            ? nextElement.getBoundingClientRect().top + scrollPosition 
            : document.documentElement.scrollHeight;

          // Gestion spéciale pour la première section (accueil)
          if (section.id === sections[0].id) {
            if (scrollPosition < sectionEnd - viewportHeight * 0.6) {
              setActiveSection(section.id);
              const sectionLength = sectionEnd - viewportHeight * 0.6;
              const currentProgress = scrollPosition / sectionLength;
              setProgress(Math.max(0, Math.min(1, currentProgress)));
              return;
            }
          }
          // Pour la section "competences"
          else if (section.id === "competences") {
            if (scrollPosition >= absoluteTop - viewportHeight * 0.6 && scrollPosition < sectionEnd - viewportHeight * 0.1) {
              setActiveSection(section.id);
              const sectionStart = absoluteTop - viewportHeight * 0.6;
              const sectionLength = sectionEnd - sectionStart - viewportHeight * 0.1;
              const currentProgress = (scrollPosition - sectionStart) / sectionLength;
              setProgress(Math.max(0, Math.min(1, currentProgress)));
              return;
            }
          }
          // Pour la section "projets" (gestion spéciale à cause du clipPath)
          else if (section.id === "projets") {
            // Détection pour la section projets
            const parcoursElement = document.getElementById("parcours");
            const parcoursTop = parcoursElement ? parcoursElement.getBoundingClientRect().top + scrollPosition : sectionEnd;
            
            if (rect.top <= viewportHeight * 0.6 || scrollPosition >= absoluteTop - viewportHeight * 0.7) {
              // Vérifier si on n'est pas encore trop proche de la section parcours
              if (scrollPosition < parcoursTop - viewportHeight * 0.4) {
                setActiveSection(section.id);
                const sectionStart = absoluteTop - viewportHeight * 0.7;
                // La section se termine quand on arrive près de parcours
                const effectiveSectionEnd = parcoursTop - viewportHeight * 0.4;
                const sectionLength = effectiveSectionEnd - sectionStart;
                const currentProgress = (scrollPosition - sectionStart) / sectionLength;
                setProgress(Math.max(0, Math.min(1, currentProgress)));
                return;
              }
            }
          }
          // Pour la section "parcours" (dernière section)
          else if (section.id === "parcours") {
            // Condition pour détecter l'entrée dans parcours
            if (rect.top <= viewportHeight * 0.6) {
              setActiveSection(section.id);
              const sectionStart = absoluteTop - viewportHeight * 0.4;
              
              // Pour la section parcours, calculer la fin en excluant le footer
              const footerElement = document.querySelector('footer');
              let realSectionEnd;
              if (footerElement) {
                realSectionEnd = footerElement.getBoundingClientRect().top + scrollPosition;
              } else {
                // Fallback: utiliser la fin de l'élément parcours
                realSectionEnd = absoluteTop + rect.height;
              }
              
              const sectionLength = realSectionEnd - sectionStart;
              const currentProgress = Math.max(0, (scrollPosition - sectionStart) / sectionLength);
              setProgress(Math.max(0, Math.min(1, currentProgress)));
              return;
            }
          }
          // Pour les autres sections
          else if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.3) {
            setActiveSection(section.id);
            const sectionLength = sectionEnd - absoluteTop;
            const currentProgress = (scrollPosition - absoluteTop) / sectionLength;
            setProgress(Math.max(0, Math.min(1, currentProgress)));
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier la position initiale
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        const easeOutQuint = (t: number) => {
          return 1 - Math.pow(1 - t, 5);
        };

        const run = startPosition + distance * easeOutQuint(progress);
        window.scrollTo(0, run);

        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  };

  // Si on est en mobile, ne pas rendre le composant
  if (isMobile) return null;

  return (
    <motion.nav 
      initial={{ opacity: 0, x: -50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : -50 
      }}
      transition={{ 
        duration: 1,
        ease: "easeOut",
        delay: 0.2
      }}
      className="fixed left-8 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-[9999]"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => handleClick(id)}
          onMouseEnter={() => setHoveredSection(id)}
          onMouseLeave={() => setHoveredSection(null)}
          className="relative group flex items-center cursor-pointer h-8"
          aria-label={`Naviguer vers ${label}`}
        >
          <div className="relative cursor-pointer">
            <motion.div
              className={`w-[10px] h-[10px] rounded-full border-2 transition-colors duration-300 ${
                isLight ? 'border-white' : 'border-gray-800'
              } ${
                activeSection === id 
                  ? isLight ? 'bg-white' : 'bg-gray-800'
                  : 'bg-transparent'
              }`}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.2 }}
            />
            {activeSection === id && (
              <svg
                className="absolute -inset-[6px] w-[22px] h-[22px]"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Cercle de fond */}
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  stroke={isLight ? 'rgba(255, 255, 255, 0.2)' : 'rgba(26, 26, 26, 0.2)'}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Cercle de progression */}
                <motion.circle
                  cx="22"
                  cy="22"
                  r="20"
                  stroke={isLight ? 'white' : '#1a1a1a'}
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress }}
                  transition={{
                    duration: 0.1,
                    ease: "linear"
                  }}
                  style={{
                    rotate: '-90deg',
                    transformOrigin: 'center',
                  }}
                />
              </svg>
            )}
          </div>
          <AnimatePresence mode="wait">
            {(activeSection === id || hoveredSection === id) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className={`absolute left-8 ml-2 px-4 py-1.5 rounded-full text-sm backdrop-blur-sm
                  transition-colors duration-300
                  ${isLight ? 'text-white bg-white/10' : 'text-gray-800 bg-gray-800/10'}
                  border ${isLight ? 'border-white/20' : 'border-gray-800/20'}`}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      ))}
    </motion.nav>
  );
}; 