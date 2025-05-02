
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // For admin check, check if the user's email is in the admin list
  useEffect(() => {
    const checkAdmin = async () => {
      // This is a simple example. In a real application, you would likely
      // check a claim in the user's Firebase token, or check against a database
      if (currentUser?.email === "errakibianas8@gmail.com") { 
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    if (currentUser) {
      checkAdmin();
    }
  }, [currentUser]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center mb-4">
          <svg className="animate-spin h-8 w-8 text-communikAI-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!currentUser) {
    toast({
      title: "Accès refusé",
      description: "Veuillez vous connecter pour accéder à cette page.",
      variant: "destructive"
    });
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (adminOnly && !isAdmin) {
    toast({
      title: "Accès refusé",
      description: "Seuls les administrateurs peuvent accéder à cette page.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  // All checks passed, render the protected route
  return <>{children}</>;
};

export default PrivateRoute;
