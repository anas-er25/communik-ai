import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BaseSection from '@/components/common/BaseSection';

const CTASection = () => {
  const navigate = useNavigate();
  const getstarted = () => {
    navigate('/auth/login');
  };

  return (
    <BaseSection
      className="bg-theme-red"
      ariaLabel="Appel à l'action"
      title="Prêt à transformer votre communication ?"
      titleClassName="text-3xl md:text-5xl font-bold text-white mb-8"
      animate={false}
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={getstarted}
          className="rounded-full bg-white text-theme-red hover:bg-gray-100 px-8 py-6 font-bold text-lg"
          aria-label="Commencer maintenant"
        >
          Commencer maintenant
        </Button>
      </motion.div>
    </BaseSection>
  );
};

export default CTASection;