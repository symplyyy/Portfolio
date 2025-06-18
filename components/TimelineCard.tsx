import React from 'react';
import RevealOnScroll from './RevealOnScroll';

interface TimelineCardProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  technologies: string[];
  gradientFrom: string;
  gradientTo: string;
  pointColor: string;
  icon: React.ReactNode;
  delay: number;
  position: 'left' | 'right';
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  subtitle,
  period,
  description,
  technologies,
  gradientFrom,
  gradientTo,
  pointColor,
  icon,
  delay,
  position
}) => {
  const isLeft = position === 'left';

  return (
    <RevealOnScroll delay={delay} className="relative">
      <div className="flex items-center justify-between">
        {/* Contenu responsive - taille réduite */}
        <div className={`w-full pl-12 md:pl-0 md:w-5/12 ${isLeft ? 'md:text-right' : 'md:order-2'}`}>
          <div 
            className={`bg-gradient-to-br p-3 md:p-4 rounded-lg md:rounded-xl shadow-lg md:shadow-xl transform hover:scale-105 hover:-rotate-1 transition-all duration-500 cursor-default group hover:shadow-2xl relative overflow-hidden`}
            style={{ 
              backgroundImage: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` 
            }}
          >
            {/* Effet de brillance animé */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            
            {/* Particules flottantes dans les cartes */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-white/20 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className={`flex items-center mb-3 ${isLeft ? 'justify-center md:justify-end' : 'justify-start'}`}>
              <div className={`bg-white/20 rounded-full p-2 mr-3 group-hover:bg-white/30 transition-colors ${isLeft ? 'md:order-2 md:mr-0 md:ml-3' : ''}`}>
                {icon}
              </div>
              <span className={`text-white/80 text-sm font-medium group-hover:text-white/100 transition-colors ${isLeft ? 'md:order-1' : ''}`}>
                {period}
              </span>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-white/95 transition-colors">
              {title}
            </h3>
            
            <h4 className="text-sm md:text-base text-white/90 font-medium mb-2 md:mb-3 group-hover:text-white/100 transition-colors">
              {subtitle}
            </h4>
            
            <p className="text-white/80 text-xs md:text-sm leading-relaxed group-hover:text-white/95 transition-colors">
              {description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="bg-white/20 text-white text-xs px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Point central - parfaitement centré sur la ligne */}
        <div className="absolute left-[17px] md:left-1/2 transform -translate-x-1/2 z-10">
          {/* Cercle extérieur pulsant - adapté mobile */}
          <div 
            className="absolute w-6 md:w-8 h-6 md:h-8 rounded-full animate-ping opacity-20 -top-1.5 md:-top-2 -left-1.5 md:-left-2"
            style={{ backgroundColor: pointColor }}
          ></div>
          {/* Point principal - adapté mobile */}
          <div 
            className="relative w-3 md:w-4 h-3 md:h-4 rounded-full border-2 md:border-4 border-white shadow-lg hover:scale-125 transition-all duration-300 hover:shadow-xl"
            style={{ backgroundColor: pointColor }}
          >
            {/* Lueur intérieure */}
            <div 
              className="absolute inset-0.5 rounded-full opacity-60 animate-pulse"
              style={{ backgroundColor: pointColor, filter: 'brightness(1.5)' }}
            ></div>
          </div>
        </div>
        
        {/* Espace opposé vide (desktop seulement) */}
        <div className={`hidden md:block w-5/12 ${isLeft ? '' : 'md:order-1'}`} />
      </div>
    </RevealOnScroll>
  );
};

export default TimelineCard; 