import React from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    type: string;
    description: string;
    image: string;
    objectives: string;
    solution: string;
    results: string;
    tags: string[];
  };
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <motion.div
      key={project.id}
      className="group bg-white bg-opacity-5 rounded-2xl overflow-hidden border border-gray-600 backdrop-blur-sm hover:border-theme-red transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
    >
      <div className="relative h-64 overflow-hidden">
        <picture>
          <source srcSet={`${project.image}?format=webp`} type="image/webp" />
          <motion.img
            src={project.image}
            alt={`${project.name} - ${project.type}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5 }}
            loading="lazy"
            width={720}
            height={480}
            decoding="async"
            fetchPriority="high"
            style={{ aspectRatio: '720/480' }}
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" aria-hidden="true" />
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <span className="inline-block px-3 py-1 bg-theme-red text-white text-sm rounded-full">
            {project.type}
          </span>
        </motion.div>
      </div>

      <div className="p-6">
        <motion.h3
          id={`project-title-${project.id}`}
          className="text-xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          {project.name}
        </motion.h3>
        <motion.p
          className="text-gray-400 mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {project.description}
        </motion.p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tagIndex}
              className="text-xs px-2 py-1 bg-theme-gray bg-opacity-10 text-white rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + tagIndex * 0.1, duration: 0.3 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;