import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      const { error } = await signIn(formData.email, formData.password);
      if (error) throw error;
      
      // Rediriger vers la page demandée ou la page d'accueil
      const redirectTo = router.query.redirect || '/';
      router.push(redirectTo);
    } catch (error) {
      setError('Échec de la connexion. Vérifiez vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  // Si l'utilisateur est déjà connecté, rediriger vers la page d'accueil
  if (user) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#2b2b2b]">
      <Head>
        <title>Connexion - Salsa Rennes</title>
        <meta name="description" content="Connectez-vous à votre compte Salsa Rennes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar isLoggedIn={!!user} />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-[#f6bc7c] mb-8">
            Connexion
          </h1>

          {error && (
            <div className="mb-4 p-4 text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg">
              {error}
            </div>
          )}

          {router.query.message && (
            <div className="mb-4 p-4 text-[#f6bc7c] bg-[#f6bc7c]/10 border border-[#f6bc7c]/20 rounded-lg">
              {router.query.message}
            </div>
          )}

          <form 
            onSubmit={handleSubmit}
            className="bg-[#2b2b2b] rounded-lg shadow-xl p-8 border border-[#f6bc7c]/20"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#f6bc7c] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#f6bc7c]/30 rounded-md focus:ring-2 focus:ring-[#f6bc7c] focus:border-[#f6bc7c] text-white disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#f6bc7c] mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-2 bg-[#2b2b2b] border border-[#f6bc7c]/30 rounded-md focus:ring-2 focus:ring-[#f6bc7c] focus:border-[#f6bc7c] text-white disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#f6bc7c] text-[#2b2b2b] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#f6bc7c]/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>

              <div className="text-center text-sm">
                <Link href="/inscription" className="text-[#f6bc7c] hover:text-[#f6bc7c]/80 transition-colors">
                  Pas encore de compte ? S'inscrire
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
