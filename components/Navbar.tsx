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
        const scrollPosition = window.scrollY;
        const headerHeight = isMobile ? 450 : 900;
        setIsInMain(scrollPosition > headerHeight * 0.8);
      },
      {
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px"
      }
    );

    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      const headerHeight = isMobile ? 450 : 900;
      setIsInMain(scrollPosition > headerHeight * 0.8);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const headerHeight = isMobile ? 450 : 900;
        setIsInMain(scrollPosition > headerHeight * 0.8);
      });
    };
  }, [isMobile]);

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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
      }}
      className="w-full flex items-center justify-between px-8 py-4"
    >
      {/* Logo à gauche */}
      <div className={`
        relative z-10 mt-7 px-4 py-2 rounded-2xl flex items-center
        transition-all duration-500 ease-in-out
        ${isInMain ? 'backdrop-blur-md backdrop-saturate-150 shadow-sm' : ''}
      `}>
        <div className="relative w-[120px] h-8 flex items-center">
          <img 
            src="/images/logo_portfolio.png"
            alt="Logo clair" 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto transition-all duration-500 ease-in-out ${
              isInMain ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
            style={{ objectFit: 'contain' }}
          />
          <img 
            src="/images/logo_portfolio_black.png"
            alt="Logo sombre" 
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto transition-all duration-500 ease-in-out ${
              isInMain ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
      
      {/* Menu Burger pour Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative z-[999] mt-7 flex flex-col justify-center items-center
            p-3 rounded-2xl
            transition-all duration-500 ease-in-out
            ${isInMain ? 'backdrop-blur-md backdrop-saturate-150 shadow-sm' : ''}
          `}
          aria-label="Menu"
        >
          <div className="w-8 h-8 relative">
            <div 
              className={`w-6 h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out origin-center ${
                isOpen 
                  ? 'rotate-45 translate-y-0 !bg-black' 
                  : `translate-y-[-6px] ${isInMain ? '!bg-black' : 'bg-white'}`
              }`}
            />
            <div 
              className={`w-6 h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out ${
                isOpen 
                  ? 'opacity-0 !bg-black' 
                  : `opacity-100 ${isInMain ? '!bg-black' : 'bg-white'}`
              }`}
            />
            <div 
              className={`w-6 h-0.5 absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out origin-center ${
                isOpen 
                  ? '-rotate-45 translate-y-0 !bg-black' 
                  : `translate-y-[6px] ${isInMain ? '!bg-black' : 'bg-white'}`
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
                    className="text-black hover:!text-[#5A1441]"
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
                <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#5A1441] transition-colors duration-300">
                  <FaGithub size={32} />
                </a>
                <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#5A1441] transition-colors duration-300">
                  <FaLinkedinIn size={32} />
                </a>
                <a href="mailto:tonemail@example.com" className="text-black hover:text-[#5A1441] transition-colors duration-300">
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
          <div className={`
            absolute left-1/2 transform -translate-x-1/2 mt-7 z-10
            px-6 py-2 rounded-2xl
            transition-all duration-500 ease-in-out
            ${isInMain ? 'backdrop-blur-md backdrop-saturate-150 shadow-sm' : ''}
          `}>
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

          <div className={`
            flex gap-4 items-center mt-7 z-10
            px-4 py-2 rounded-2xl
            transition-all duration-500 ease-in-out
            ${isInMain ? 'backdrop-blur-md backdrop-saturate-150 shadow-sm' : ''}
          `}>
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
