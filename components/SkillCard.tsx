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
    <CardContainer className="inter-var">
      <CardBody className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-3xl p-8 md:p-10 transition-all duration-300 ease-in-out min-h-[400px] w-full`}>
        <div className="relative z-10 h-full flex flex-col">
          <CardItem translateZ={60} className="flex items-center mb-8">
            <div className={`w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-5 shadow-lg`}>
              {iconSvg}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white">{title}</h3>
          </CardItem>
          
          <CardItem translateZ={70} className="space-y-6 flex-1">
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <CardItem key={index} translateZ={index * 10 + 30} className={`px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl text-base font-semibold border-2 border-white/30 shadow-md`}>
                  {tech}
                </CardItem>
              ))}
            </div>
            
            <p className={`text-white text-base leading-relaxed font-medium ${hideDescriptionOnMobile ? 'hidden sm:block' : ''}`}>
              {description}
            </p>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default SkillCard; 