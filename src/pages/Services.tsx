import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brush, Code, Brain, Zap, Check, ArrowRight } from "lucide-react";

const Services = () => {
  const mainServices = [
    {
      icon: <Brush size={40} className="text-communikAI-red" />,
      title: "Branding",
      description:
        "Création d'une identité visuelle unique et mémorable pour démarquer votre marque et renforcer votre présence sur le marché.",
      features: [
        "Création de logo et identité visuelle",
        "Charte graphique complète",
        "Audit et repositionnement de marque",
        "Conception de supports marketing",
        "Stratégie de communication",
      ],
    },
    {
      icon: <Code size={40} className="text-communikAI-red" />,
      title: "Création de sites",
      description:
        "Conception et développement de sites web performants, esthétiques et optimisés pour les moteurs de recherche et la conversion.",
      features: [
        "Sites vitrines professionnels",
        "Plateformes e-commerce",
        "Applications web sur mesure",
        "Sites responsive multi-support",
        "Optimisation SEO et performance",
      ],
    },
    {
      icon: <Brain size={40} className="text-communikAI-red" />,
      title: "Stratégie IA",
      description:
        "Conseil et intégration de solutions d'intelligence artificielle pour optimiser vos processus et améliorer votre prise de décision.",
      features: [
        "Analyse de données et insights",
        "Chatbots et assistants virtuels",
        "Systèmes de recommandation",
        "Personnalisation utilisateur",
        "Automatisation des processus métier",
      ],
    },
    {
      icon: <Zap size={40} className="text-communikAI-red" />,
      title: "Automatisation",
      description:
        "Mise en place de workflows intelligents pour gagner en efficacité, réduire les erreurs et vous concentrer sur l'essentiel.",
      features: [
        "Intégration de solutions Zapier",
        "Configuration de workflows n8n",
        "Automatisation marketing",
        "Connecteurs d'API personnalisés",
        "Tableau de bord centralisé",
      ],
    },
  ];

  const process = [
    {
      number: "01",
      title: "Analyse des besoins",
      description:
        "Nous étudions en profondeur vos objectifs, votre marché et vos contraintes pour définir une stratégie adaptée.",
    },
    {
      number: "02",
      title: "Conception",
      description:
        "Nous élaborons des maquettes et prototypes en collaboration étroite avec vous pour valider chaque aspect du projet.",
    },
    {
      number: "03",
      title: "Développement",
      description:
        "Notre équipe technique met en œuvre les solutions avec un code propre, performant et évolutif.",
    },
    {
      number: "04",
      title: "Tests et optimisation",
      description:
        "Nous testons rigoureusement chaque élément pour garantir une expérience utilisateur parfaite et des performances optimales.",
    },
    {
      number: "05",
      title: "Déploiement",
      description:
        "Mise en production et configuration sur vos environnements avec formation à l'utilisation des outils.",
    },
    {
      number: "06",
      title: "Suivi et évolution",
      description:
        "Nous vous accompagnons dans la durée pour faire évoluer vos solutions selon vos besoins.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Nos Services
            </h1>
            <p className="text-xl text-gray-200 mb-10">
              Des solutions innovantes et personnalisées pour répondre à tous
              vos besoins en communication et transformation digitale.
            </p>
            <Link to="/contact">
              <Button className="btn-primary">Discuter de votre projet</Button>
            </Link>
          </div>
        </div>
      </section>
      <div className="w-auto h-[0.5px] bg-gradient-to-r from-communikAI-gray to-communikAI-lightred mx-auto"></div>
      {/* Main Services Section */}
      <section className="section-padding bg-gradient-to-r from-communikAI-blue to-communikAI-red">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une approche intégrée pour votre succès digital
            </h2>
            <p className="text-lg text-white">
              Nous combinons expertise créative, maîtrise technologique et
              innovation pour vous offrir des solutions complètes et adaptées à
              vos objectifs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {mainServices.map((service, index) => (
              <div key={index} className="bg-red-200 rounded-lg shadow-lg p-10">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-500 mb-8">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="bg-communikAI-red bg-opacity-10 p-1 rounded-full mr-3 mt-1">
                        <Check className="text-communikAI-red h-4 w-4" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="text-communikAI-red font-semibold flex items-center"
                >
                  En savoir plus <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gradient-to-r from-communikAI-blue to-communikAI-red">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Notre processus de travail
            </h2>
            <p className="text-lg text-white">
              Une méthodologie éprouvée pour garantir le succès de vos projets,
              de la conception à la livraison.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-red-200 p-8 rounded-lg shadow-md border-t-4 border-communikAI-red"
              >
                <div className="text-4xl font-bold text-communikAI-red mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="section-padding bg-gradient-to-r from-communikAI-blue to-communikAI-red">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technologies et outils
            </h2>
            <p className="text-lg text-white">
              Nous utilisons les technologies les plus récentes et les plus
              adaptées pour répondre à vos besoins spécifiques.
            </p>
          </div>

          <div className="bg-red-200 rounded-lg shadow-lg p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-4">
                <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-communikAI-blue">
                    AI
                  </span>
                </div>
                <p className="font-medium">Intelligence Artificielle</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-communikAI-blue">
                    UX
                  </span>
                </div>
                <p className="font-medium">Design UX/UI</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-communikAI-blue">
                    Web
                  </span>
                </div>
                <p className="font-medium">Technologies Web</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-communikAI-blue">
                    Auto
                  </span>
                </div>
                <p className="font-medium">Automatisation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à discuter de votre projet ?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour bénéficier d'une consultation
            gratuite et découvrir comment nos services peuvent transformer votre
            communication.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-communikAI-red hover:bg-gray-100 text-lg px-8 py-6">
              Demander un devis gratuit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
