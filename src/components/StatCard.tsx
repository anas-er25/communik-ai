import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  value: string;
  label: string;
  index: number;
}

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const StatCard: React.FC<StatCardProps> = ({ value, label, index }) => {
  return (
    <motion.div
      className="bg-white bg-opacity-5 p-8 rounded-2xl border border-gray-600 text-center backdrop-blur-sm"
      variants={statVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      role="article"
      aria-label={`${label}: ${value}`}
    >
      <motion.div
        className="text-4xl font-bold text-theme-red mb-2"
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.2 + 0.2, duration: 0.5, type: 'spring' }}
      >
        {value}
      </motion.div>
      <p className="text-gray-300">{label}</p>
    </motion.div>
  );
};

export default StatCard;