import React from 'react';
import TimelineCard from './TimelineCard';

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  technologies: string[];
  gradientFrom: string;
  gradientTo: string;
  pointColor: string;
  icon: React.ReactNode;
}

const Timeline: React.FC = () => {
  const timelineData: TimelineItem[] = [
    {
      title: "Mastère Expert en Développement Full Stack",
      subtitle: "Ynov Campus Lille",
      period: "Septembre 2025",
      description: "Formation avancée en développement Full Stack pour approfondir mes compétences techniques et devenir expert dans les technologies modernes.",
      technologies: ["Full Stack", "Technologies modernes"],
      gradientFrom: "#8A2BE2",
      gradientTo: "#6B46C1",
      pointColor: "#8A2BE2",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Stage au Laboratoire Icube",
      subtitle: "Illkirch",
      period: "Février - Juin 2025",
      description: "Stage de fin de BUT3 au laboratoire de recherche Icube pour développer des solutions innovantes et approfondir mes compétences techniques.",
      technologies: ["Innovation", "Développement", "Symfony", "PostgreSQL", "Bootstrap"],
      gradientFrom: "#69B7EE",
      gradientTo: "#5A9BD4",
      pointColor: "#69B7EE",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "BUT MMI - Spécialité Web",
      subtitle: "Métiers du Multimédia et de l'Internet",
      period: "2022 - 2025",
              description: "Le BUT MMI est une formation pluridisciplinaire alliant web, design et communication, et ma spécialisation en développement web m’a apporté une solide base technique, ainsi qu’une sensibilité à l’ergonomie, au design et au SEO.",
      technologies: ["Développement Web", "Design", "Ergonomie", "SEO"],
      gradientFrom: "#E5A4E1",
      gradientTo: "#D691DD",
      pointColor: "#E5A4E1",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Stage chez L'agence COSM",
      subtitle: "Strasbourg",
      period: "Avril - Juin 2024",
      description: "Stage en agence de communication digitale pour développer mes compétences en développement web et découvrir le monde professionnel.",
      technologies: ["Agence", "Communication", "Web", "Wordpress"],
      gradientFrom: "#5A1441",
      gradientTo: "#7A1D5A",
      pointColor: "#5A1441",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "BUT Informatique",
      subtitle: "IUT Illkirch-Graffenstaden",
      period: "2021 - 2022",
      description: "Première année en informatique qui a renforcé mes bases en programmation.",
      technologies: ["Informatique", "SQL", "C#"],
      gradientFrom: "#FF9776",
      gradientTo: "#E8845C",
      pointColor: "#FF9776",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "BAC STI2D",
      subtitle: "Lycée Jean-Baptiste Schwilgué",
      period: "2018 - 2021",
      description: "Formation technologique en Sciences et Technologies de l'Industrie et du Développement Durable, première approche technique.",
      technologies: ["STI2D", "Technologie", "Innovation"],
      gradientFrom: "#8B9D6B",
      gradientTo: "#6B7A4B",
      pointColor: "#8B9D6B",
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particules adaptées responsive */}
        <div className="absolute top-10 left-4 md:left-10 w-1.5 md:w-2 h-1.5 md:h-2 bg-[#8A2BE2]/30 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-32 right-8 md:right-20 w-1 h-1 bg-[#69B7EE]/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-60 left-8 md:left-20 w-1 md:w-1.5 h-1 md:h-1.5 bg-[#E5A4E1]/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-80 right-4 md:right-10 w-1 h-1 bg-[#FF9776]/30 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 left-12 md:left-32 w-1.5 md:w-2 h-1.5 md:h-2 bg-[#CDFB52]/25 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Éléments décoratifs géométriques - masqués sur mobile */}
        <div className="hidden md:block absolute top-20 right-5 animate-float-gentle">
          <div className="w-8 h-8 border border-[#8A2BE2]/20 rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
        </div>
        <div className="hidden md:block absolute top-96 left-5 animate-float-gentle" style={{ animationDelay: '2s' }}>
          <div className="w-6 h-6 border border-[#69B7EE]/25 rounded-full animate-pulse"></div>
        </div>
        <div className="hidden md:block absolute bottom-32 right-8 animate-float-gentle" style={{ animationDelay: '4s' }}>
          <div className="w-4 h-8 bg-gradient-to-t from-[#E5A4E1]/20 to-transparent rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Ligne centrale de la timeline avec animation - responsive */}
      <div className="absolute left-[32px] md:left-1/2 md:transform md:-translate-x-1/2 w-0.5 md:w-1 h-full rounded-full overflow-hidden">
        {/* Ligne de base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8A2BE2] via-[#69B7EE] via-[#E5A4E1] to-[#8B9D6B] rounded-full shadow-lg"></div>
        {/* Ligne animée qui se remplit */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8A2BE2] via-[#69B7EE] via-[#E5A4E1] to-[#8B9D6B] rounded-full shadow-lg opacity-80 animate-pulse"></div>
        {/* Éclat qui monte et descend - masqué mobile */}
        <div className="hidden md:block absolute w-3 h-8 -left-1 bg-gradient-to-b from-transparent via-white/50 to-transparent rounded-full animate-timeline-glow"></div>
      </div>
      
      {/* Étapes du parcours */}
      <div className="space-y-8 md:space-y-12">
        {timelineData.map((item, index) => (
          <TimelineCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            period={item.period}
            description={item.description}
            technologies={item.technologies}
            gradientFrom={item.gradientFrom}
            gradientTo={item.gradientTo}
            pointColor={item.pointColor}
            icon={item.icon}
            delay={index * 100}
            position={index % 2 === 0 ? 'left' : 'right'}
          />
        ))}
      </div>

      {/* Point de fin de timeline - responsive */}
      <div className="relative mt-12 md:mt-16">
        <div className="absolute left-[16px] md:left-1/2 transform -translate-x-1/2 z-10">
          {/* Cercles concentriques animés - adaptés mobile */}
          <div className="absolute w-8 md:w-12 h-8 md:h-12 rounded-full border border-[#CDFB52]/30 animate-ping -top-2 md:-top-3 -left-2 md:-left-3"></div>
          <div className="absolute w-6 md:w-8 h-6 md:h-8 rounded-full border border-[#CDFB52]/50 animate-pulse -top-1 -left-1" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Point principal - adapté mobile */}
          <div className="relative w-4 md:w-6 h-4 md:h-6 bg-gradient-to-br from-[#CDFB52] to-[#B8E842] rounded-full border-2 md:border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform group cursor-pointer">
            <div className="w-1 md:w-2 h-1 md:h-2 bg-white rounded-full animate-pulse group-hover:animate-ping"></div>
            
            {/* Éclats autour du point - masqués mobile */}
            <div className="hidden md:block absolute -top-1 -right-1 w-2 h-2 bg-[#CDFB52]/60 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="hidden md:block absolute -bottom-1 -left-1 w-1 h-1 bg-[#B8E842]/70 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm font-medium animate-bounce">
            À suivre...
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      {/* Styles CSS personnalisés */}
      <style jsx>{`
        @keyframes timeline-glow {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(calc(100vh));
            opacity: 0;
          }
        }
        
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }

        .animate-timeline-glow {
          animation: timeline-glow 8s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Timeline; 