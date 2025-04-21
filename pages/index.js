import Seo from '../components/Seo';
import Link from 'next/link';
import Image from 'next/image';
import { FaGraduationCap, FaUserTie, FaClock } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import GoogleReviews from '../components/GoogleReviews';

export default function Home() {
  // TODO: Implement actual authentication logic
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-[#2b2b2b]">
      <Seo
        title="Salsa Rennes - École de danse"
        description="Apprenez la salsa à Rennes avec nos cours en ligne et en présentiel. Cours, événements, stages et soirées pour tous niveaux à Rennes."
        url="https://www.salsarennes.fr"
        image="/images/logo.png"
      />

      <Navbar isLoggedIn={isLoggedIn} />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 md:pt-16">
        <div className="text-center">
          <div className="mb-6 md:mb-8 w-[280px] md:w-[400px] relative mx-auto">
            <Image
              src="/images/logo.png"
              alt="Qué Rico Mambo Salsa"
              width={400}
              height={200}
              className="w-full h-auto"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-[#f6bc7c] leading-tight">
            Apprenez la Salsa à Rennes
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto text-white/90 px-2">
            Découvrez notre méthode unique d'apprentissage, du niveau débutant à avancé
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/inscription" 
              className="inline-block bg-[#f6bc7c] text-[#2b2b2b] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#f6bc7c]/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Commencer maintenant
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-6 sm:mt-8">
              <Link 
                href="/niveaux/debutant" 
                className="text-[#f6bc7c] hover:text-[#f6bc7c]/80 transition-colors"
              >
                Débutant
              </Link>
              <Link 
                href="/niveaux/intermediaire" 
                className="text-[#f6bc7c] hover:text-[#f6bc7c]/80 transition-colors"
              >
                Intermédiaire
              </Link>
              <Link 
                href="/niveaux/avance" 
                className="text-[#f6bc7c] hover:text-[#f6bc7c]/80 transition-colors"
              >
                Avancé
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 text-center px-2">
          <h2 className="text-2xl font-semibold mb-4 text-[#f6bc7c]">Pourquoi nous choisir ?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="p-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaGraduationCap className="text-[#f6bc7c] text-3xl" />
                <h3 className="text-xl font-semibold text-[#f6bc7c]">Cours Adaptés</h3>
              </div>
              <p className="text-white/90">Des leçons personnalisées pour tous les niveaux</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaUserTie className="text-[#f6bc7c] text-3xl" />
                <h3 className="text-xl font-semibold text-[#f6bc7c]">Professeurs Experts</h3>
              </div>
              <p className="text-white/90">Une équipe passionnée et expérimentée</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FaClock className="text-[#f6bc7c] text-3xl" />
                <h3 className="text-xl font-semibold text-[#f6bc7c]">Flexibilité</h3>
              </div>
              <p className="text-white/90">Apprenez à votre rythme, où que vous soyez</p>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 mb-12 md:mb-16 w-full">
          <GoogleReviews />
        </div>

        <div className="mt-12 md:mt-16 mb-12 md:mb-16 w-full text-center">
          <h2 className="text-2xl font-semibold mb-6 text-[#f6bc7c]">Notre Association à Rennes</h2>
          <p className="text-white/90 mb-6">Découvrez notre association de salsa et venez nous rencontrer dans nos différentes salles.</p>
          <a 
            href="https://www.quericomambo.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#f6bc7c] text-[#2b2b2b] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#f6bc7c]/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Qué Rico Mambo
          </a>
        </div>
      </main>
    </div>
  );
}
