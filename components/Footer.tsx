import React from 'react';
import Image from 'next/image';
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

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

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 pt-12 md:pt-20 pb-6 md:pb-8 overflow-hidden">
      {/* Background pattern - adapté responsive */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-5 md:top-10 left-5 md:left-10 w-16 md:w-32 h-16 md:h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-20 md:w-40 h-20 md:h-40 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 md:w-24 h-12 md:h-24 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full blur-lg"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Top section with navigation - responsive */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16">
          {/* Left side - Navigation links */}
          <div className="mb-6 md:mb-0 w-full md:w-auto">
            <nav className="flex flex-row md:flex-col justify-center md:justify-start space-x-6 md:space-x-0 md:space-y-3">
              <button onClick={() => handleNavigation('accueil')} className="text-gray-700 hover:text-gray-900 text-sm md:text-lg font-medium transition-all duration-500 ease-out group cursor-pointer">
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                  Accueil
                </span>
              </button>
              <button onClick={() => handleNavigation('competences')} className="text-gray-700 hover:text-gray-900 text-sm md:text-lg font-medium transition-all duration-500 ease-out group cursor-pointer">
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                  Compétences
                </span>
              </button>
              <button onClick={() => handleNavigation('projets')} className="text-gray-700 hover:text-gray-900 text-sm md:text-lg font-medium transition-all duration-500 ease-out group cursor-pointer">
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                  Projets
                </span>
              </button>
              <button onClick={() => handleNavigation('parcours')} className="text-gray-700 hover:text-gray-900 text-sm md:text-lg font-medium transition-all duration-500 ease-out group cursor-pointer">
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-2">
                  Parcours
                </span>
              </button>
            </nav>
          </div>

          {/* Right side - Additional links - masqué mobile */}
          <div className="hidden md:block text-right">
            <nav className="flex flex-col space-y-3">
              <span className="text-gray-700 text-lg font-medium">Portfolio</span>
              <span className="text-gray-600 text-sm">Développement Web</span>
              <span className="text-gray-600 text-sm">Design Moderne</span>
              <span className="text-gray-600 text-sm">Solutions Créatives</span>
            </nav>
          </div>
        </div>

        {/* Center section with logo and social - responsive */}
        <div className="text-center mb-8 md:mb-16">
          {/* Logo section */}
          <div className="mb-6 md:mb-8">
            <div className="relative inline-block group">
              {/* Glow effect behind logo - réduit mobile */}
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-[#CDFB52] via-purple-500 to-pink-500 rounded-full blur-lg md:blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              
              {/* Logo - taille adaptive */}
              <div className="relative">
                <Image
                  src="/images/logo_portfolio_black.png"
                  alt="Logo Portfolio Timéo"
                  width={300}
                  height={120}
                  className="mx-auto transform group-hover:scale-105 transition-transform duration-500 w-[200px] md:w-[300px] h-auto"
                  priority
                />
              </div>
            </div>
            
            {/* Name - taille responsive */}
            <div className="mt-4 md:mt-6">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-800 tracking-wider mb-1 md:mb-2">
                TIMÉO SOËTE
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-medium">
                Développeur Web Full Stack
              </p>
            </div>
          </div>

          {/* Social icons - taille adaptive */}
          <div className="flex justify-center space-x-4 md:space-x-6">
            <a 
              href="https://github.com/symplyyy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 md:w-12 h-10 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white/40 transition-all duration-300 hover:scale-110 transform"
            >
              <FaGithub size={20} className="md:w-6 md:h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/tim%C3%A9o-so%C3%ABte-5644b8210/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 md:w-12 h-10 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white/40 transition-all duration-300 hover:scale-110 transform"
            >
              <FaLinkedinIn size={20} className="md:w-6 md:h-6" />
            </a>
            <a 
              href="mailto:timeosoete.dev@gmail.com"
              className="w-10 md:w-12 h-10 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white/40 transition-all duration-300 hover:scale-110 transform"
            >
              <HiOutlineMail size={20} className="md:w-6 md:h-6" />
            </a>
          </div>
        </div>

        {/* Bottom section - responsive */}
        <div className="border-t border-gray-400/30 pt-4 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-600 space-y-3 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-4 text-center md:text-left">
              <span>© 2025 Timéo Soëte</span>
              <span className="hidden md:inline">•</span>
              <span>Tous droits réservés</span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <span className="text-xs">Développé avec</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium">Next.js</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-xs font-medium">TypeScript</span>
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                <span className="text-xs font-medium">TailwindCSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-[#CDFB52] to-pink-500"></div>
    </footer>
  );
};

export default Footer;
