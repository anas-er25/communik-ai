import React from 'react';
import { motion } from 'framer-motion';

interface BaseSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  titleClassName?: string;
  titleHighlight?: string;
  animate?: boolean;
  role?: string;
  ariaLabel?: string;
}

const BaseSection: React.FC<BaseSectionProps> = ({
  children,
  className = '',
  title,
  titleClassName = 'text-3xl md:text-5xl font-bold text-white mb-12',
  titleHighlight,
  animate = true,
  role = 'region',
  ariaLabel,
}) => {
  const SectionComponent = animate ? motion.section : 'section';
  const TitleComponent = animate ? motion.h2 : 'h2';

  const sectionProps = animate ? {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    variants: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    },
  } : {};

  const titleProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  } : {};

  return (
    <SectionComponent
      className={`py-24 ${className}`}
      role={role}
      aria-label={ariaLabel}
      {...sectionProps}
    >
      <div className="container mx-auto px-4 text-center">
        {title && (
          <TitleComponent
            className={titleClassName}
            {...titleProps}
          >
            {title}
            {titleHighlight && (
              <span className="text-theme-red"> {titleHighlight}</span>
            )}
          </TitleComponent>
        )}
        {children}
      </div>
    </SectionComponent>
  );
};

export default BaseSection;