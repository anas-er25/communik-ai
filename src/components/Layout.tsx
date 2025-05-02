
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <div className="fixed bottom-6 right-2 z-50">
        <div className="bg-indigo-600 text-white py-4 px-8 w-16 h-16 rounded-full flex items-center justify-center">
          <Link to="/admin/login" title="Accéder à l'administration">
            <Settings className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;