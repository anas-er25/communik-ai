
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
      
      {/* Admin quick access button - fixed in bottom right corner */}
      <div className="fixed bottom-4 right-4">
        <Link 
          to="/admin/login" 
          className="bg-slate-800 text-white p-3 rounded-full shadow-lg hover:bg-slate-700 transition-colors"
          title="Administration"
        >
          <Settings className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default Layout;
