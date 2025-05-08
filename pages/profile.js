import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { useSession } from 'next-auth/react';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#2b2b2b]">
        <Seo
          title="Mon Profil - Salsa Rennes"
          description="Gérez votre profil Salsa Rennes. Modifiez vos informations et suivez votre progression."
          url="https://www.salsarennes.fr/profile"
          noIndex={true}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <Navbar />

        <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-24">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-bold text-center text-[#f6bc7c] mb-8">
              Mon Profil
            </h1>

            <div className="bg-[#2b2b2b] rounded-lg shadow-xl p-8 border border-[#f6bc7c]/20">
              <div className="space-y-4">
                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">Nom</h2>
                  <p className="text-white">{session?.user?.name || 'Non spécifié'}</p>
                </div>

                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">Email</h2>
                  <p className="text-white">{session?.user?.email}</p>
                </div>

                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">ID Utilisateur</h2>
                  <p className="text-white">{session?.user?.id}</p>
                </div>

                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">Rôle</h2>
                  <p className="text-white">{session?.user?.role === 'ADMIN' ? 'Administrateur' : session?.user?.role === 'INSTRUCTOR' ? 'Instructeur' : 'Élève'}</p>
                </div>

                <div>
                  <h2 className="text-[#f6bc7c] font-medium mb-2">Membre depuis</h2>
                  <p className="text-white">
                    {session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleString('fr-FR') : 'Information non disponible'}
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
