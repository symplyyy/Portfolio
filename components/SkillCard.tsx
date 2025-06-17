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
    <CardContainer className="inter-var h-full">
      <CardBody className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 ease-in-out w-full h-full`}>
        <div className="relative z-10 flex flex-col h-full">
          <CardItem translateZ={60} className="flex items-center mb-4 sm:mb-6 md:mb-8">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-3 sm:mr-4 md:mr-5 shadow-lg`}>
              {iconSvg}
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{title}</h3>
          </CardItem>
          
          <CardItem translateZ={70} className="flex flex-col flex-grow space-y-4 sm:space-y-6">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {technologies.map((tech, index) => (
                <CardItem 
                  key={index} 
                  translateZ={index * 10 + 30} 
                  className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl text-sm sm:text-base font-semibold border-2 border-white/30 shadow-md`}
                >
                  {tech}
                </CardItem>
              ))}
            </div>
            
            <p className={`text-white text-sm sm:text-base leading-relaxed font-medium flex-grow ${hideDescriptionOnMobile ? 'hidden sm:block' : ''}`}>
              {description}
            </p>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default SkillCard; 