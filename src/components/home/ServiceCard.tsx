import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-theme-black border border-theme-gray/30 p-8 rounded-lg hover:border-theme-red transition-all duration-300"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      role="article"
      aria-label={`Service ${title}`}
    >
      <motion.div
        className="inline-flex items-center justify-center bg-theme-charcoal p-4 rounded-lg mb-6"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
      >
        <Icon size={28} className="text-theme-red" />
      </motion.div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;