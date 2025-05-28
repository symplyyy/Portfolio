import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface DiagonalRevealTextProps {
  text: string;
  backgroundColor: string;
  angle: number; // px de pente
  index: number;
}

export default function DiagonalRevealText({
  text,
  backgroundColor,
  angle,
  index,
}: DiagonalRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 40%"],
  });

  const maskScaleY = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Approximation : angle (px) sur 1000px de largeur pour trouver l'angle de rotation du texte
  const rotationDeg = -(Math.atan(angle / 1000) * (180 / Math.PI));

  return (
    <div
      ref={ref}
      className="relative w-full h-[180px] md:h-[220px] overflow-visible"
      style={{ zIndex: 10 - index }} // Gestion de la superposition avec z-index
    >
      {/* Bande inclinée */}
      <div
        style={{
          backgroundColor,
          clipPath: `polygon(0 ${angle}px, 100% 0, 100% calc(100% - ${angle}px), 0 100%)`,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className="text-white text-[2.7rem] md:text-[5.5rem] font-black whitespace-nowrap tracking-wider"
          style={{
            transform: `rotate(${rotationDeg}deg)`,
          }}
        >
          {text}
        </span>
      </div>

      {/* Masque révélateur */}
      <motion.div
        className="absolute inset-0 bg-[#FFFFF7] z-20"
        style={{
          originY: 0,
          scaleY: maskScaleY,
          willChange: "transform",
        }}
      />
    </div>
  );
}
