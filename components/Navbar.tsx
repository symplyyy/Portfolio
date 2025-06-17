'use client';

import NavLink from "./Navlink";
import Image from "next/image";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavbarColorScheme } from '@/hooks/useColorScheme';




export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const isLight = useNavbarColorScheme(isMobile);

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
      
      {/* Menu Burger pour Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[999] mt-7"
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

      {/* Menu plein écran pour Mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-[#CDFB52] z-[998]"
            style={{ position: 'fixed', height: '100vh' }}
          >
            <motion.ul
              className="flex flex-col items-center gap-8 text-2xl h-full justify-center"
              initial="closed"
              animate="open"
              exit="closed"
            >
              {['Accueil', 'Projets', 'Competences', 'Parcours'].map((item, i) => (
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
                  onClick={() => setIsOpen(false)}
                >
                  <NavLink
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-800 hover:text-[#5A1441]"
                  >
                    {item}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Desktop */}
      {!isMobile && (
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
                  <NavLink 
                    href={`#${item.toLowerCase()}`} 
                    className={isLight ? 'text-white' : 'text-gray-800'}
                  >
                    {item}
                  </NavLink>
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
              href="https://linkedin.com/in/tonprofil" 
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
              href="mailto:tonemail@example.com"
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
