// pages/index.tsx
import Navbar from "@/components/Navbar";
import { useEffect, useRef } from "react";

export default function Home() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    type Offsets = { y1: number; y2: number; y3: number };
    const offsets: Offsets = { y1: 0, y2: 0, y3: 0 };
    let rafId: number;

    const speeds = { s1: 0.2, s2: 0.4, s3: 0.6 };

    const update = () => {
      const scrollY = window.scrollY;

      // cibles positives
      const target1 = scrollY * speeds.s1;
      const target2 = scrollY * speeds.s2;
      const target3 = scrollY * speeds.s3;

      // lissage
      offsets.y1 += (target1 - offsets.y1) * 0.1;
      offsets.y2 += (target2 - offsets.y2) * 0.1;
      offsets.y3 += (target3 - offsets.y3) * 0.1;

      // on inverse ici pour faire monter
      if (layer1Ref.current)
        layer1Ref.current.style.transform = `translateY(${-offsets.y1}px)`;
      if (layer2Ref.current)
        layer2Ref.current.style.transform = `translateY(${-offsets.y2}px)`;
      if (layer3Ref.current)
        layer3Ref.current.style.transform = `translateY(${-offsets.y3}px)`;

      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <header
      className="
        relative
        h-[1694px]
        w-full
        bg-center
        bg-no-repeat
        flex flex-col items-center justify-start   /* passe à start */
        pt-[200px]                                  /* espace en haut pour 'remonter' */
        mb-56
      "
      style={{
        backgroundImage: "url('/images/header/background.png')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="clouds-container">
        <div ref={layer1Ref} className="clouds-layer clouds-layer-1" />
        <div ref={layer2Ref} className="clouds-layer clouds-layer-2" />
        <div ref={layer3Ref} className="clouds-layer clouds-layer-3" />
      </div>

      <Navbar />

      <div className="animate-float flex flex-col justify-center items-center">
        <img
          src="/images/logo_portfolio.png"
          alt="Portfolio logo"
          className="w-full max-w-[1200px]"
        />
        <p className="text-white font-artegra text-sm md:text-base mt-24 tracking-widest font-medium">
          TIMEO SOETE / Developpeur web
        </p>
      </div>
    </header>
  );
}
