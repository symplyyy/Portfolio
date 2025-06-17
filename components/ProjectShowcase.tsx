import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Définition des couleurs par technologie
const techColors: { [key: string]: string } = {
  // Frontend
  'React': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'Next.js': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'TypeScript': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'JavaScript': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'Javascript': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'TailwindCSS': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'Bootstrap': 'bg-gradient-to-r from-blue-500 to-purple-600',
  'D3.js': 'bg-gradient-to-r from-blue-500 to-purple-600',
  
  // Backend
  'Symfony': 'bg-gradient-to-r from-green-500 to-teal-600',
  'Laravel': 'bg-gradient-to-r from-green-500 to-teal-600',
  'PHP': 'bg-gradient-to-r from-green-500 to-teal-600',
  'Node.js': 'bg-gradient-to-r from-green-500 to-teal-600',
  'PostgreSQL': 'bg-gradient-to-r from-green-500 to-teal-600',
  'MySQL': 'bg-gradient-to-r from-green-500 to-teal-600',
  'C#': 'bg-gradient-to-r from-green-500 to-teal-600',
  "Python": "bg-gradient-to-r from-green-500 to-teal-600",
  
  // Autre/API/Design
  'API Google Maps': 'bg-gradient-to-r from-orange-500 to-red-600',
  'API Spotify': 'bg-gradient-to-r from-orange-500 to-red-600',
  'Opensky Network API': 'bg-gradient-to-r from-orange-500 to-red-600',
  'Chart.js': 'bg-gradient-to-r from-orange-500 to-red-600',
};

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  technologies: string[];
}

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  return (
    <div className="relative z-10 w-[95%] sm:w-[85%] lg:w-[80%] mx-auto px-2 sm:px-4">
      {/* Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group bg-white rounded-xl shadow-xl overflow-hidden"
          >
            {/* Image du projet */}
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                quality={100}
                priority={index < 4}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                  '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/></svg>'
                ).toString('base64')}`}
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                style={{
                  transform: 'translate3d(0, 0, 0)',
                }}
                unoptimized
              />
              {/* Overlay avec dégradé */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Contenu du projet */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {project.title}
              </h3>
              
              <p className="text-sm transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mt-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 backdrop-blur-sm rounded-full text-xs font-medium ${
                      techColors[tech] || 'bg-white/20'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Lien vers le projet */}
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-sm font-medium transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 hover:text-[#5C97CE]"
                >
                  Voir le projet
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase; 