
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-communikAI-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-heading font-bold text-white">
                Communik<span className="text-communikAI-purple">AI</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-6">
              Agence spécialisée en branding, création de sites web, stratégie IA et automatisation.
              Nous transformons vos idées en réalités numériques.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to="/equipe" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link to="/realisations" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-communikAI-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-communikAI-purple shrink-0 mt-1" />
                <p className="text-gray-300">123 Rue de l'Innovation, 75000 Paris</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-communikAI-purple" />
                <p className="text-gray-300">+33 1 23 45 67 89</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-communikAI-purple" />
                <p className="text-gray-300">contact@communik-ai.fr</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <p className="text-center text-gray-400">
            &copy; {currentYear} CommunikAI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
