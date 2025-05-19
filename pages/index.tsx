import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null); // Pour le bloc logo/texte

  useEffect(() => {
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
        numClouds?: number; // 👈 nouveau paramètre ici
      }
    ) => {
      if (!ref.current) return;
    
      const localUsedY: number[] = [];
    
      const generateY = (range: [number, number]) => {
        let y: number;
        let attempts = 0;
        do {
          y = Math.floor(Math.random() * (range[1] - range[0]) + range[0]);
          attempts++;
        } while (
          localUsedY.some((usedY) => Math.abs(usedY - y) < 10) && attempts < 10
        );
        localUsedY.push(y);
        return y;
      };
    
      const num = options?.numClouds ?? 6; // 👈 valeur par défaut
    
      for (let i = 0; i < num; i++) {
        const cloud = document.createElement("img");
        cloud.src = src;
        cloud.className = "cloud";
    
        if (options?.isMini) {
          cloud.classList.add("minicloud");
        }
    
        const y = generateY(options?.yRange || [10, 90]);
        const scale = options?.isMini
          ? Math.random() * 0.3 + 0.3
          : Math.random() * 0.5 + 0.9;
        const x = Math.random() * window.innerWidth;
    
        cloud.style.top = `${y}%`;
        cloud.style.transform = `translateX(${x}px) scale(${scale})`;
    
        ref.current.appendChild(cloud);
    
        cloudData.push({
          el: cloud,
          x: x,
          speed: baseSpeed * (Math.random() * 0.4 + 0.4),
        });
      }
    };

    createClouds(layer1Ref, "/images/header/clouds.png", 0.25, {
      yRange: [5, 25],
      numClouds: 3,
    });
    createClouds(layer2Ref, "/images/header/clouds 2.png", 0.18, {
      yRange: [25, 45],
      numClouds: 4,
    });
    createClouds(layer3Ref, "/images/header/minicloud.png", 0.1, {
      isMini: true,
      yRange: [30, 55],
      numClouds: 2,
    });

    let rafId: number;

    const animate = () => {
      const scrollY = window.scrollY;

      // Parallax sur les layers
      if (layer1Ref.current)
        layer1Ref.current.style.transform = `translateY(${-scrollY * 0.2}px)`;
      if (layer2Ref.current)
        layer2Ref.current.style.transform = `translateY(${-scrollY * 0.35}px)`;
      if (layer3Ref.current)
        layer3Ref.current.style.transform = `translateY(${-scrollY * 0.5}px)`;

      // Effet inverse léger sur le bloc logo/texte
      if (parallaxRef.current)
        parallaxRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;

      cloudData.forEach((cloud) => {
        cloud.x -= cloud.speed;

        // On remet le nuage à droite uniquement quand il est entièrement sorti
        if (cloud.x < -cloud.el.offsetWidth) {
          cloud.x = window.innerWidth + Math.random() * 300;
        }

        // Pour conserver le scale initial, on extrait la valeur actuelle ou on la réapplique (si besoin, on peut stocker le scale initial dans cloudData)
        // Ici on applique uniquement le translateX pour le mouvement horizontal.
        cloud.el.style.transform = `translateX(${cloud.x}px)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <header
      className="
        relative
        h-[1200px]
        w-full
        bg-center
        bg-no-repeat
        flex flex-col items-center justify-start
        pt-[200px]
        mb-56
        overflow-hidden
      "
      style={{
        backgroundImage: "url('/images/header/background.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="clouds-container">
        <div ref={layer1Ref} className="clouds-layer" />
        <div ref={layer2Ref} className="clouds-layer" />
        <div ref={layer3Ref} className="clouds-layer" />
      </div>

      <Navbar />

      <div
        ref={parallaxRef}
        className="animate-float flex flex-col justify-center items-center transition-transform duration-300 ease-out"
      >
        <img
          src="/images/logo_portfolio.png"
          alt="Portfolio logo"
          className="w-full max-w-[1200px]"
        />
        <p className="text-white z-1 font-artegra text-sm md:text-base mt-24 tracking-widest font-medium">
          TIMEO SOETE / Developpeur web
        </p>
      </div>
    </header>
  );
}