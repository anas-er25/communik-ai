import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Réalisations
            </h1>
            <p className="text-xl text-gray-200 mb-10">
              Découvrez les projets que nous avons réalisés et les résultats
              concrets obtenus pour nos clients.
            </p>
            <Link to="/contact">
              <Button className="btn-primary">Discuter de votre projet</Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="w-auto h-[0.5px] bg-gradient-to-r from-communikAI-gray to-communikAI-lightred mx-auto"></div>

      {/* Projects Grid */}
      <section className="section-padding bg-gradient-to-r from-communikAI-blue to-communikAI-red">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Études de cas
            </h2>
            <p className="text-lg text-white">
              Chaque projet est une aventure unique, avec des défis spécifiques
              et des solutions personnalisées. Voici quelques exemples de notre
              travail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-red-100 rounded-lg shadow-lg overflow-hidden group"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <span className="bg-communikAI-red bg-opacity-10 text-communikAI-red text-xs px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  <button
                    className="text-communikAI-red font-medium flex items-center"
                    onClick={() =>
                      document
                        .getElementById(`modal-${project.id}`)
                        ?.classList.remove("hidden")
                    }
                  >
                    Voir le détail <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>

                {/* Modal */}
                <div
                  id={`modal-${project.id}`}
                  className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                >
                  <div className="bg-red-100 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-2xl font-bold">{project.name}</h3>
                          <span className="bg-communikAI-red bg-opacity-10 text-communikAI-red text-sm px-3 py-1 rounded-full inline-block mt-2">
                            {project.type}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            document
                              .getElementById(`modal-${project.id}`)
                              ?.classList.add("hidden")
                          }
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <p className="text-gray-600 mb-6">
                        {project.description}
                      </p>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Objectifs du projet
                          </h4>
                          <p className="text-gray-600">{project.objectives}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Notre solution
                          </h4>
                          <p className="text-gray-600">{project.solution}</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Résultats
                          </h4>
                          <p className="text-gray-600">{project.results}</p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <Link to="/contact">
                          <Button className="btn-primary w-full sm:w-auto">
                            Discuter d'un projet similaire
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-communikAI-blue to-communikAI-red">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-communikAI-red mb-2">
                  50+
                </div>
                <p className="text-gray-600">Projets réalisés</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-communikAI-red mb-2">
                  92%
                </div>
                <p className="text-gray-600">Clients satisfaits</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-communikAI-red mb-2">
                  45%
                </div>
                <p className="text-gray-600">Taux de conversion moyen</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-communikAI-red mb-2">
                  4
                </div>
                <p className="text-gray-600">Prix d'innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt pour votre prochain projet ?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Chaque projet commence par une conversation. Contactez-nous pour
            discuter de vos idées et objectifs.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-communikAI-red hover:bg-gray-100 text-lg px-8 py-6">
              Démarrer votre projet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Projects;
