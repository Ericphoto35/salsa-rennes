import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { FaSpinner, FaExclamationTriangle } from 'react-icons/fa';

export default function ProtectedRoute({ children }) {
  const { user, userProfile, loading, fetchUserProfile } = useAuth();
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshAttempts, setRefreshAttempts] = useState(0);
  const [refreshError, setRefreshError] = useState('');

  const handleRefresh = async () => {
    if (!user || refreshAttempts >= 3) return;
    
    try {
      setIsRefreshing(true);
      setRefreshError('');
      await fetchUserProfile(user.id);
      setRefreshAttempts(prev => prev + 1);
    } catch (error) {
      console.error('Error refreshing profile in protected route:', error);
      setRefreshError('Impossible de charger votre profil. Veuillez vous reconnecter.');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=' + router.asPath);
    }

    // Si l'utilisateur est connecté mais qu'il n'y a pas de profil, essayer de rafraîchir
    if (!loading && user && !userProfile && refreshAttempts === 0) {
      handleRefresh();
    }
  }, [user, userProfile, loading, router, refreshAttempts]);

  // Afficher un écran de chargement pendant la vérification
  if (loading || isRefreshing) {
    return (
      <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-[#f6bc7c] text-2xl mb-4" />
          <div className="text-[#f6bc7c] text-xl">Chargement...</div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher pendant la redirection
  if (!user) {
    return null;
  }

  // Si l'utilisateur est connecté mais qu'il n'y a pas de profil après plusieurs tentatives
  if (user && !userProfile && refreshAttempts >= 3) {
    return (
      <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center">
        <div className="bg-[#3b3b3b] p-6 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center text-yellow-500 mb-4">
            <FaExclamationTriangle className="text-2xl mr-3" />
            <h2 className="text-xl font-bold">Problème de chargement</h2>
          </div>
          <p className="text-white mb-4">
            {refreshError || "Impossible de charger votre profil. Veuillez vous reconnecter ou réparer votre session."}
          </p>
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <button
                onClick={() => router.push('/')}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Retour à l'accueil
              </button>
              <button
                onClick={() => router.push('/login?refresh=true')}
                className="bg-[#f6bc7c] text-[#2b2b2b] px-4 py-2 rounded hover:bg-[#f6bc7c]/80"
              >
                Se reconnecter
              </button>
            </div>
            <button
              onClick={() => router.push('/session-recovery')}
              className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 flex items-center justify-center"
            >
              <FaExclamationTriangle className="mr-2" />
              Réparer ma session
            </button>
            <p className="text-gray-400 text-sm text-center mt-2">
              Utilisez cette option si vous rencontrez des problèmes persistants de connexion
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Si l'utilisateur est connecté et que le profil est chargé, afficher le contenu protégé
  if (user && userProfile) {
    return <>{children}</>;
  }

  // Cas par défaut: afficher un écran de chargement
  return (
    <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center">
      <div className="text-[#f6bc7c] text-xl">Chargement...</div>
    </div>
  );
}
