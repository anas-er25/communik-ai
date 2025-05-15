
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check, ArrowUpRight, Brush, Code, Brain, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Home = () => {
  const services = [
    {
      icon: <Brush size={28} className="text-theme-red" />,
      title: "Branding",
      description: "Création d'identité visuelle, logos et chartes graphiques qui démarquent votre marque.",
    },
    {
      icon: <Code size={28} className="text-theme-red" />,
      title: "Création de sites",
      description: "Sites vitrines, e-commerce et applications web optimisés pour le SEO et la performance.",
    },
    {
      icon: <Brain size={28} className="text-theme-red" />,
      title: "Stratégie IA",
      description: "Conseil et intégration de solutions d'intelligence artificielle pour optimiser vos processus.",
    },
    {
      icon: <Zap size={28} className="text-theme-red" />,
      title: "Automatisation",
      description: "Mise en place de workflows intelligents pour gagner en efficacité et productivité.",
    },
  ];

  const team = [
    {
      name: "Sophie Martin",
      role: "CEO & Fondatrice",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Thomas Dubois",
      role: "Directeur Technique",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Marie Lefèvre",
      role: "Directrice Créative",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Alexandre Moreau",
      role: "Expert IA",
      image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Julie Bernard",
      role: "Responsable Marketing",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
    },
  ];

  const navigate = useNavigate()
  const getstarted = () => {
    navigate('/auth/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with gradient background */}
      <section className="bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black py-28 md:py-40">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Nous transformons vos idées en
              <span className="text-theme-red"> puissance numérique</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              Solutions de branding, web et automatisation pour propulser votre
              entreprise vers l'excellence numérique.
            </p>
            <div className="mt-10">
              <Button onClick={getstarted} className="rounded-full bg-theme-red hover:bg-theme-brightRed text-white px-8 py-6">
                Commencer maintenant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Power Section */}
      <section className="bg-theme-black py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                L'infrastructure pour développer <span className="text-theme-red">l'économie numérique</span>
              </h2>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-theme-red mb-2">
                  Construire avec CommunikAI
                </h3>
                <p className="text-gray-300">
                  Notre agence vous offre des solutions complètes pour transformer votre présence digitale. 
                  De la conception à la mise en œuvre, nous vous accompagnons à chaque étape de votre 
                  projet digital pour vous assurer un succès durable.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-tr from-theme-red to-theme-black p-6 rounded-lg">
                <AspectRatio ratio={4/3}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-white">
                      <ArrowUpRight className="w-12 h-12 text-white mb-4" />
                      <div className="h-16 bg-gradient-to-r from-theme-red to-theme-brightRed w-3/4 mb-2 rounded"></div>
                      <div className="h-16 bg-gradient-to-r from-theme-red to-theme-brightRed w-full mb-2 rounded"></div>
                      <div className="h-16 bg-gradient-to-r from-theme-red to-theme-brightRed w-11/12 rounded"></div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gradient-to-b from-theme-black to-theme-charcoal py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
            La Plateforme Intelligente pour
            <span className="text-theme-red"> Votre Communication</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="bg-theme-black border border-theme-gray/30 p-8 rounded-lg hover:border-theme-red transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center bg-theme-charcoal p-4 rounded-lg mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gradient-to-b from-theme-charcoal to-theme-black py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-20">
            Notre équipe d'experts
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center mb-12">
                <div className="relative inline-block">
                  <div className="w-32 h-32 overflow-hidden rounded-full border-4 border-theme-red mb-4 relative z-10">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-theme-red rounded-full blur-xl opacity-30 z-0"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-theme-red">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-theme-red py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            Prêt à transformer votre communication ?
          </h2>
          <Button onClick={getstarted} className="rounded-full bg-white text-theme-red hover:bg-gray-100 px-8 py-6 font-bold text-lg">
            Commencer maintenant
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
