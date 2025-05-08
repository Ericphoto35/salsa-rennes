import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaSpinner } from 'react-icons/fa';

export default function ProtectedRoute({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login?redirect=' + encodeURIComponent(router.asPath));
    }
  }, [session, loading, router]);

  // Afficher un écran de chargement pendant la vérification
  if (loading) {
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
  if (!session) {
    return null;
  }

  // Si l'utilisateur est authentifié, afficher le contenu protégé
  return <>{children}</>;
}
