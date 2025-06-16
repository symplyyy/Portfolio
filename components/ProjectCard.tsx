import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  technologies?: string[];
}

const ProjectCard = ({ title, description, imageUrl, projectUrl, technologies }: ProjectCardProps) => {
  return (
    <div className="group max-w-[600px] w-full">
      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={imageUrl}
          alt={title}
          width={1920}
          height={1080}
          quality={100}
          priority
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-6">
        <h3 className="mb-4 text-2xl font-bold text-[#2C3E50]">{title}</h3>
        <p className="mb-6 text-[#34495E] text-base">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-[#5C97CE] rounded-full text-sm text-white"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <a 
          href={projectUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-[#5C97CE] hover:text-[#89A8CC] font-medium transition-colors text-base"
        >
          Voir le projet
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard; 