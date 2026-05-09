import Link from 'next/link';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import { FaArrowRight } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Seo
        title="Page introuvable - Salsa Rennes"
        description="Cette page n'existe pas ou a été déplacée."
        url="https://www.salsarennes.fr/404"
        noIndex={true}
      />

      <Navbar />

      <main className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#f6bc7c]/4 blur-[120px]" />
        </div>

        <div className="relative">
          <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-4">Erreur</p>
          <h1 className="text-[10rem] font-black leading-none text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            404
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 relative">
            Page introuvable
          </h2>
          <p className="text-white/50 text-base md:text-lg mb-10 max-w-md mx-auto relative">
            Cette page n&apos;existe pas ou a été déplacée. Retourne à l&apos;accueil pour continuer.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-8 py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-[#f6bc7c]/25 transition-all duration-300 hover:scale-105 group relative"
          >
            Retour à l&apos;accueil
            <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </main>
    </div>
  );
}
