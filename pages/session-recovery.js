import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export default function SessionRecovery() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const cleanupSession = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Nettoyer complètement le stockage local
        if (typeof window !== 'undefined') {
          console.log('Clearing localStorage...');
          window.localStorage.removeItem('salsa-rennes-auth-storage');
          window.localStorage.removeItem('supabase.auth.token');
          
          // Supprimer tous les éléments du localStorage liés à Supabase
          Object.keys(window.localStorage)
            .filter(key => key.includes('supabase') || key.includes('sb-'))
            .forEach(key => {
              console.log(`Removing localStorage key: ${key}`);
              window.localStorage.removeItem(key);
            });
        }

        // 2. Déconnecter l'utilisateur actuel
        console.log('Signing out current user...');
        await supabase.auth.signOut();

        // 3. Attendre un court instant pour s'assurer que tout est bien nettoyé
        await new Promise(resolve => setTimeout(resolve, 500));

        setSuccess(true);
        setLoading(false);

        // 4. Rediriger vers la page de connexion après un court délai
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } catch (err) {
        console.error('Error during session recovery:', err);
        setError('Une erreur est survenue lors de la récupération de session. Veuillez réessayer.');
        setLoading(false);
      }
    };

    cleanupSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center px-4">
      <div className="bg-[#3b3b3b] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-[#f6bc7c] text-2xl font-bold mb-6 text-center">
          Récupération de Session
        </h1>

        {loading && (
          <div className="flex flex-col items-center justify-center py-6">
            <FaSpinner className="animate-spin text-[#f6bc7c] text-4xl mb-4" />
            <p className="text-white text-center">
              Nettoyage de votre session en cours...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 p-4 rounded-md mb-4">
            <div className="flex items-center text-red-500 mb-2">
              <FaExclamationTriangle className="mr-2" />
              <h2 className="font-semibold">Erreur</h2>
            </div>
            <p className="text-white">{error}</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-[#f6bc7c] text-[#2b2b2b] px-4 py-2 rounded hover:bg-[#f6bc7c]/80"
              >
                Réessayer
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 p-4 rounded-md mb-4">
            <div className="flex items-center text-green-500 mb-2">
              <FaCheckCircle className="mr-2" />
              <h2 className="font-semibold">Succès</h2>
            </div>
            <p className="text-white">
              Votre session a été nettoyée avec succès. Vous allez être redirigé vers la page de connexion...
            </p>
          </div>
        )}

        <div className="mt-6 text-white text-sm text-center">
          <p>
            Cette page permet de résoudre les problèmes de connexion persistants en nettoyant complètement votre session.
          </p>
        </div>
      </div>
    </div>
  );
}
