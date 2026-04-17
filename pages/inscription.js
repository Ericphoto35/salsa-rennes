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
    setFormData(prev => ({ ...prev, [name]: value }));
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
      router.push("/login?message=Votre compte a été créé et est en attente d'approbation par un administrateur");
    } catch (error) {
      setError("Erreur lors de l'inscription : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    router.push('/');
    return null;
  }

  const inputClass = "mt-1.5 block w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 px-4 py-3 text-sm focus:border-[#f6bc7c]/60 focus:outline-none focus:ring-1 focus:ring-[#f6bc7c]/40 focus:bg-white/7 transition-all duration-200";
  const labelClass = "block text-sm font-medium text-white/60";

  return (
    <div className="min-h-screen bg-[#121212]">
      <Seo
        title="Inscription - Salsa Rennes"
        description="Inscrivez-vous aux cours de salsa à Rennes. Rejoignez la communauté Salsa Rennes et découvrez nos cours, stages et soirées."
        url="https://www.salsarennes.fr/inscription"
      />

      <Navbar isLoggedIn={!!user} />

      {/* Fond décoratif */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#f6bc7c]/4 blur-[120px]" />
      </div>

      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 pt-24">
        <div className="w-full max-w-md">
          {/* En-tête */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Rejoignez-nous
            </h1>
            <p className="text-white/45 text-sm">
              Créez votre compte et commencez à danser
            </p>
          </div>

          {/* Carte formulaire */}
          <div className="bg-[#1e1e1e] border border-white/8 rounded-2xl p-7 shadow-2xl shadow-black/40">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3.5 mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className={labelClass}>Nom complet</label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Marie Dupont"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Téléphone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="06 12 34 56 78"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="marie@exemple.fr"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClass}>Confirmer le mot de passe</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-8 py-3.5 rounded-full text-base font-semibold hover:shadow-lg hover:shadow-[#f6bc7c]/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Inscription en cours…' : "S'inscrire"}
              </button>

              <p className="text-center text-sm text-white/40">
                Déjà un compte ?{' '}
                <Link href="/login" className="text-[#f6bc7c] hover:text-white transition-colors">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
