import NavLink from "./Navlink";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      document.body.style.height = '100vh';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
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
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-[100]">
      {/* Logo à gauche */}
      <div className="relative z-[100]">
        <img src="/images/logo_portfolio.png" alt="Logo" className="h-8 mt-7" />
      </div>
      
      {/* Menu Burger pour Mobile */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[1000] mt-7 w-8 h-8 flex flex-col justify-center items-center"
          aria-label="Menu"
        >
          <div className={`w-6 h-0.5 absolute transition-all duration-300 ${
            isOpen 
              ? 'bg-black rotate-45 translate-y-0' 
              : 'bg-[#FFFFF7] translate-y-[-6px]'
          }`} />
          <div className={`w-6 h-0.5 absolute transition-all duration-300 ${
            isOpen 
              ? 'bg-black opacity-0' 
              : 'bg-[#FFFFF7]'
          }`} />
          <div className={`w-6 h-0.5 absolute transition-all duration-300 ${
            isOpen 
              ? 'bg-black -rotate-45 translate-y-0' 
              : 'bg-[#FFFFF7] translate-y-[6px]'
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
            className="fixed inset-0 bg-[#CDFB52] z-[999] flex items-center justify-center"
            style={{ position: 'fixed', height: '100vh' }}
          >
            <motion.ul
              className="flex flex-col gap-12 items-center w-full px-8"
              initial="closed"
              animate="open"
              exit="closed"
            >
              {['Accueil', 'Projets', 'Competences', 'Parcours'].map((item, i) => (
                <motion.li
                  key={item}
                  className="w-full"
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
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-black hover:text-[#5A1441] transition-colors duration-300 font-bold tracking-wider text-3xl block w-full text-center"
                  >
                    {item.toUpperCase()}
                  </a>
                </motion.li>
              ))}
              <motion.div
                className="flex gap-8 mt-12"
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
                  <FaGithub size={36} />
                </a>
                <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#5A1441] transition-colors duration-300">
                  <FaLinkedinIn size={36} />
                </a>
                <a href="mailto:tonemail@example.com" className="text-black hover:text-[#5A1441] transition-colors duration-300">
                  <HiOutlineMail size={36} />
                </a>
              </motion.div>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Desktop */}
      {!isMobile && (
        <>
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-7 z-[100]">
            <ul className="flex gap-6 items-center">
              <li><NavLink href="#accueil">Accueil</NavLink></li>
              <li><NavLink href="#competences">Compétences</NavLink></li>
              <li><NavLink href="#projets">Projets</NavLink></li>
              <li><NavLink href="#parcours">Parcours</NavLink></li>
            </ul>
          </div>

          <motion.div 
            className="flex gap-4 items-center mt-7 relative z-[100]"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className="text-[#FFFFF7] hover:text-[#CDFB52] transition-colors duration-300">
              <FaGithub size={24} />
            </a>
            <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="text-[#FFFFF7] hover:text-[#CDFB52] transition-colors duration-300">
              <FaLinkedinIn size={24} />
            </a>
            <a href="mailto:tonemail@example.com" className="text-[#FFFFF7] hover:text-[#CDFB52] transition-colors duration-300">
              <HiOutlineMail size={24} />
            </a>
          </motion.div>
        </>
      )}
    </nav>
  );
}
