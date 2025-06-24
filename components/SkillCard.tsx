import React from 'react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';

interface SkillCardProps {
  title: string;
  description: string;
  iconSvg: React.ReactNode;
  technologies: string[];
  gradientFrom: string;
  gradientTo: string;
  hideDescriptionOnMobile?: boolean;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  description,
  iconSvg,
  technologies,
  gradientFrom,
  gradientTo,
  hideDescriptionOnMobile = false
}) => {
  return (
    <CardContainer className="inter-var h-full w-full">
      <CardBody className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-2xl xs:rounded-3xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 transition-all duration-300 ease-in-out w-full h-full min-h-[280px] xs:min-h-[300px] sm:min-h-[320px] md:min-h-[350px] lg:min-h-[380px]`}>
        <div className="relative z-10 flex flex-col h-full">
          <CardItem translateZ={60} className="flex items-center mb-3 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-8">
            <div className={`w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center mr-2 xs:mr-3 sm:mr-4 md:mr-5 shadow-lg flex-shrink-0`}>
              {iconSvg}
            </div>
            <h3 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight break-words flex-1 min-w-0">{title}</h3>
          </CardItem>
          
          <CardItem translateZ={70} className="flex flex-col flex-grow space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3">
              {technologies.map((tech, index) => (
                <CardItem 
                  key={index} 
                  translateZ={index * 10 + 30} 
                  className={`px-1.5 xs:px-2 sm:px-3 md:px-4 py-0.5 xs:py-1 sm:py-1.5 md:py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg xs:rounded-xl text-xs xs:text-sm sm:text-base font-semibold border border-white/30 xs:border-2 shadow-md transition-all duration-200 hover:scale-105 hover:bg-white/30`}
                >
                  {tech}
                </CardItem>
              ))}
            </div>
            
            <p className={`text-white text-xs xs:text-sm sm:text-base leading-relaxed font-medium flex-grow ${hideDescriptionOnMobile ? 'hidden sm:block' : ''}`}>
              {description}
            </p>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default SkillCard; 