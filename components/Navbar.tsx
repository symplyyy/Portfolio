'use client';


import Image from "next/image";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbarColorScheme } from '@/hooks/useColorScheme';




export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const navRef = useRef(null);
  const isLight = useNavbarColorScheme(isMobile || isTablet);

  // Fonction de navigation fluide vers les sections
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
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

  // Mapping des noms d'affichage vers les IDs réels
  const getSectionId = (displayName: string): string => {
    const mapping: { [key: string]: string } = {
      'Accueil': 'accueil',
      'Compétences': 'competences',
      'Projets': 'projets',
      'Parcours': 'parcours'
    };
    return mapping[displayName] || displayName.toLowerCase();
  };

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (

    

    <motion.nav 
      ref={navRef}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
      className={`w-full flex items-center justify-between px-8 py-4 transition-colors duration-300 ${
        isLight ? 'text-white' : 'text-gray-800'
      }`}
    >
      {/* Logo à gauche */}
      <div className="relative z-10 mt-7">
        <div className="relative w-[120px] h-8 flex items-center">
          <Image 
            src="/images/logo_portfolio.png"
            alt="Logo clair" 
            width={120}
            height={32}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto transition-all duration-500 ease-in-out ${
              isLight ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ objectFit: 'contain' }}
          />
          <Image 
            src="/images/logo_portfolio_black.png"
            alt="Logo sombre" 
            width={120}
            height={32}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto transition-all duration-500 ease-in-out ${
              isLight ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      
      {/* Menu Burger pour Mobile et Tablette */}
      {(isMobile || isTablet) && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[999] mt-7 cursor-pointer"
          aria-label="Menu"
        >
          <div className="w-8 h-8 relative">
            <div 
              className={`w-6 h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out origin-center ${
                isOpen 
                  ? 'rotate-45 translate-y-0 !bg-gray-800' 
                  : `translate-y-[-6px] ${isLight ? 'bg-white' : 'bg-gray-800'}`
              }`}
            />
            <div 
              className={`w-6 h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out ${
                isOpen 
                  ? 'opacity-0 !bg-gray-800' 
                  : `opacity-100 ${isLight ? 'bg-white' : 'bg-gray-800'}`
              }`}
            />
            <div 
              className={`w-6 h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out origin-center ${
                isOpen 
                  ? '-rotate-45 translate-y-0 !bg-gray-800' 
                  : `translate-y-[6px] ${isLight ? 'bg-white' : 'bg-gray-800'}`
              }`}
            />
          </div>
        </button>
      )}

      {/* Menu plein écran pour Mobile et Tablette */}
      <AnimatePresence>
        {isOpen && (isMobile || isTablet) && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#CDFB52] z-[998]"
            style={{ position: 'fixed', height: '100vh' }}
          >
            <div className="flex flex-col items-center h-full justify-center">
              <motion.ul
                className={`flex flex-col items-center gap-8 mb-12 ${
                  isTablet ? 'text-3xl' : 'text-2xl'
                }`}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {['Accueil', 'Compétences', 'Projets', 'Parcours'].map((item, i) => (
                  <motion.li
                    key={item}
                    variants={{
                      open: {
                        opacity: 1,
                        y: 0,
                        transition: { delay: i * 0.1 }
                      },
                      closed: { opacity: 0, y: 20 }
                    }}
                    onClick={() => {
                      handleNavigation(getSectionId(item));
                      setIsOpen(false);
                    }}
                  >
                    <button
                      className={`relative px-4 py-3 text-sm uppercase italic tracking-widest transition-all duration-300 rounded-xl hover:bg-[#5A1441] hover:text-white hover:scale-105 hover:shadow-md text-gray-800 cursor-pointer ${
                        isTablet ? 'px-6 py-4' : 'px-4 py-3'
                      }`}
                    >
                      {item}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Icônes sociales dans le menu mobile/tablette */}
              <motion.div
                className={`flex gap-6 ${isTablet ? 'gap-8' : 'gap-6'}`}
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5 }
                  },
                  closed: { opacity: 0, y: 20 }
                }}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <a 
                  href="https://github.com/symplyyy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-gray-800/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-800/20 transition-all duration-300 hover:scale-110 transform ${
                    isTablet ? 'w-16 h-16' : 'w-12 h-12'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaGithub size={isTablet ? 32 : 24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/tim%C3%A9o-so%C3%ABte-5644b8210/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-gray-800/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-800/20 transition-all duration-300 hover:scale-110 transform ${
                    isTablet ? 'w-16 h-16' : 'w-12 h-12'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <FaLinkedinIn size={isTablet ? 32 : 24} />
                </a>
                <a 
                  href="mailto:timeosoete.dev@gmail.com"
                  className={`bg-gray-800/10 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-gray-800/20 transition-all duration-300 hover:scale-110 transform ${
                    isTablet ? 'w-16 h-16' : 'w-12 h-12'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <HiOutlineMail size={isTablet ? 32 : 24} />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Desktop uniquement */}
      {!isMobile && !isTablet && (
        <>
          <div className={`
            absolute left-1/2 transform -translate-x-1/2 mt-7 z-10
            px-6 py-2 rounded-2xl
            transition-all duration-500 ease-in-out
            backdrop-blur-md backdrop-saturate-150 shadow-sm
          `}>
            <ul className="flex gap-6 items-center">
              {['Accueil', 'Compétences', 'Projets',  'Parcours'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => handleNavigation(getSectionId(item))}
                    className={`relative px-3 py-2 text-sm uppercase italic tracking-widest transition-all duration-300 rounded-xl hover:bg-[#CDFB52] hover:!text-black hover:scale-105 hover:shadow-md cursor-pointer ${isLight ? 'text-white' : 'text-gray-800'}`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 items-center mt-7 z-10">
            <a 
              href="https://github.com/symplyyy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-all duration-300 hover:scale-110 transform will-change-transform ${isLight ? 'text-white' : 'text-gray-800'}`}
              style={{ 
                transform: 'translateZ(0)',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#CDFB52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
              }}
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/tim%C3%A9o-so%C3%ABte-5644b8210/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-all duration-300 hover:scale-110 transform will-change-transform ${isLight ? 'text-white' : 'text-gray-800'}`}
              style={{ 
                transform: 'translateZ(0)',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#CDFB52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
              }}
            >
              <FaLinkedinIn size={24} />
            </a>
            <a 
              href="mailto:timeosoete.dev@gmail.com"
              className={`transition-all duration-300 hover:scale-110 transform will-change-transform ${isLight ? 'text-white' : 'text-gray-800'}`}
              style={{ 
                transform: 'translateZ(0)',
                color: 'inherit'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#CDFB52';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'inherit';
              }}
            >
              <HiOutlineMail size={24} />
            </a>
          </div>
        </>
      )}
    </motion.nav>
  );
}
