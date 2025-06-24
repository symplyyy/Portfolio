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
      className="relative w-full h-[100px] xs:h-[120px] sm:h-[140px] md:h-[180px] lg:h-[250px] xl:h-[330px] overflow-hidden"
      style={{ zIndex: 10 - index }}
    >
      {/* Conteneur de la bande inclinée avec gestion du débordement */}
      <div className="absolute inset-0 w-[130%] -left-[15%] xs:w-[125%] xs:-left-[12.5%] sm:w-[115%] sm:-left-[7.5%] md:w-[105%] md:-left-[2.5%] lg:w-full lg:left-0">
        {/* Bande inclinée */}
        <div
          style={{
            backgroundColor,
            clipPath: `polygon(0 ${Math.max(angle * 0.4, 20)}px, 100% 0, 100% calc(100% - ${Math.max(angle * 0.4, 20)}px), 0 100%)`,
          }}
          className="absolute inset-0 flex items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8"
        >
          <span
            className="text-white font-black tracking-wider text-center leading-none text-[1rem] xs:text-[1.1rem] sm:text-[1.4rem] md:text-[2.2rem] lg:text-[4rem] xl:text-[6rem]"
            style={{
              transform: `rotate(${rotationDeg * 0.2}deg)`,
              maxWidth: '95%',
              wordBreak: 'keep-all',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
