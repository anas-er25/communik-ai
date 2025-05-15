export interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  image: string;
  objectives: string;
  solution: string;
  results: string;
  tags: string[];
}

export const projects: Project[] = [
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

export const stats = [
  { value: "50+", label: "Projets réalisés" },
  { value: "92%", label: "Clients satisfaits" },
  { value: "45%", label: "Taux de conversion moyen" },
  { value: "4", label: "Prix d'innovation" },
];