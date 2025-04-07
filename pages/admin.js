import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const { user, userProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log('No user logged in');
      return;
    }

    if (!userProfile) {
      console.log('User profile not loaded yet');
      return;
    }

    console.log('User profile:', userProfile);

    if (!userProfile.is_admin) {
      console.log('User is not admin');
      router.push('/');
      return;
    }

    fetchUsers();
  }, [user, userProfile, router]);

  const fetchUsers = async () => {
    try {
      console.log('Fetching users...');
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
      console.log('Users fetched:', data);
      setUsers(data);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      alert('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const updateUserStatus = async (userId, isApproved) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId]: true }));
      console.log('Updating user status:', userId, isApproved);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ is_approved: isApproved })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user status:', error);
        throw error;
      }

      console.log('User status updated successfully');
      await fetchUsers();
    } catch (error) {
      console.error('Error in updateUserStatus:', error);
      alert('Erreur lors de la mise à jour du statut');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const updateAdminStatus = async (userId, isAdmin) => {
    try {
      setActionLoading(prev => ({ ...prev, [userId + '_admin']: true }));
      console.log('Updating admin status:', userId, isAdmin);
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ is_admin: isAdmin })
        .eq('id', userId);

      if (error) {
        console.error('Error updating admin status:', error);
        throw error;
      }

      console.log('Admin status updated successfully');
      await fetchUsers();
    } catch (error) {
      console.error('Error in updateAdminStatus:', error);
      alert('Erreur lors de la mise à jour du statut administrateur');
    } finally {
      setActionLoading(prev => ({ ...prev, [userId + '_admin']: false }));
    }
  };

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-[#2b2b2b]">
        <Navbar />
        <main className="container mx-auto px-4 py-12 pt-24">
          <div className="text-center text-[#f6bc7c]">
            Chargement... {!user ? '(Non connecté)' : '(Profil non chargé)'}
          </div>
        </main>
      </div>
    );
  }

  if (!userProfile.is_admin) {
    return (
      <div className="min-h-screen bg-[#2b2b2b]">
        <Navbar />
        <main className="container mx-auto px-4 py-12 pt-24">
          <div className="text-center text-red-500">
            Accès refusé. Vous devez être administrateur pour accéder à cette page.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2b2b2b]">
      <Head>
        <title>Administration - Salsa Rennes</title>
        <meta name="description" content="Page d'administration Salsa Rennes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-12 pt-24">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#f6bc7c]">
          Administration
        </h1>

        {loading ? (
          <div className="text-center text-[#f6bc7c]">Chargement de la liste des utilisateurs...</div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#2b2b2b] rounded-lg shadow-xl overflow-hidden border border-[#f6bc7c]/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#f6bc7c]/20">
                      <th className="px-6 py-4 text-left text-[#f6bc7c]">Nom</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c]">Email</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c]">Téléphone</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c]">Statut</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c]">Admin</th>
                      <th className="px-6 py-4 text-left text-[#f6bc7c]">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-[#f6bc7c]/10">
                        <td className="px-6 py-4 text-white">{user.full_name || '-'}</td>
                        <td className="px-6 py-4 text-white">{user.email}</td>
                        <td className="px-6 py-4 text-white">{user.phone || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            user.is_approved
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}>
                            {user.is_approved ? 'Approuvé' : 'En attente'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            user.is_admin
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-gray-500/20 text-gray-300'
                          }`}>
                            {user.is_admin ? 'Admin' : 'Utilisateur'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateUserStatus(user.id, !user.is_approved)}
                              disabled={actionLoading[user.id]}
                              className={`px-3 py-1 text-sm rounded-md bg-[#f6bc7c] text-[#2b2b2b] hover:bg-[#f6bc7c]/80 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {actionLoading[user.id] ? '...' : (user.is_approved ? 'Désapprouver' : 'Approuver')}
                            </button>
                            <button
                              onClick={() => updateAdminStatus(user.id, !user.is_admin)}
                              disabled={actionLoading[user.id + '_admin']}
                              className={`px-3 py-1 text-sm rounded-md bg-[#f6bc7c]/20 text-[#f6bc7c] hover:bg-[#f6bc7c]/30 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {actionLoading[user.id + '_admin'] ? '...' : (user.is_admin ? 'Retirer admin' : 'Faire admin')}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
