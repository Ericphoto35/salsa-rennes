import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes, FaSpinner } from 'react-icons/fa';

export default function Navbar() {
  const { user, userProfile, loading, authError, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navError, setNavError] = useState('');

  useEffect(() => {
    setMounted(true);
    
    // Réinitialiser les erreurs de navigation lorsque l'état d'authentification change
    if (authError) {
      setNavError(authError);
    } else {
      setNavError('');
    }
  }, [authError]);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      setNavError('');
      await signOut();
    } catch (error) {
      console.error('Error in handleSignOut:', error);
      setNavError('Erreur lors de la déconnexion');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Ne rien afficher jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return null;
  }
  
  // Fonction pour afficher un indicateur de chargement
  const renderLoadingState = () => (
    <div className="flex items-center justify-center text-[#f6bc7c] opacity-70">
      <FaSpinner className="animate-spin mr-2" />
      <span>Chargement...</span>
    </div>
  );

  return (
    <nav className="fixed w-full bg-[#2b2b2b] shadow-lg z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-[#f6bc7c] text-xl font-bold">
            Salsa Rennes
          </Link>

          {/* Bouton hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#f6bc7c] hover:text-[#f6bc7c]/80"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Menu de navigation */}
          <div
            className={`${
              isMenuOpen ? 'flex' : 'hidden'
            } md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-[#2b2b2b] md:bg-transparent py-4 md:py-0 px-4 md:px-0 space-y-4 md:space-y-0 md:space-x-4 items-center shadow-lg md:shadow-none`}
          >
            {/* Afficher les erreurs de navigation si présentes */}
            {navError && (
              <div className="text-red-500 bg-red-500/10 p-2 rounded-md text-sm mb-2 md:mb-0">
                {navError}
              </div>
            )}
            
            {loading ? (
              renderLoadingState()
            ) : (
              <>
                {user && userProfile ? (
                  <>
                    <div className="text-white text-sm mr-4">
                      {userProfile.full_name || userProfile.email}
                    </div>
                    {userProfile.is_admin && (
                      <Link
                        href="/admin"
                        className="text-[#f6bc7c] hover:text-[#f6bc7c]/80"
                      >
                        Administration
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                      className={`text-[#f6bc7c] hover:text-[#f6bc7c]/80 flex items-center ${
                        isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoggingOut && <FaSpinner className="animate-spin mr-2" />}
                      {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[#f6bc7c] hover:text-[#f6bc7c]/80"
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/inscription"
                      className="bg-[#f6bc7c] text-[#2b2b2b] px-4 py-2 rounded-md hover:bg-[#f6bc7c]/80"
                    >
                      S'inscrire
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
