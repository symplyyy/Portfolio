import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { BoxReveal } from "@/components/magicui/box-reveal";
import LoadingScreen from "@/components/LoadingScreen";
import DiagonalRevealText from "@/components/DiagonalRevealText";

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
    
        const scale = options?.isMini
          ? Math.random() * 0.3 + 0.3
          : Math.random() * 0.5 + 0.9;
        cloud.dataset.scale = scale.toString();
    
        // Commencer en bas de l'écran
        cloud.style.top = "100%";
        cloud.style.transform = `translateX(${x}px) scale(${scale})`;
        ref.current.appendChild(cloud);

        // Animation d'entrée avec délai progressif
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
        layer1Ref.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
      if (layer2Ref.current)
        layer2Ref.current.style.transform = `translateY(${-scrollY * 0.15}px)`;
      if (layer3Ref.current)
        layer3Ref.current.style.transform = `translateY(${-scrollY * 0.2}px)`;

      // Supprimer l'effet parallax sur le logo/texte
      // if (parallaxRef.current)
      //   parallaxRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;

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
      {/* Fond de transition */}
      <div 
        className={`fixed inset-0 bg-center bg-no-repeat transition-opacity duration-1000 ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: "url('/images/header/background.png')",
          backgroundSize: "100% 100%",
          zIndex: 9998
        }}
      />
      {isLoading && (
        <div className="fixed inset-0 z-[9999]">
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        </div>
      )}
      <div className={`w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <header
          className="
            relative
            h-[90rem]
            w-full
            bg-center
            bg-no-repeat
            flex flex-col items-center justify-start
            pt-[200px]
            mb-0
            overflow-hidden
          "
          style={{
            backgroundImage: "url('/images/header/background.png')",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="clouds-container">
            <div ref={layer1Ref} className="clouds-layer z-0" />
            <div ref={layer2Ref} className="clouds-layer z-0" />
            <div ref={layer3Ref} className="clouds-layer z-3" />
          </div>

          <Navbar />

          <div
            ref={parallaxRef}
            className={`relative z-2 flex flex-col justify-center items-center ${
              !isLoading ? 'zoom-in' : 'opacity-0 scale-50'
            }`}
          >
            <img
              src="/images/logo_portfolio.png"
              alt="Portfolio logo"
              className="w-full max-w-[1000px]"
            />
            <p className="text-whiteg z-[1] relative font-artegra text-sm md:text-base mt-18 tracking-widest font-medium">
              TIMÉO SOËTE / DÉVELOPPEUR WEB
            </p>
          </div>
        </header>

        <main>
          <section className={`mt-0 px-6 w-full mb-2 max-w-8xl mx-auto flex flex-col md:flex-row justify-center items-start transition-all duration-1000 delay-500 ${
            !isLoading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex-1 space-y-2 max-w-[600px]">
              <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 inline-block clip-triangle-right">
                  Je m'appelle Timéo
                </p>
              </BoxReveal>
              <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 inline-block clip-triangle-right">
                  je donne vie aux idées sur le web.
                </p>
              </BoxReveal>
              <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 inline-block clip-triangle-right">
                  Entre lignes de code et pixels bien
                </p>
              </BoxReveal>
              <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 inline-block clip-triangle-right">
                  placés je conçois des sites modernes,
                </p>
              </BoxReveal>
              <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 inline-block clip-triangle-right">
                  dynamiques et accessibles.
                </p>
              </BoxReveal>
              <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 inline-block clip-triangle-right">
                  Ce portfolio est ma vitrine,
                </p>
              </BoxReveal>
              <div className="relative inline-block">
                <BoxReveal boxColor={"#ff00b7"} duration={0.5}>
                  <p className="bg-black text-white text-xl md:text-3xl font-bold px-3 pr-10 py-2 clip-triangle-right">
                    n'hésitez pas à explorer !
                  </p>
                </BoxReveal>
              </div>
            </div>

            <div className="ml-6 flex justify-center animate-float">
              <img
                src="/images/avatar.png"
                alt="Développeur sur un nuage"
                className="w-[400px] md:w-[500px] max-w-full"
              />
            </div>
          </section>
          <section>
            <div className="text-white text-4xl font-bold">Bienvenue sur mon site</div>
          </section>
          <section className="relative py-3 mb-60">
            <div className="space-y-[-80px]">
              <DiagonalRevealText 
                text="INGRÉDIENTS NATURELS" 
                backgroundColor="#69B7EE" 
                angle={45}
                index={0}
              />
              <DiagonalRevealText 
                text="FAIBLE EN CALORIES" 
                backgroundColor="#E5A4E1" 
                angle={35}
                index={1}
              />
              <DiagonalRevealText 
                text="PROBIOTIQUES" 
                backgroundColor="#5A1441" 
                angle={27}
                index={2}
              />
              <DiagonalRevealText 
                text="NON PASTEURISÉ" 
                backgroundColor="#FF9776" 
                angle={20}
                index={3}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
