import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: "TechStart",
      type: "Branding & Site Web",
      description:
        "Refonte complète de l'identité visuelle et création d'un site vitrine moderne pour cette startup technologique.",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=720&auto=format&fit=crop",
      objectives:
        "Moderniser l'image de marque et améliorer la présence en ligne pour attirer des investisseurs.",
      solution:
        "Création d'un logo épuré, d'une charte graphique complète et d'un site responsive avec animations.",
      results:
        "Augmentation de 40% des demandes de contact et réduction du taux de rebond de 25%.",
      tags: ["Branding", "Web Design", "UI/UX"],
    },
    {
      id: 2,
      name: "EcoDesign",
      type: "Automatisation & IA",
      description:
        "Mise en place d'un système d'automatisation des processus marketing et intégration d'un chatbot intelligent.",
      image:
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=720&auto=format&fit=crop",
      objectives:
        "Optimiser la gestion des leads et améliorer le service client 24/7.",
      solution:
        "Configuration d'un workflow Zapier personnalisé et développement d'un assistant virtuel basé sur l'IA.",
      results:
        "Réduction de 60% du temps de traitement des demandes et augmentation de 35% du taux de conversion.",
      tags: ["IA", "Automatisation", "ChatBot"],
    },
    {
      id: 3,
      name: "InnoSphere",
      type: "Site E-commerce",
      description:
        "Conception et développement d'une plateforme e-commerce complète avec système de gestion des stocks.",
      image:
        "https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=720&auto=format&fit=crop",
      objectives:
        "Créer une expérience d'achat fluide et optimiser la gestion interne.",
      solution:
        "Développement d'un site e-commerce sur mesure avec intégration de systèmes de paiement et CRM.",
      results:
        "Augmentation des ventes en ligne de 120% et amélioration de l'efficacité logistique de 45%.",
      tags: ["E-commerce", "Web Development", "UX Design"],
    },
    {
      id: 4,
      name: "DataVision",
      type: "Stratégie IA & Analytics",
      description:
        "Implémentation d'une solution d'analyse de données basée sur l'IA pour optimiser les décisions commerciales.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=720&auto=format&fit=crop",
      objectives:
        "Améliorer la prise de décision basée sur les données et identifier de nouvelles opportunités.",
      solution:
        "Développement d'un tableau de bord personnalisé avec visualisation de données et prédictions IA.",
      results:
        "Identification de nouvelles opportunités commerciales générant une augmentation du CA de 28%.",
      tags: ["Data Analytics", "IA", "Business Intelligence"],
    },
    {
      id: 5,
      name: "CreativeMinds",
      type: "Branding & Communication",
      description:
        "Création d'une identité visuelle distinctive et d'une stratégie de communication multicanale.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=720&auto=format&fit=crop",
      objectives:
        "Renforcer la reconnaissance de la marque et accroître la visibilité.",
      solution:
        "Conception d'une identité mémorable et déploiement d'une campagne cross-média cohérente.",
      results:
        "Augmentation de la notoriété de marque de 55% et croissance des followers sur les réseaux sociaux de 130%.",
      tags: ["Branding", "Communication", "Social Media"],
    },
    {
      id: 6,
      name: "FutureLabs",
      type: "Site Web & Automatisation",
      description:
        "Refonte du site internet et mise en place de processus d'automatisation pour la génération de leads.",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=720&auto=format&fit=crop",
      objectives:
        "Moderniser l'image en ligne et optimiser la conversion des visiteurs en prospects.",
      solution:
        "Création d'un site moderne et d'un système de nurturing automatisé avec séquences d'emails personnalisés.",
      results:
        "Augmentation du taux de conversion de 45% et amélioration du taux d'engagement de 70%.",
      tags: ["Web Design", "Automatisation", "Lead Generation"],
    },
  ];

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Animation variants for project cards
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  // Animation variants for stats
  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
                <Button className="bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6 rounded-full">
                  Démarrer votre projet
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
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
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group bg-white bg-opacity-5 rounded-2xl overflow-hidden border border-gray-600 backdrop-blur-sm hover:border-theme-red transition-all duration-300"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <span className="inline-block px-3 py-1 bg-theme-red text-white text-sm rounded-full">
                      {project.type}
                    </span>
                  </motion.div>
                </div>

                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold text-white mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {project.name}
                  </motion.h3>
                  <motion.p
                    className="text-gray-400 mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                  >
                    {project.description}
                  </motion.p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-theme-gray bg-opacity-10 text-white rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + tagIndex * 0.1, duration: 0.3 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
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
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Projets réalisés" },
              { value: "92%", label: "Clients satisfaits" },
              { value: "45%", label: "Taux de conversion moyen" },
              { value: "4", label: "Prix d'innovation" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white bg-opacity-5 p-8 rounded-2xl border border-gray-600 text-center backdrop-blur-sm"
                variants={statVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  className="text-4xl font-bold text-theme-red mb-2"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.2, duration: 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
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
              <Button className="bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6 rounded-full">
                Démarrer votre projet
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="ml-2 h-5 w-5" />
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