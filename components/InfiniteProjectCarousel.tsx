import React, { useRef, useEffect, useCallback } from 'react';
import { motion, PanInfo, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  technologies: string[];
}

interface InfiniteProjectCarouselProps {
  projects: Project[];
}

const CARD_WIDTH = 400;
const CARD_HEIGHT = 300;
const CARD_GAP = 20;

// Définition des couleurs par technologie
const techColors: { [key: string]: string } = {
  // Frontend
  'React': 'from-blue-500 to-purple-600',
  'Next.js': 'from-blue-500 to-purple-600',
  'TypeScript': 'from-blue-500 to-purple-600',
  'JavaScript': 'from-blue-500 to-purple-600',
  'Javascript': 'from-blue-500 to-purple-600',
  'TailwindCSS': 'from-blue-500 to-purple-600',
  'Bootstrap': 'from-blue-500 to-purple-600',
  'D3.js': 'from-blue-500 to-purple-600',
  
  // Backend
  'Symfony': 'from-green-500 to-teal-600',
  'Laravel': 'from-green-500 to-teal-600',
  'PHP': 'from-green-500 to-teal-600',
  'Node.js': 'from-green-500 to-teal-600',
  'PostgreSQL': 'from-green-500 to-teal-600',
  'MySQL': 'from-green-500 to-teal-600',
  'C#': 'from-green-500 to-teal-600',
  'Python': 'from-green-500 to-teal-600',
  
  // Autre/API/Design
  'API Google Maps': 'from-orange-500 to-red-600',
  'API Spotify': 'from-orange-500 to-red-600',
  'Opensky Network API': 'from-orange-500 to-red-600',
  'Chart.js': 'from-orange-500 to-red-600'
};

export default function InfiniteProjectCarousel({ projects }: InfiniteProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  
  // Utiliser des refs pour éviter les re-renders
  const isScrollingRef = useRef(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Réduire à 3 copies pour optimiser les performances
  const extendedProjects = [...projects, ...projects, ...projects];
  const singleSetWidth = (CARD_WIDTH + CARD_GAP) * projects.length;
  const initialOffset = -singleSetWidth;

  // Initialiser la position au milieu
  useEffect(() => {
    x.set(initialOffset);
  }, [x, initialOffset]);

  // Défilement automatique ultra-optimisé
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) return;
      
      autoScrollIntervalRef.current = setInterval(() => {
        if (!isScrollingRef.current) {
          const currentX = x.get();
          x.set(currentX - 0.15); // Vitesse encore réduite pour économiser les performances
        }
      }, 80); // Moins fréquent pour économiser les performances (12.5fps au lieu de 20fps)
    };

    const stopAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
    };

    startAutoScroll();
    return stopAutoScroll;
  }, [x]);

  // Scroll handler désactivé - seulement défilement automatique

  // Gestion de l'effet infini optimisée avec seuils plus larges
  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      // Seuils encore plus larges pour réduire la fréquence
      if (latest > singleSetWidth * 0.3) {
        x.set(latest - singleSetWidth);
      } else if (latest < -singleSetWidth * 1.7) {
        x.set(latest + singleSetWidth);
      }
    });

    return unsubscribe;
  }, [x, singleSetWidth]);

  const handleDragStart = useCallback(() => {
    isScrollingRef.current = true;
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentX = x.get();
    const velocity = info.velocity.x;
    
    // Logique de drag encore plus simplifiée
    if (Math.abs(velocity) > 400) {
      const direction = velocity > 0 ? 1 : -1;
      const targetX = currentX + (direction * (CARD_WIDTH + CARD_GAP) * 0.2);
      x.set(targetX);
    }

    // Redémarrer avec délai
    setTimeout(() => {
      isScrollingRef.current = false;
      if (!autoScrollIntervalRef.current) {
        autoScrollIntervalRef.current = setInterval(() => {
          if (!isScrollingRef.current) {
            const currentX = x.get();
            x.set(currentX - 0.15);
          }
        }, 80);
      }
    }, 250);
  }, [x]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full overflow-hidden py-8"
      style={{ height: `${CARD_HEIGHT + 64}px` }}
    >
      <motion.div
        className="flex absolute top-8 left-0 will-change-transform cursor-grab active:cursor-grabbing"
        style={{ 
          x,
          gap: `${CARD_GAP}px`
        }}
        drag="x"
        dragConstraints={false}
        dragElastic={0.005} // Élasticité minimale
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.001 }} // Effet quasi-invisible
        transition={{
          type: "tween",
          duration: 0.05, // Ultra-rapide
          ease: "linear"
        }}
      >
        {extendedProjects.map((project, index) => (
          <ProjectCard 
            key={`${project.title}-${Math.floor(index / projects.length)}-${index % projects.length}`} 
            project={project}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}

const ProjectCard = React.memo(({ project, index }: { project: Project; index: number }) => {
  return (
    <motion.div
      className="relative flex-shrink-0 will-change-transform group"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
      whileHover={{ scale: 1.015, y: -1 }} // Effets encore plus subtils
      transition={{ 
        duration: 0.1,
        ease: "linear"
      }}
    >
      <div className="absolute inset-0 rounded-xl overflow-hidden bg-white shadow-sm group-hover:shadow-md transition-shadow duration-100">
        <div className="relative w-full h-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={CARD_WIDTH}
            height={CARD_HEIGHT}
            quality={100}
            className="w-full h-full object-cover transition-transform duration-150 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 400px"
            priority={index < 3}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
              '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>'
            ).toString('base64')}`}
            loading={index < 3 ? "eager" : "lazy"}
            unoptimized={true}
            style={{
              imageRendering: 'auto',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              WebkitTransform: 'translateZ(0)',
              WebkitFontSmoothing: 'antialiased',
              filter: 'contrast(1.02) brightness(1.01)',
              objectFit: 'cover',
              objectPosition: 'center'
            } as React.CSSProperties}
          />
          
          {/* Overlay permanent pour le titre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-75" />
          
          {/* Titre toujours visible - en bas */}
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="text-base font-bold line-clamp-2">
              {project.title}
            </h3>
          </div>

          {/* Overlay qui apparaît au hover */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-150 group-hover:opacity-90"
          />
          
          {/* Contenu qui apparaît au hover - titre en haut */}
          <div 
            className="absolute inset-0 p-3 text-white transform translate-y-full transition-transform duration-150 group-hover:translate-y-0 flex flex-col justify-between"
          >
            {/* Titre en haut au hover */}
            <div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">
                {project.title}
              </h3>
            </div>
            
            {/* Description et actions en bas */}
            <div>
              <p className="text-xs mb-2 opacity-90 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-2">
                {project.technologies.slice(0, 2).map((tech) => (
                  <span
                    key={tech}
                    className={`px-1.5 py-0.5 rounded text-xs font-medium bg-gradient-to-r ${techColors[tech] || 'from-gray-500 to-gray-600'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.projectUrl && (
                <Link 
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium transition-colors duration-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  Voir le projet
                  <svg className="w-2.5 h-2.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard'; 