import NavLink from "./Navlink";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50">
      {/* Logo à gauche */}
      <div>
        <img src="/images/logo_portfolio.png" alt="Logo" className="h-8 mt-7" />
      </div>
      
      

      {/* Liens centrés */}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-7">
        <ul className="flex gap-6 items-center">
          <li><NavLink href="#accueil">Accueil</NavLink></li>
          <li><NavLink href="#projets">Projets</NavLink></li>
          <li><NavLink href="#competences">Competences</NavLink></li>
          <li><NavLink href="#parcours">Parcours</NavLink></li>
        </ul>
      </div>

      {/* Icônes à droite */}
      <div className="flex gap-4 items-center mt-7">
      <a href="https://github.com/tonprofil" target="_blank" rel="noopener noreferrer" className="text-whiteg hover:text-[#CDFB52] transition-colors text-lg">
        <FaGithub />
        </a>
        <a href="https://linkedin.com/in/tonprofil" target="_blank" rel="noopener noreferrer" className="text-whiteg hover:text-[#CDFB52] transition-colors text-lg">
          <FaLinkedinIn />
        </a>
        <a href="mailto:tonemail@example.com" className="text-whiteg hover:text-[#CDFB52] transition-colors text-lg">
          <HiOutlineMail />
        </a>
        
      </div>
    </nav>
  );
}
