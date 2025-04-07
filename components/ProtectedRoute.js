import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=' + router.asPath);
    }
  }, [user, loading, router]);

  // Afficher un écran de chargement pendant la vérification
  if (loading) {
    return (
      <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center">
        <div className="text-[#f6bc7c] text-xl">Chargement...</div>
      </div>
    );
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher pendant la redirection
  if (!user) {
    return null;
  }

  // Si l'utilisateur est connecté, afficher le contenu protégé
  return <>{children}</>;
}
