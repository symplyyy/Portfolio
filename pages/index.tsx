import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { BoxReveal } from "@/components/magicui/box-reveal";
import LoadingScreen from "@/components/LoadingScreen";
import DiagonalRevealText from "@/components/DiagonalRevealText";
import ScrollFloat from "../components/ScrollFloat";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";
import RevealOnScroll from "../components/RevealOnScroll";
import SkillCard from "../components/SkillCard";
import ProfileCard from "../components/ProfileCard";
import Timeline from "../components/Timeline";
import Footer from "../components/Footer";

/* TODO : Ajout mode nuit */

const sections = [
  { id: "accueil", label: "Accueil" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "parcours", label: "Parcours" },
];


const projects = [
  {
    title: "Application web de gestion de projets et cartographie interactive pour un laboratoire",
    description: "Plateforme web permettant de gérer les projets d'un laboratoire et de visualiser ses relations internationales à travers une carte interactive.",
    imageUrl: "/images/projects/mockups/labo.png",  
    projectUrl: "",
    technologies: ["Symfony", "PostgreSQL", "Bootstrap"]
  },
  {
    title: "Terracorsica",
    description: "Site web proposant des parcours de randonnée en Corse (GR20).",
    imageUrl: "/images/projects/mockups/terracorsica.png",
    projectUrl: "https://terracorsica.akifi.etu.mmi-unistra.fr/",
    technologies: ["Symfony", "MySQL", "API Google Maps"]
  },
  {
    title: "Statify",
    description: "Application web permettant de visualiser les statistiques de son compte Spotify.",
    imageUrl: "/images/projects/mockups/statify.png",
    projectUrl: "https://statify.soete.etu.mmi-unistra.fr/",
    technologies: ["Javascript", "API Spotify", "D3.js"]
  },
  {
    title: "Application de suivi de consommation énergétique",
    description: "Application web permettant de suivre la consommation énergétique de l'IUT de Haguenau.",
    imageUrl: "/images/projects/mockups/conso.png",
    projectUrl: "https://sae501.mehr.soete.etu.mmi-unistra.fr/",
    technologies: ["Laravel", "Chart.js", "TailwindCSS", "MySQL", "Python"]
  },
  {
    title: "Plugin mode de jeu 'Invisible' CS2",
    description: "Plugin permettant d'implémenter un mode jeu se basant sur l'invisibilité dans Counter-Strike 2 sur serveur dédié.",
    imageUrl: "/images/projects/mockups/conso.png",
    projectUrl: "https://github.com/symplyyy/InvisiblePluginCS2",
    technologies: ["C#"]
  },
  {
    title: "Application web de suivi des vols en direct",
    description: "Application web permettant de visualiser les vols en direct à travers le monde.",
    imageUrl: "/images/projects/mockups/globe.png",
    projectUrl: "",
    technologies: ["Javascript", "D3.js", "Opensky Network API"]
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Effet pour les animations qui démarrent après le chargement
  useEffect(() => {
    if (isLoading) return;

    const cloudData: {
      el: HTMLImageElement;
      x: number;
      speed: number;
    }[] = [];

    const createClouds = (
      ref: React.RefObject<HTMLDivElement | null>,
      src: string,
      baseSpeed: number,
      options?: {
        isMini?: boolean;
        yRange?: [number, number];
        numClouds?: number;
        horizontalMargin?: number;
        jitterFactor?: number;
      }
    ) => {
      if (!ref.current) return;
    
      const localUsedY: number[] = [];
      const num = options?.numClouds ?? 6;
      const margin = options?.horizontalMargin ?? 300;
      const jitter = options?.jitterFactor ?? 0.3;
    
      const totalWidth = window.innerWidth + margin * 2;
      const segmentWidth = totalWidth / num;
    
      const generateY = (range: [number, number]) => {
        let y: number;
        let attempts = 0;
        do {
          y = Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
          attempts++;
        } while (
          localUsedY.some((usedY) => Math.abs(usedY - y) < 10) &&
          attempts < 10
        );
        localUsedY.push(y);
        return y;
      };
    
      for (let i = 0; i < num; i++) {
        const cloud = document.createElement("img");
        cloud.src = src;
        cloud.className = "cloud opacity-0";
        if (options?.isMini) cloud.classList.add("minicloud");
    
        const baseX = -margin + i * segmentWidth;
        const x =
          baseX +
          segmentWidth / 2 +
          (Math.random() * 2 - 1) * (segmentWidth * jitter);
    
        const yFinal = generateY(options?.yRange || [10, 90]);
    
        const baseScale = options?.isMini
          ? Math.random() * 0.3 + 0.3
          : Math.random() * 0.5 + 0.9;
        
        // Réduire la taille de 20%
        const scale = baseScale * 0.8;
        cloud.dataset.scale = scale.toString();
    
        cloud.style.top = "100%";
        cloud.style.transform = `translateX(${x}px) scale(${scale})`;
        ref.current.appendChild(cloud);

        setTimeout(() => {
          cloud.style.top = `${yFinal}%`;
          cloud.classList.remove("opacity-0");
        }, 100 + i * 50);
    
        cloudData.push({
          el: cloud,
          x,
          speed: baseSpeed * (Math.random() * 0.4 + 0.4),
        });
      }
    };

    // Créer les nuages avec un léger délai pour laisser le temps à la transition du chargement
    setTimeout(() => {
      createClouds(layer1Ref, "/images/header/clouds.png", 0.15, {
        yRange: [5, 25],
        numClouds: 3,
      });
      createClouds(layer2Ref, "/images/header/clouds 2.png", 0.1, {
        yRange: [25, 45],
        numClouds: 4,
      });
      createClouds(layer3Ref, "/images/header/minicloud.png", 0.05, {
        isMini: true,
        yRange: [30, 55],
        numClouds: 2,
      });
    }, 100);

    let rafId: number;

    const animate = () => {
      const scrollY = window.scrollY;

      // Parallax uniquement sur les nuages (vitesses réduites)
      if (layer1Ref.current)
        layer1Ref.current.style.transform = `translateY(${-scrollY * 0.15}px)`;
      if (layer2Ref.current)
        layer2Ref.current.style.transform = `translateY(${-scrollY * 0.25}px)`;
      if (layer3Ref.current)
        layer3Ref.current.style.transform = `translateY(${-scrollY * 0.35}px)`;

      cloudData.forEach((cloud) => {
        cloud.x -= cloud.speed;
      
        if (
          cloud.x < -cloud.el.offsetWidth ||
          cloud.x > window.innerWidth + cloud.el.offsetWidth
        ) {
          const fromRight = Math.random() < 0.5;
          const margin = 300;
          cloud.x = fromRight
            ? window.innerWidth + Math.random() * margin
            : -cloud.el.offsetWidth - Math.random() * margin;
        }
      
        const scale = cloud.el.dataset.scale || "1";
        cloud.el.style.transform = `translateX(${cloud.x}px) scale(${scale})`;
      });

      rafId = requestAnimationFrame(animate);
    };

    const animationTimer = setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, 1000);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(animationTimer);
    };
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>Portfolio - Timéo Soëte</title>
        <meta name="description" content="Portfolio de Timéo Soëte - Développeur Web Frontend & Backend spécialisé en React, Next.js, PHP et technologies modernes." />
      </Head>
      
      <div className="relative w-full h-full">
        {/* Container principal avec contexte d'empilement */}
        <div className="relative w-full min-h-screen" style={{ isolation: 'isolate' }}>
          <Navbar />
          <ScrollSpyNav sections={sections} isLoading={isLoading} />
        
        {/* Fond de transition */}
        <div 
          className={`fixed inset-0 bg-center bg-no-repeat transition-opacity duration-1000 ${
            isLoading ? 'opacity-100 z-[50]' : 'opacity-0 z-[-1]'
          }`}
          style={{
            backgroundImage: "url('/images/header/background.png')",
            backgroundSize: "100% 100%",
          }}
        />
        {isLoading && (
          <div className="fixed inset-0 z-[9999]">
            <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
          </div>
        )}
        <div className={`w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <header
            id="accueil"
            className=" whiteskin
              relative
              h-[55rem]
              sm:h-[60rem]
              md:h-[90rem]
              w-full
              z-[40]
              bg-center
              bg-no-repeat
              flex flex-col items-center
              pt-0
              md:pt-[200px]
              mb-0
              overflow-hidden
            "
            style={{
              backgroundImage: "url('/images/header/background.png')",
              backgroundSize: "100% 100%",
              position: "relative"
            }}
          >
            {/* Grands nuages derrière */}
            <div className="clouds-container" style={{ zIndex: 1, pointerEvents: 'none' }}>
              <div ref={layer1Ref} className="clouds-layer" style={{ pointerEvents: 'none' }} />
              <div ref={layer2Ref} className="clouds-layer" style={{ pointerEvents: 'none' }} />
            </div>

            <div
              ref={parallaxRef}
              className={`relative z-[2] flex flex-col justify-center items-center px-4 md:h-auto sm:mt-50 mt-0 md:mt-5 h-screen -mt-20 md:mt-0 ${
                !isLoading ? 'zoom-in' : 'opacity-0 scale-50'
              }`}
            >
              <Image
                src="/images/logo_portfolio.png"
                alt="Portfolio logo"
                width={1000}
                height={400}
                className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[1000px] mb-4 md:mb-25"
                priority
              />
              <p className="text-whiteg z-[1] relative font-artegra text-xs sm:text-sm md:text-base tracking-widest font-medium text-center">
                TIMÉO SOËTE / DÉVELOPPEUR WEB
              </p>
            </div>

            {/* Mini-clouds devant */}
            <div className="clouds-container" style={{ zIndex: 3, pointerEvents: 'none' }}>
              <div ref={layer3Ref} className="clouds-layer" style={{ pointerEvents: 'none' }} />
            </div>
          </header>

          <main>
            <section 

              className={`mt-0 px-4 md:px-6 pb-0 md:pb-10 blackskin w-full mb-2 max-w-8xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0 transition-all duration-1000 delay-500 ${
                !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} 
              style={{ position: 'relative', zIndex: 20 }}
            >
              <div className="flex-1 space-y-2 max-w-full md:max-w-[800px] z-[1] scale-[0.8] md:scale-100 origin-top">
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                    Je m&apos;appelle Timéo
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                    je donne vie aux idées sur le web.
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                    Entre lignes de code et pixels bien
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                    placés je conçois des sites modernes,
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                    dynamiques et accessibles.
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                    Ce portfolio est ma vitrine,
                  </p>
                </BoxReveal>
                <div className="relative inline-block">
                  <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                    <p className="bg-black text-white text-lg md:text-3xl font-bold px-4 pr-8 md:pr-10 py-2 md:py-2.5 inline-block clip-triangle-right">
                      n&apos;hésitez pas à explorer !
                    </p>
                  </BoxReveal>
                </div>
              </div>

              <div className="md:ml-6 flex justify-center animate-float order-first md:order-last hidden md:flex">
                <Image
                  src="/images/avatar.png"
                  alt="Développeur sur un nuage"
                  width={600}
                  height={600}
                  className="w-[280px] md:w-[500px] max-w-full"
                />
              </div>
            </section>
            <section className="relative py-3 whiteskin overflow-x-hidden mt-[-3rem]" id="diagonal-section">
              <div className="space-y-[-40px] sm:space-y-[-60px] md:space-y-[-120px]">
                <DiagonalRevealText 
                  text="FRONTEND & BACKEND" 
                  backgroundColor="#69B7EE"
                  angle={45}
                  index={0}
                />
                <DiagonalRevealText 
                  text="DESIGN RESPONSIVE" 
                  backgroundColor="#E5A4E1"
                  angle={60}
                  index={1}
                />
                <DiagonalRevealText 
                  text="PERFORMANCE & SEO" 
                  backgroundColor="#5A1441"
                  angle={27}
                  index={2}
                />
                <DiagonalRevealText 
                  text="ACCESSIBILITÉ" 
                  backgroundColor="#FF9776"
                  angle={40}
                  index={3}
                />
              </div>
            </section>

            {/* Nouveau bloc bleu */}
            <section 
              id="competences"
              className="relative blackskin w-full h-auto -mt-40 md:-mt-60 flex items-center justify-center flex-col pt-[5rem] md:pt-[15rem] pb-15"
            >
              <div className="relative mb-4 md:mb-16 pt-12 md:pt-0">
                <ScrollFloat
                  containerClassName="text-[#6299CE] text-[5rem] pb-[0.5rem] sm:text-[2rem] md:text-[6rem] font-black tracking-wider translate-y-12 md:translate-y-20"
                >
                  COMPÉTENCES
                </ScrollFloat>
              </div>
              
              <div className="relative z-10 bg-[#2f6faa]/80 backdrop-blur-sm rounded-full px-4 md:px-8 mt-10 py-1.5 md:py-3 shadow-lg mb-8 md:mb-16">
                <p className="text-white text-center text-sm md:text-lg lg:text-xl font-medium">
                  Chaque carte détaille mes compétences clés.
                </p>
              </div>
              
              {/* Cartes de compétences */}
              <div className="relative z-10 w-[95%] sm:w-[85%] lg:w-[80%] mx-auto px-2 sm:px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 auto-rows-fr">
                  
                  <RevealOnScroll delay={0} className="w-full h-full">
                    <SkillCard
                      title="Frontend"
                      description="Création d'interfaces utilisateur modernes et réactives avec les dernières technologies web."
                      hideDescriptionOnMobile={true}
                      iconSvg={(
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      technologies={["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Bootstrap"]}
                      gradientFrom="from-blue-500"
                      gradientTo="to-purple-600"
                    />
                  </RevealOnScroll>

                  <RevealOnScroll delay={150} className="w-full h-full">
                    <SkillCard
                      title="Backend"
                      description="Développement d'applications serveur avec PHP et Node.js, gestion de bases de données relationnelles."
                      hideDescriptionOnMobile={true}
                      iconSvg={(
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                      )}
                      technologies={["C#", "PHP", "Laravel", "Symfony", "Node.js", "PostgreSQL"]}
                      gradientFrom="from-green-500"
                      gradientTo="to-teal-600"
                    />
                  </RevealOnScroll>

                  <RevealOnScroll delay={300} className="w-full h-full md:col-span-2 lg:col-span-1">
                    <SkillCard
                      title="Autre"
                      description="Maîtrise des outils de design, de gestion de version et de développement de jeux pour des projets créatifs complets."
                      hideDescriptionOnMobile={true}
                      iconSvg={(
                        <svg className="w-6 sm:w-8 h-6 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      )}
                      technologies={["Git", "Unity", "WordPress", "Photoshop", "Illustrator", "Figma"]}
                      gradientFrom="from-orange-500"
                      gradientTo="to-red-600"
                    />
                  </RevealOnScroll>
                </div>
              </div>
            </section>

            {/* Section Projets */}
            

            {/* Section À propos */}
            <section 
              id="projets"
              style={{
                background: 'linear-gradient(135deg, #A2B6CF 0%, #8AA9CC 100%)'
              }}
              className="relative w-full whiteskin flex items-center justify-center flex-col pt-5 md:pt-5 pb-40 projects-section"
            >
              
              <div className="relative mb-4 md:mb-16">
                <ScrollFloat
                  containerClassName="text-white text-[1.8rem] pb-[1rem] sm:text-[2rem] md:text-[6rem] font-black tracking-wider translate-y-12 md:translate-y-20"
                >
                  MES PROJETS
                </ScrollFloat>
              </div>
              
              <div className="relative z-10 bg-[#CDFB52]/80 backdrop-blur-sm rounded-full px-4 md:px-8 mt-10 py-1.5 md:py-3 shadow-lg mb-8 md:mb-16">
                <p className="text-black text-center text-sm md:text-lg lg:text-xl font-medium">
                  Explorez mes réalisations en détail
                </p>
              </div>

              {/* Version desktop - Carrousel */}
              <div className="relative z-10 w-full px-4 overflow-hidden hidden md:block">
                <div className="relative w-[70%] max-w-[1200px] mx-auto">
                  {/* Flèche gauche optimisée */}
                  <button
                    onClick={() => {
                      setCurrentIndex(prev => Math.max(0, prev - 1));
                    }}
                    disabled={currentIndex === 0}
                    className="absolute -left-16 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 shadow-lg will-change-transform"
                    style={{ 
                      backgroundColor: currentIndex === 0 ? '#8B9D6B' : '#CDFB52',
                      color: '#1f2937',
                      opacity: currentIndex === 0 ? 0.6 : 1,
                      transform: 'translateZ(0)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.transform = 'scale3d(1.1, 1.1, 1) translateZ(0)';
                        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {/* Flèche droite optimisée */}
                  <button
                    onClick={() => {
                      // Calcul pour s'assurer qu'on ne dépasse pas la position optimale
                      // Si on a moins de 3 projets, on ne peut pas défiler
                      // Sinon, le dernier index possible est (nombre de projets - 3)
                      const maxIndex = projects.length <= 3 ? 0 : projects.length - 3;
                      setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
                    }}
                    disabled={projects.length <= 3 || currentIndex >= projects.length - 3}
                    className="absolute -right-16 top-1/2 -translate-y-1/2 z-20 rounded-full p-3 shadow-lg will-change-transform"
                    style={{ 
                      backgroundColor: (projects.length <= 3 || currentIndex >= projects.length - 3) ? '#8B9D6B' : '#CDFB52',
                      color: '#1f2937',
                      opacity: (projects.length <= 3 || currentIndex >= projects.length - 3) ? 0.6 : 1,
                      transform: 'translateZ(0)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      if (!e.currentTarget.disabled) {
                        e.currentTarget.style.transform = 'scale3d(1.1, 1.1, 1) translateZ(0)';
                        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale3d(1, 1, 1) translateZ(0)';
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Container de défilement optimisé */}
                  <div
                    id="project-carousel"
                    className="py-4"
                    style={{ 
                      perspective: '1000px',
                      willChange: 'transform'
                    }}
                  >
                    <div 
                      className="flex gap-6 will-change-transform"
                      style={{
                        transform: `translate3d(calc(${currentIndex * -33.333}% - ${currentIndex * 1.5}rem), 0, 0)`,
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        backfaceVisibility: 'hidden'
                      }}
                    >
                      {projects.map((project, index) => (
                        <div
                          key={`project-desktop-${index}`}
                          className="project-card flex-shrink-0 pb-10 will-change-transform"
                          style={{ 
                            width: 'calc(33.333% - 1rem)',
                            transform: `translate3d(0, ${index % 2 === 1 ? '3rem' : '0'}, 0)`,
                            transition: 'transform 0.3s ease-out',
                            transformStyle: 'preserve-3d'
                          }}
                        >
                          <ProfileCard
                            title={project.title}
                            description={project.description}
                            imageUrl={project.imageUrl}
                            projectUrl={project.projectUrl}
                            technologies={project.technologies}
                            isProject={true}
                            socialIcon="external"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Version mobile - Grille verticale */}
              <div className="relative z-10 w-full px-4 block md:hidden">
                <div className="max-w-xs mx-auto space-y-4">
                  {projects.slice(0, showAllProjects ? projects.length : 2).map((project, index) => (
                    <div
                      key={`project-mobile-${index}`}
                      className="w-full will-change-transform"
                      style={{
                        transform: 'translateZ(0)',
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <ProfileCard
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                        projectUrl={project.projectUrl}
                        technologies={project.technologies}
                        isProject={true}
                        socialIcon="external"
                      />
                    </div>
                  ))}
                  
                  {/* Bouton Afficher plus de projets */}
                  {!showAllProjects && projects.length > 2 && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setShowAllProjects(true)}
                        className="bg-[#CDFB52] hover:bg-[#cdfb58d0] text-black font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform will-change-transform"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        Afficher plus de projets
                        <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  {/* Bouton Afficher moins (optionnel) */}
                  {showAllProjects && projects.length > 2 && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={() => setShowAllProjects(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 transform will-change-transform"
                        style={{ transform: 'translateZ(0)' }}
                      >
                        Afficher moins
                        <svg className="w-4 h-4 ml-2 inline rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <style jsx>{`
                .projects-section {
                  clip-path: polygon(0 0, 100% 1%, 100% 100%, 0 99%);
                }
                @media (min-width: 768px) {
                  .projects-section {
                    clip-path: polygon(0 0, 100% 4%, 100% 100%, 0 96%);
                  }
                }
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translate3d(0, 2rem, 0);
                  }
                  to {
                    opacity: 1;
                    transform: translate3d(0, 0, 0);
                  }
                }
              `}</style>

            </section>

            {/* Section Parcours */}
            <section 
              id="parcours"
              className="relative blackskin w-full flex items-center justify-center flex-col pt-5 md:pt-10 pb-20"
            >
              <div className="relative mb-4 md:mb-16">
                <ScrollFloat
                  containerClassName="text-[#0F172A] text-[1.8rem] pb-[1rem] sm:text-[2rem] md:text-[6rem] font-black tracking-wider translate-y-12 md:translate-y-20"
                >
                  PARCOURS
                </ScrollFloat>
              </div>
              
              <div className="relative z-10 bg-[#C084FC]/80 backdrop-blur-sm rounded-full px-4 md:px-8 mt-10 py-1.5 md:py-3 shadow-lg mb-8 md:mb-16">
                <p className="text-white text-center text-sm md:text-lg lg:text-xl font-medium">
                  Mon cheminement académique et professionnel
                </p>
              </div>

              {/* Timeline Container */}
              <Timeline />

            </section>


          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
    </>
  );
}
