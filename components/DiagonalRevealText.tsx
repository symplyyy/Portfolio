import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface DiagonalRevealTextProps {
  text: string;
  backgroundColor: string;
  angle: number;
  index: number;
}

export default function DiagonalRevealText({ 
  text, 
  backgroundColor, 
  angle, 
  index 
}: DiagonalRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 40%"]
  });

  const maskScaleY = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const rotationDeg = -(Math.atan(angle / 1000) * (180 / Math.PI));

  return (
    <div 
      ref={ref}
      className="relative w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[330px] overflow-hidden"
      style={{ zIndex: 10 - index }}
    >
      {/* Conteneur de la bande inclinée avec gestion du débordement */}
      <div className="absolute inset-0 w-[120%] -left-[10%] sm:w-[110%] sm:-left-[5%] md:w-full md:left-0">
        {/* Bande inclinée */}
        <div
          style={{
            backgroundColor,
            clipPath: `polygon(0 ${angle * 0.6}px, 100% 0, 100% calc(100% - ${angle * 0.6}px), 0 100%)`,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className="text-white font-black whitespace-nowrap tracking-wider text-center leading-none text-[1.2rem] sm:text-[1.8rem] md:text-[3rem] lg:text-[6rem]"
            style={{
              transform: `rotate(${rotationDeg * 0.3}deg)`,
              maxWidth: '90%',
              wordBreak: 'keep-all',
            }}
          >
            {text}
          </span>
        </div>
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
