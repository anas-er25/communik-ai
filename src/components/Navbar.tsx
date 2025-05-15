
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from '../../public/logo.png';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="bg-theme-black text-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-heading font-bold text-white">
            <img src={logo} alt="logo" width={200} />
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-theme-red transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:text-theme-red">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="h-8 w-8 rounded-full border border-theme-red"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-theme-black border border-theme-red">
                <div className="p-2 text-sm text-white">
                  <span className="font-medium">{currentUser.displayName || currentUser.email}</span>
                </div>
                <DropdownMenuSeparator className="bg-theme-gray" />
                <DropdownMenuItem asChild className="text-white hover:text-theme-red hover:bg-theme-darkBlack">
                  <Link to="/profile" className="cursor-pointer">Mon profil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-theme-gray" />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-white hover:text-theme-red hover:bg-theme-darkBlack">
                  Se déconnecter
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-2">
              <Link to="/auth/login">
                <Button variant="outline" className="border-theme-red text-theme-red hover:bg-theme-red hover:text-white">Connexion</Button>
              </Link>
              <Link to="/auth/register">
                <Button className="bg-theme-red text-white hover:bg-theme-darkRed">S'inscrire</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-white hover:text-theme-red"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-theme-black shadow-md py-4 px-4 absolute top-16 left-0 right-0 z-50 animate-fade-in border-t border-theme-gray">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-theme-red transition-colors py-2 px-4 font-medium"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
            
            {currentUser ? (
              <>
                <Link to="/profile" className="py-2 px-4 text-gray-300 hover:text-theme-red" onClick={toggleMenu}>Mon profil</Link>
                <Button variant="outline" className="justify-start border-theme-red text-theme-red hover:bg-theme-red hover:text-white" onClick={() => {
                  handleSignOut();
                  toggleMenu();
                }}>
                  Se déconnecter
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login" onClick={toggleMenu}>
                  <Button variant="outline" className="w-full border-theme-red text-theme-red hover:bg-theme-red hover:text-white">Connexion</Button>
                </Link>
                <Link to="/auth/register" onClick={toggleMenu}>
                  <Button className="w-full bg-theme-red text-white hover:bg-theme-darkRed">S'inscrire</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
