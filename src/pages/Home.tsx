import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Brush, Code, Brain, Zap } from "lucide-react";

const Home = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "CEO, TechStart",
      content:
        "Grâce à CommunikAI, notre identité visuelle a pris une nouvelle dimension. Un travail remarquable qui a boosté notre notoriété de 40%.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Thomas Martin",
      role: "Directeur Marketing, InnoSphere",
      content:
        "L'automatisation mise en place par l'équipe a révolutionné nos processus. Nous avons gagné en efficacité et en précision.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
    },
    {
      name: "Sophie Garcia",
      role: "Fondatrice, EcoDesign",
      content:
        "Notre nouveau site est non seulement magnifique mais aussi parfaitement optimisé. Les résultats dépassent nos attentes.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    },
  ];

  const clients = [
    "TechStart",
    "InnoSphere",
    "EcoDesign",
    "DataVision",
    "CreativeMinds",
    "FutureLabs",
  ];

  const services = [
    {
      icon: <Brush size={28} className="text-communikAI-red" />,
      title: "Branding",
      description:
        "Création d'identité visuelle, logos et chartes graphiques qui démarquent votre marque.",
      path: "/services",
    },
    {
      icon: <Code size={28} className="text-communikAI-red" />,
      title: "Création de sites",
      description:
        "Sites vitrines, e-commerce et applications web optimisés pour le SEO et la performance.",
      path: "/services",
    },
    {
      icon: <Brain size={28} className="text-communikAI-red" />,
      title: "Stratégie IA",
      description:
        "Conseil et intégration de solutions d'intelligence artificielle pour optimiser vos processus.",
      path: "/services",
    },
    {
      icon: <Zap size={28} className="text-communikAI-red" />,
      title: "Automatisation",
      description:
        "Mise en place de workflows intelligents pour gagner en efficacité et productivité.",
      path: "/services",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transformez votre communication avec
              <span className="text-communikAI-red"> l'IA</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              Solutions de branding, web et automatisation pour propulser votre
              entreprise vers l'excellence numérique.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/contact">
                <Button className="btn-primary text-lg w-full sm:w-auto">
                  Demander un devis
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-gray-800 text-lg w-full sm:w-auto"
                >
                  Découvrir nos services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="section-padding bg-gradient-to-r from-communikAI-lightblue to-communikAI-lightred">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos Services
            </h2>
            <div className="w-24 h-1 bg-communikAI-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une approche intégrée combinant créativité, technologie et
              innovation pour répondre à tous vos besoins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-5">{service.description}</p>
                <Link
                  to={service.path}
                  className="text-communikAI-red font-medium hover:underline"
                >
                  En savoir plus
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Pourquoi choisir{" "}
                <span className="text-communikAI-red">CommunikAI</span> ?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous combinons expertise créative et maîtrise technologique pour
                offrir des solutions sur mesure qui génèrent des résultats
                concrets.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-communikAI-red bg-opacity-10 p-1 rounded-full mr-3">
                    <Check className="text-communikAI-red h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-medium">Expertise IA intégrée</span>
                    <p className="text-gray-600 mt-1">
                      Solutions innovantes alimentées par l'intelligence
                      artificielle.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-communikAI-red bg-opacity-10 p-1 rounded-full mr-3">
                    <Check className="text-communikAI-red h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-medium">
                      Design centré utilisateur
                    </span>
                    <p className="text-gray-600 mt-1">
                      Expériences numériques engageantes et intuitives.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-communikAI-red bg-opacity-10 p-1 rounded-full mr-3">
                    <Check className="text-communikAI-red h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-medium">Solutions évolutives</span>
                    <p className="text-gray-600 mt-1">
                      Adaptées à vos besoins actuels et futurs.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-communikAI-red bg-opacity-10 p-1 rounded-full mr-3">
                    <Check className="text-communikAI-red h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-medium">Support continu</span>
                    <p className="text-gray-600 mt-1">
                      Accompagnement personnalisé tout au long de votre projet.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-tr from-communikAI-red to-communikAI-lightred rounded-lg h-64 md:h-96 w-full"></div>
              <div className="absolute inset-0 bg-white bg-opacity-90 m-4 rounded-lg shadow-xl p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Notre approche</h3>
                <p className="text-gray-600 mb-6">
                  Nous associons stratégie, créativité et technologie pour
                  offrir des solutions complètes qui répondent précisément à vos
                  besoins.
                </p>
                <Link to="/services">
                  <Button className="btn-primary w-full sm:w-auto">
                    Découvrir notre méthodologie
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-communikAI-blue text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ils nous font confiance
            </h2>
            <div className="w-24 h-1 bg-communikAI-red mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de notre collaboration et des
              résultats obtenus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-5 p-8 rounded-lg border border-gray-700"
              >
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center">
            {clients.map((client, index) => (
              <div key={index} className="px-8 py-4">
                <p className="text-gray-400 font-medium text-xl">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à transformer votre communication ?
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et
            découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-communikAI-red hover:bg-gray-100 text-lg px-8 py-6">
              Commencer votre projet
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
