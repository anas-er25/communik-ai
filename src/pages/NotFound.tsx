import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-theme-black via-theme-darkRed to-theme-black">
      <div className="text-center bg-white bg-opacity-5 border-theme-gray/30 backdrop-blur-sm rounded-lg p-8">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-4">Oops ! Page non trouvée</p>
        <a href="/" className="text-gray-300 hover:text-theme-brightRed">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;