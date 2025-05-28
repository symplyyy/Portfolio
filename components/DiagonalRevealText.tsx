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
      className="relative w-[150vw] sm:w-[130vw] md:w-full h-[140px] sm:h-[200px] md:h-[330px] overflow-visible -ml-[25vw] sm:-ml-[15vw] md:ml-0"
      style={{ zIndex: 10 - index }}
    >
      {/* Bande inclinée */}
      <div
        style={{
          backgroundColor,
          clipPath: `polygon(0 ${angle * 0.8}px, 100% 0, 100% calc(100% - ${angle * 0.8}px), 0 100%)`,
        }}
        className="absolute inset-0 flex items-center justify-center md:pt-8"
      >
        <span
          className="text-white text-[1.8rem] sm:text-[2rem] md:text-[6rem] font-black whitespace-nowrap tracking-wider px-4 md:px-0"
          style={{
            transform: `rotate(${rotationDeg * 0.5}deg)`,
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
