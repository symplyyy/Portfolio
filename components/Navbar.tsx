import NavLink from "./Navlink";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInMain, setIsInMain] = useState(false);
  const navRef = useRef(null);

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInMain(entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: "-150px 0px 0px 0px"
      }
    );

    const mainElement = document.querySelector('main');
    if (mainElement) {
      observer.observe(mainElement);
    }

    return () => {
      if (mainElement) {
        observer.unobserve(mainElement);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <nav 
      ref={navRef}
      style={{ 
        backgroundColor: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      }}
      className="w-full flex items-center justify-between px-8 py-4"
    >
      {/* Logo à gauche */}
      <div className="relative z-10">
        <div className="relative w-[120px] h-8 mt-7">
          <img 
            src="/images/logo_portfolio.png"
            alt="Logo clair" 
            className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-300 ease-in-out ${
              isInMain ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ objectFit: 'contain' }}
          />
          <img 
            src="/images/logo_portfolio_black.png"
            alt="Logo sombre" 
            className={`absolute top-0 left-0 h-full w-auto transition-opacity duration-300 ease-in-out ${
              isInMain ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      
      {/* Menu Burger pour Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-20 mt-7 w-8 h-8 flex flex-col justify-center items-center"
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 absolute transition-all duration-300 ${
            isOpen 
              ? 'bg-black rotate-45 translate-y-0' 
              : isInMain ? 'bg-black' : 'bg-[#FFFFF7] translate-y-[-6px]'
          }`} />
          <div className={`w-6 h-0.5 absolute transition-all duration-300 ${
            isOpen 
              ? 'bg-black opacity-0' 
              : isInMain ? 'bg-black' : 'bg-[#FFFFF7]'
          }`} />
          <div className={`w-6 h-0.5 absolute transition-all duration-300 ${
            isOpen 
              ? 'bg-black -rotate-45 translate-y-0' 
              : isInMain ? 'bg-black' : 'bg-[#FFFFF7] translate-y-[6px]'
          }`} />
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
            className="fixed inset-0 bg-[#CDFB52] z-30"
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
                    className=" hover:!text-[#5A1441]"
                  >
                    {item}
                  </NavLink>
                </motion.li>
              ))}
              <motion.div
                className="flex gap-6 mt-8"
                variants={{
                  open: {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4 }
                  },
                  closed: { opacity: 0, y: 20 }
                }}
              >
                <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className=" hover:text-[#5A1441] transition-colors duration-300">
                  <FaGithub size={32} />
                </a>
                <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="hover:text-[#5A1441] transition-colors duration-300">
                  <FaLinkedinIn size={32} />
                </a>
                <a href="mailto:tonemail@example.com" className="hover:text-[#5A1441] transition-colors duration-300">
                  <HiOutlineMail size={32} />
                </a>
              </motion.div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Desktop */}
      {!isMobile && (
        <>
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-7 z-10">
            <ul className="flex gap-6 items-center">
              {['Accueil', 'Projets', 'Competences', 'Parcours'].map((item) => (
                <li key={item}>
                  <NavLink 
                    href={`#${item.toLowerCase()}`} 
                    className={isInMain ? 'text-black hover:!text-[#CDFB52]' : ''}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 items-center mt-7 z-10">
            <a 
              href="https://github.com/tonprofil" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-all duration-300 ${isInMain ? 'text-black' : 'text-[#FFFFF7]'} hover:text-[#CDFB52]`}
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/tonprofil" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`transition-all duration-300 ${isInMain ? 'text-black' : 'text-[#FFFFF7]'} hover:text-[#CDFB52]`}
            >
              <FaLinkedinIn size={24} />
            </a>
            <a 
              href="mailto:tonemail@example.com"
              className={`transition-all duration-300 ${isInMain ? 'text-black' : 'text-[#FFFFF7]'} hover:text-[#CDFB52]`}
            >
              <HiOutlineMail size={24} />
            </a>
          </div>
        </>
      )}
    </nav>
  );
}
