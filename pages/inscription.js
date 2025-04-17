import { useState } from 'react';
import Seo from '../components/Seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';

export default function Inscription() {
  const router = useRouter();
  const { signUp, user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      setError('');
      setLoading(true);
      const { error } = await signUp(formData);
      if (error) throw error;
      router.push('/login?message=Votre compte a été créé et est en attente d\'approbation par un administrateur');
    } catch (error) {
      setError('Erreur lors de l\'inscription : ' + error.message);
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
      <Seo
        title="Inscription - Salsa Rennes"
        description="Inscrivez-vous aux cours de salsa à Rennes. Rejoignez la communauté Salsa Rennes et découvrez nos cours, stages et soirées."
        url="https://salsa-rennes.vercel.app/inscription"
      />

      <Navbar isLoggedIn={!!user} />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-[#f6bc7c] mb-8">
            Rejoignez-nous
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-md p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#f6bc7c]">
                Nom complet
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-[#f6bc7c]/20 bg-[#2b2b2b] text-white shadow-sm px-3 py-2 focus:border-[#f6bc7c] focus:outline-none focus:ring-1 focus:ring-[#f6bc7c]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#f6bc7c]">
                Téléphone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-[#f6bc7c]/20 bg-[#2b2b2b] text-white shadow-sm px-3 py-2 focus:border-[#f6bc7c] focus:outline-none focus:ring-1 focus:ring-[#f6bc7c]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#f6bc7c]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-[#f6bc7c]/20 bg-[#2b2b2b] text-white shadow-sm px-3 py-2 focus:border-[#f6bc7c] focus:outline-none focus:ring-1 focus:ring-[#f6bc7c]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#f6bc7c]">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-[#f6bc7c]/20 bg-[#2b2b2b] text-white shadow-sm px-3 py-2 focus:border-[#f6bc7c] focus:outline-none focus:ring-1 focus:ring-[#f6bc7c]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#f6bc7c]">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-[#f6bc7c]/20 bg-[#2b2b2b] text-white shadow-sm px-3 py-2 focus:border-[#f6bc7c] focus:outline-none focus:ring-1 focus:ring-[#f6bc7c]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f6bc7c] text-[#2b2b2b] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#f6bc7c]/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Inscription...' : 'S\'inscrire'}
            </button>

            <div className="text-center text-sm">
              <Link href="/login" className="text-[#f6bc7c] hover:text-[#f6bc7c]/80 transition-colors">
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
