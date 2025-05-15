import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import StatCard from "@/components/StatCard";
import { projects, stats } from "@/data/projects";

const Projects = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        role="banner"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Nos <span className="text-theme-red">Réalisations</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Découvrez comment nous transformons les défis en opportunités et les
              idées en succès mesurables.
            </motion.p>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact">
                <Button 
                  className="bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6 rounded-full"
                  aria-label="Démarrer votre projet"
                >
                  Démarrer votre projet
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Grid */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        role="region"
        aria-label="Nos projets"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-theme-black bg-opacity-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        role="region"
        aria-label="Nos statistiques"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        role="region"
        aria-label="Appel à l'action"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Prêt pour votre prochain projet ?
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Transformez vos idées en réalité avec notre expertise en design,
            développement et innovation.
          </motion.p>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link to="/contact">
              <Button 
                className="bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6 rounded-full"
                aria-label="Démarrer votre projet"
              >
                Démarrer votre projet
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Projects;