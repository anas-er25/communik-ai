import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Fatimaezzahra ALAMI",
      role: "Directrice Créative",
      bio: "Avec plus de 10 ans d'expérience dans le design et la communication visuelle, Alexandra dirige notre équipe créative avec passion et innovation.",
      expertise: ["Branding", "Direction Artistique", "Stratégie de marque"],
      image: "https://mighty.tools/mockmind-api/content/human/8.jpg",
    },
    {
      name: "Thomas Leroux",
      role: "Lead Développeur",
      bio: "Expert en technologies web modernes, Thomas supervise tous nos projets de développement avec un focus sur la performance et l'expérience utilisateur.",
      expertise: ["Développement Frontend", "React", "Architecture logicielle"],
      image: "https://mighty.tools/mockmind-api/content/human/80.jpg",
    },
    {
      name: "Sophie Dubois",
      role: "Spécialiste IA",
      bio: "Docteure en intelligence artificielle, Sophie apporte son expertise pour intégrer des solutions IA innovantes dans tous nos projets.",
      expertise: [
        "Machine Learning",
        "Traitement du langage naturel",
        "Data Science",
      ],
      image: "https://mighty.tools/mockmind-api/content/human/108.jpg",
    },
    {
      name: "David Chen",
      role: "Expert en Automatisation",
      bio: "Expert en optimisation des processus, David conçoit des solutions d'automatisation sur mesure qui transforment l'efficacité opérationnelle.",
      expertise: ["Workflows", "Intégration API", "Optimisation des processus"],
      image: "https://mighty.tools/mockmind-api/content/human/92.jpg",
    },
    {
      name: "Émilie Petit",
      role: "UX/UI Designer",
      bio: "Émilie crée des interfaces utilisateur élégantes et intuitives, alliant esthétique et fonctionnalité pour une expérience utilisateur optimale.",
      expertise: ["Design d'interface", "Wireframing", "Tests utilisateurs"],
      image: "https://mighty.tools/mockmind-api/content/human/97.jpg",
    },
    {
      name: "Julien Moreau",
      role: "Chef de Projet",
      bio: "Julien coordonne nos projets avec rigueur et créativité, assurant une communication fluide et le respect des délais et des objectifs.",
      expertise: [
        "Gestion de projet",
        "Méthodologies agiles",
        "Analyse des besoins",
      ],
      image: "https://mighty.tools/mockmind-api/content/human/91.jpg",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "Nous explorons constamment de nouvelles technologies et approches pour offrir des solutions à la pointe de l'innovation.",
    },
    {
      title: "Excellence",
      description:
        "Nous nous engageons à fournir un travail de la plus haute qualité, avec une attention méticuleuse aux détails.",
    },
    {
      title: "Collaboration",
      description:
        "Nous croyons au pouvoir du travail d'équipe, tant en interne qu'avec nos clients, pour créer des solutions vraiment adaptées.",
    },
    {
      title: "Transparence",
      description:
        "Nous maintenons une communication ouverte et honnête à chaque étape du processus.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-communikAI-blue text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Équipe
            </h1>
            <p className="text-xl text-gray-200 mb-10">
              Une équipe passionnée d'experts en communication, design,
              technologie et intelligence artificielle.
            </p>
            <Link to="/contact">
              <Button className="btn-primary">Rencontrer l'équipe</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Les talents derrière CommunikAI
            </h2>
            <p className="text-lg text-gray-600">
              Notre force réside dans la diversité des compétences et des
              parcours de notre équipe. Ensemble, nous associons créativité,
              expertise technique et vision stratégique pour vous accompagner
              dans votre transformation digitale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-communikAI-red font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Expertise :
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="text-gray-500 hover:text-communikAI-red transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-communikAI-red transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-communikAI-red transition-colors"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nos valeurs</h2>
            <p className="text-lg text-gray-600">
              Ces principes guident notre approche et définissent notre culture
              d'entreprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-communikAI-red">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Rejoignez notre équipe
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Nous sommes toujours à la recherche de talents passionnés pour
                  rejoindre notre équipe et contribuer à des projets innovants.
                </p>
                <Link to="/contact">
                  <Button className="btn-primary">Postuler</Button>
                </Link>
              </div>
              <div className="bg-communikAI-red bg-opacity-10 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  Pourquoi travailler chez CommunikAI ?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-communikAI-red bg-opacity-20 p-1 rounded-full mr-3 mt-1">
                      <div className="w-3 h-3 bg-communikAI-red rounded-full"></div>
                    </div>
                    <span>Projets innovants et stimulants</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-communikAI-red bg-opacity-20 p-1 rounded-full mr-3 mt-1">
                      <div className="w-3 h-3 bg-communikAI-red rounded-full"></div>
                    </div>
                    <span>Environnement de travail collaboratif</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-communikAI-red bg-opacity-20 p-1 rounded-full mr-3 mt-1">
                      <div className="w-3 h-3 bg-communikAI-red rounded-full"></div>
                    </div>
                    <span>Opportunités de formation continue</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-communikAI-red bg-opacity-20 p-1 rounded-full mr-3 mt-1">
                      <div className="w-3 h-3 bg-communikAI-red rounded-full"></div>
                    </div>
                    <span>Culture d'entreprise positive et inclusive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-communikAI-blue to-communikAI-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Travaillons ensemble
          </h2>
          <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Prenez contact avec notre équipe pour discuter de votre projet et
            découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <Link to="/contact">
            <Button className="bg-white text-communikAI-red hover:bg-gray-100 text-lg px-8 py-6">
              Nous contacter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Team;
