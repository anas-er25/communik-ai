import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BaseSection from '@/components/common/BaseSection';

const PowerSection = () => {
  return (
    <BaseSection
      className="bg-theme-black"
      ariaLabel="Section infrastructure numérique"
      title="L'infrastructure pour développer"
      titleHighlight="l'économie numérique"
      titleClassName="text-3xl md:text-5xl font-bold text-white mb-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-bold text-theme-red mb-2">
              Construire avec CommunikAI
            </h3>
            <p className="text-gray-300">
              Notre agence vous offre des solutions complètes pour transformer
              votre présence digitale. De la conception à la mise en œuvre,
              nous vous accompagnons à chaque étape de votre projet digital
              pour vous assurer un succès durable.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-tr from-theme-red to-theme-black p-6 rounded-lg">
            <AspectRatio ratio={4 / 3}>
              <div className="w-full h-full flex items-center justify-center">
                <iframe 
                  src='https://my.spline.design/worldplanet-FhWJwimcYPs1v7SNInFhsCQN/' 
                  width='100%' 
                  height='100%'
                  title="Animation 3D du monde"
                />
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </BaseSection>
  );
};

export default PowerSection;