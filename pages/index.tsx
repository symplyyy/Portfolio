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
        numClouds?: number;
        horizontalMargin?: number;     // marge hors écran
        jitterFactor?: number;         // % de la largeur de segment comme jitter
      }
    ) => {
      if (!ref.current) return;
    
      const localUsedY: number[] = [];
      const num = options?.numClouds ?? 6;
      const margin = options?.horizontalMargin ?? 300;        // px hors-écran
      const jitter = options?.jitterFactor ?? 0.3;            // 30% de la tranche
    
      // width totale couverte = écran + marge à gauche + marge à droite
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
        cloud.className = "cloud";
        if (options?.isMini) cloud.classList.add("minicloud");
    
        // ------------------------------
        // 1) position horizontale « segmentée »
        // ------------------------------
        // chaque nuage a une tranche dédiée [i*W, (i+1)*W]
        const baseX = -margin + i * segmentWidth;
        // on laisse un jitter de ± jitter*segmentWidth
        const x =
          baseX +
          segmentWidth / 2 +
          (Math.random() * 2 - 1) * (segmentWidth * jitter);
    
        // ------------------------------
        // 2) position verticale
        // ------------------------------
        const y = generateY(options?.yRange || [10, 90]);
        // ------------------------------
        // 3) scale
        // ------------------------------
        const scale = options?.isMini
          ? Math.random() * 0.3 + 0.3
          : Math.random() * 0.5 + 0.9;
    
        cloud.style.top = `${y}%`;
        // on stocke le scale dans un attribut pour le réappliquer au move
        cloud.dataset.scale = scale.toString();
        cloud.style.transform = `translateX(${x}px) scale(${scale})`;
    
        ref.current.appendChild(cloud);
        cloudData.push({
          el: cloud,
          x,
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
      
        // dès qu'il sort entièrement à gauche ou à droite, on respawn
        if (cloud.x < -cloud.el.offsetWidth || cloud.x > window.innerWidth + cloud.el.offsetWidth) {
          // 50% de chances de réapparaître à droite, 50% à gauche
          const fromRight = Math.random() < 0.5;
          const margin = 300;
          cloud.x = fromRight
            ? window.innerWidth + Math.random() * margin
            : -cloud.el.offsetWidth - Math.random() * margin;
        }
      
        // on reprend le scale initial pour ne bouger que horizontalement
        const scale = cloud.el.dataset.scale || '1';
        cloud.el.style.transform = `translateX(${cloud.x}px) scale(${scale})`;
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
        h-[85rem]
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
        <div ref={layer1Ref} className="clouds-layer z-0" />
        <div ref={layer2Ref} className="clouds-layer z-0" />
        <div ref={layer3Ref} className="clouds-layer z-3" />
      </div>

      <Navbar />

      <div
        ref={parallaxRef}
        className="animate-float relative z-2 flex flex-col justify-center items-center transition-transform duration-300 ease-out"
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
  );
}