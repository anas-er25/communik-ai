import React from 'react';
import { motion } from 'framer-motion';
import TeamMemberCard from './TeamMemberCard';
import { team } from '@/data/home';

const TeamSection = () => {
  return (
    <motion.section
      className="bg-gradient-to-b from-theme-charcoal to-theme-black py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      role="region"
      aria-label="Notre équipe"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-white mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Notre équipe d'experts
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TeamSection;