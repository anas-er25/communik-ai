
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Équipe', path: '/equipe' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-heading font-bold text-communikAI-blue">
            Communik<span className="text-communikAI-purple">AI</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-communikAI-purple transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link to="/contact">
            <Button className="btn-primary">Demander un devis</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-4 absolute top-16 left-0 right-0 z-50 animate-fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-communikAI-purple transition-colors py-2 px-4 font-medium"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={toggleMenu}>
              <Button className="btn-primary w-full">Demander un devis</Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
