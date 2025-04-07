import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const { user, userProfile, loading, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
  };

  // Ne rien afficher jusqu'à ce que le composant soit monté côté client
  if (!mounted) {
    return null;
  }

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
            {!loading ? (
              <>
                {user && userProfile ? (
                  <>
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
                      className={`text-[#f6bc7c] hover:text-[#f6bc7c]/80 ${
                        isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
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
            ) : (
              <div className="text-[#f6bc7c] opacity-50">Chargement...</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
