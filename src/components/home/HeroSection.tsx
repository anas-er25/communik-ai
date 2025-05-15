import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BaseSection from '@/components/common/BaseSection';

const HeroSection = () => {
  const navigate = useNavigate();
  const getstarted = () => {
    navigate('/auth/login');
  };

  return (
    <BaseSection
      className="bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black py-28 md:py-40"
      role="banner"
      ariaLabel="Section héros"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Nous transformons vos idées en
          <span className="text-theme-red"> puissance numérique</span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Solutions de branding, web et automatisation pour propulser votre
          entreprise vers l'excellence numérique.
        </motion.p>
        <motion.div
          className="mt-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={getstarted}
            className="rounded-full bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6"
            aria-label="Commencer maintenant"
          >
            Commencer maintenant
          </Button>
        </motion.div>
      </div>
    </BaseSection>
  );
};

export default HeroSection;