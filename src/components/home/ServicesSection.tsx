import React from 'react';
import ServiceCard from './ServiceCard';
import { services } from '@/data/home';
import BaseSection from '@/components/common/BaseSection';

const ServicesSection = () => {
  return (
    <BaseSection
      className="bg-gradient-to-b from-theme-black to-theme-charcoal"
      ariaLabel="Nos services"
      title="La Plateforme Intelligente pour"
      titleHighlight="Votre Communication"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            index={index}
          />
        ))}
      </div>
    </BaseSection>
  );
};

export default ServicesSection;