import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { BoxReveal } from "@/components/magicui/box-reveal";
import LoadingScreen from "@/components/LoadingScreen";
import DiagonalRevealText from "@/components/DiagonalRevealText";
import ScrollFloat from "../components/ScrollFloat";
import { ScrollSpyNav } from "@/components/ScrollSpyNav";

/* TODO : Ajout mode nuit */

const sections = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "competences", label: "Expériences" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
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
            className="
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
              className={`relative z-[2] flex flex-col justify-center items-center px-4 md:px-0 h-full md:h-auto mt-20 md:mt-32 ${
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

              className={`mt-0 px-4 md:px-6 pb-0 md:pb-10 w-full mb-2 max-w-8xl mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0 transition-all duration-1000 delay-500 ${
                !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} 
              style={{ position: 'relative', zIndex: 20 }}
            >
              <div className="flex-1 space-y-3 max-w-full md:max-w-[900px] z-[1] scale-[0.8] md:scale-100 origin-top">
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
                    Je m&apos;appelle Timéo
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
                    je donne vie aux idées sur le web.
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
                    Entre lignes de code et pixels bien
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
                    placés je conçois des sites modernes,
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
                    dynamiques et accessibles.
                  </p>
                </BoxReveal>
                <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                  <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
                    Ce portfolio est ma vitrine,
                  </p>
                </BoxReveal>
                <div className="relative inline-block">
                  <BoxReveal boxColor={"#E5A4E1"} duration={0.5}>
                    <p className="bg-black text-white text-lg md:text-4xl font-bold px-4 pr-8 md:pr-12 py-2 md:py-3 inline-block clip-triangle-right">
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
                  className="w-[280px] md:w-[600px] max-w-full"
                />
              </div>
            </section>
            <section className="relative py-3 overflow-x-hidden">
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
              id="apropos"
              className="relative bg-[#6299CE] w-full h-[80vh] -mt-40 md:-mt-60 mb-150 flex items-center justify-center"
            >
              <ScrollFloat
                containerClassName="text-white text-[1.8rem] sm:text-[2rem] md:text-[6rem] font-black tracking-wider translate-y-12 md:translate-y-20"
              >
                COMPÉTENCES
              </ScrollFloat>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
