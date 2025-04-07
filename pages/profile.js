import Head from 'next/head';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#2b2b2b]">
        <Head>
          <title>Mon Profil - Salsa Rennes</title>
          <meta name="description" content="Gérez votre profil Salsa Rennes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Navbar />

        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-24">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center text-[#f6bc7c] mb-8">
              Mon Profil
            </h1>

            <div className="bg-[#2b2b2b] rounded-lg shadow-xl p-8 border border-[#f6bc7c]/20">
              <div className="space-y-4">
                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">Email</h2>
                  <p className="text-white">{user?.email}</p>
                </div>

                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">ID Utilisateur</h2>
                  <p className="text-white">{user?.id}</p>
                </div>

                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">Dernière connexion</h2>
                  <p className="text-white">
                    {new Date(user?.last_sign_in_at).toLocaleString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
