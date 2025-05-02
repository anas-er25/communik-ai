
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Settings } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();
  
  // Check if user is admin (same logic as in PrivateRoute)
  const isAdmin = currentUser?.email === "errakibianas8@gmail.com";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Admin quick access button */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50">
          <Link 
            to="/admin" 
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
            title="Administration"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      )}
      
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
