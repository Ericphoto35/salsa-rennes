import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

export default function Navbar() {
  const { user, userProfile, loading, authError, signOut, fetchUserProfile } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navError, setNavError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const refreshUserProfile = useCallback(async () => {
    if (!user) return;
    try {
      setIsRefreshing(true);
      setNavError('');
      await fetchUserProfile(user.id);
    } catch (error) {
      console.error('Error refreshing profile:', error);
      setNavError('Erreur lors du rafraîchissement du profil');
    } finally {
      setIsRefreshing(false);
    }
  }, [user, fetchUserProfile]);

  useEffect(() => {
    setMounted(true);
    if (authError) {
      setNavError(authError);
    } else {
      setNavError('');
    }
    if (mounted && user && !userProfile && !loading) {
      refreshUserProfile();
    }
  }, [authError, user, userProfile, loading, mounted, refreshUserProfile]);

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

  if (!mounted) return null;

  const renderLoadingState = () => (
    <div className="flex items-center justify-center text-[#f6bc7c] opacity-70">
      <FaSpinner className="animate-spin mr-2" />
      <span className="text-sm">Chargement...</span>
    </div>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#121212]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-[#121212]/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-[#f6bc7c] text-lg font-bold tracking-wide hover:text-white transition-colors duration-200"
          >
            Salsa <span className="text-white/60 font-normal">Rennes</span>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#f6bc7c] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navError && (
              <span className="text-red-400 text-sm mr-2">{navError}</span>
            )}
            {loading ? (
              renderLoadingState()
            ) : (
              <>
                {user && userProfile ? (
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 text-sm">{userProfile.full_name || userProfile.email}</span>
                    {userProfile.is_admin && (
                      <Link href="/admin" className="text-[#f6bc7c] hover:text-white text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10">
                        Administration
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                      className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/10 disabled:opacity-50"
                    >
                      {isLoggingOut && <FaSpinner className="animate-spin" />}
                      {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
                    </button>
                  </div>
                ) : user && !userProfile ? (
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-yellow-500 text-sm" />
                    <button
                      onClick={refreshUserProfile}
                      disabled={isRefreshing}
                      className="text-[#f6bc7c] text-sm px-3 py-1.5 rounded-lg border border-[#f6bc7c]/30 hover:bg-[#f6bc7c]/10 transition-colors disabled:opacity-50"
                    >
                      {isRefreshing ? 'Rafraîchissement...' : 'Rafraîchir'}
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                    >
                      Se déconnecter
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <Link
                      href="/pourquoi-salsa"
                      className="text-white/70 hover:text-[#f6bc7c] font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                    >
                      Pourquoi la salsa ?
                    </Link>
                    <Link
                      href="/notre-communaute"
                      className="text-white/70 hover:text-[#f6bc7c] font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
                    >
                      Notre Communauté
                    </Link>
                    <Link
                      href="/login"
                      className="text-white/70 hover:text-white font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-white/5 ml-1"
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/inscription"
                      className="ml-1 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-[#f6bc7c]/20 transition-all duration-300 hover:scale-105"
                    >
                      S'inscrire
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-80 opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="border-t border-white/10 pt-4 flex flex-col gap-1">
            {navError && (
              <p className="text-red-400 text-sm px-2 pb-2">{navError}</p>
            )}
            {loading ? (
              renderLoadingState()
            ) : (
              <>
                {user && userProfile ? (
                  <>
                    <p className="text-white/50 text-sm px-3 py-2">{userProfile.full_name || userProfile.email}</p>
                    {userProfile.is_admin && (
                      <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="text-[#f6bc7c] text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                        Administration
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      disabled={isLoggingOut}
                      className="text-white/60 text-sm text-left px-3 py-2 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-2"
                    >
                      {isLoggingOut && <FaSpinner className="animate-spin" />}
                      {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/pourquoi-salsa"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white/70 hover:text-[#f6bc7c] text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Pourquoi la salsa ?
                    </Link>
                    <Link
                      href="/notre-communaute"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white/70 hover:text-[#f6bc7c] text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Notre Communauté
                    </Link>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-white/70 hover:text-white text-sm px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      Se connecter
                    </Link>
                    <Link
                      href="/inscription"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:shadow-lg transition-all duration-300"
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
