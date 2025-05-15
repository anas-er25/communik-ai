import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image, index }) => {
  const teamVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="text-center mb-12"
      variants={teamVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      role="article"
      aria-label={`Membre de l'équipe ${name}`}
    >
      <div className="relative inline-block">
        <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-theme-red mb-4 relative z-10">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <motion.div
          className="absolute inset-0 bg-theme-red rounded-full blur-xl opacity-30 z-0"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        ></motion.div>
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-theme-red">{role}</p>
    </motion.div>
  );
};

export default TeamMemberCard;