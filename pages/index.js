import Seo from '../components/Seo';
import Link from 'next/link';
import { FaGraduationCap, FaUserTie, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaFacebook, FaInstagram } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import GoogleReviews from '../components/GoogleReviews';

export default function Home() {
  // TODO: Implement actual authentication logic
  const isLoggedIn = false;
  return (
    <div className="min-h-screen bg-[#2b2b2b]">
      <Seo
        title="Salsa Rennes - École de danse cubaine et portoricaine à Rennes"
        description="Apprenez la salsa à Rennes avec nos cours en ligne et en présentiel. École de danse cubaine et portoricaine proposant cours, événements, stages et soirées pour tous niveaux à Rennes. Rejoignez la communauté salsa de Rennes."
        url="https://www.salsarennes.fr"
        image="/images/logo.png"
      />

      <Navbar isLoggedIn={isLoggedIn} />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 md:pt-16">
        <div className="text-center">
          <div className="mb-6 md:mb-8 w-[280px] md:w-[400px] relative mx-auto">
            <img
              src="/images/logo.png"
              alt="Qué Rico Mambo Salsa"
              width="400"
              height="200"
              className="w-full h-auto"
              loading="eager"
            />
            <div className="flex justify-center mt-3 space-x-8">
              <a href="https://www.facebook.com/quericomambo.fr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="text-[#f6bc7c] text-4xl hover:text-[#f6bc7c]/80 transition-colors" />
              </a>
              <a href="https://www.instagram.com/quericomambo_salsa" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-[#f6bc7c] text-4xl hover:text-[#f6bc7c]/80 transition-colors" />
              </a>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-[#f6bc7c] leading-tight">
            Apprenez la Salsa à Rennes
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto text-white/90 px-2">
            Découvrez notre méthode unique d'apprentissage de la salsa à Rennes, du niveau débutant à avancé, avec des cours adaptés à tous les profils et tous les âges
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/inscription" 
              className="inline-block bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#2b2b2b] px-10 py-4 rounded-full text-xl font-bold hover:from-[#e8a254] hover:to-[#f6bc7c] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Commencer maintenant
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-8 sm:mt-10">
              <Link 
                href="/niveaux/debutant" 
                className="text-[#f6bc7c] hover:text-white px-4 py-2 rounded-lg border border-[#f6bc7c] hover:bg-[#f6bc7c]/20 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">Débutant</span>
              </Link>
              <Link 
                href="/niveaux/intermediaire" 
                className="text-[#f6bc7c] hover:text-white px-4 py-2 rounded-lg border border-[#f6bc7c] hover:bg-[#f6bc7c]/20 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">Intermédiaire</span>
              </Link>
              <Link 
                href="/niveaux/avance" 
                className="text-[#f6bc7c] hover:text-white px-4 py-2 rounded-lg border border-[#f6bc7c] hover:bg-[#f6bc7c]/20 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-medium">Avancé</span>
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

        {/* Le composant GoogleReviews a été déplacé dans la section témoignages */}

        <div className="mt-12 md:mt-16 w-full text-center">
          <h2 className="text-2xl font-semibold mb-6 text-[#f6bc7c]">Notre École de Salsa à Rennes</h2>
          <p className="text-white/90 mb-6 max-w-3xl mx-auto px-4">Depuis plus de 10 ans, notre école de danse Qué Rico Mambo est devenue une référence pour apprendre la salsa à Rennes. Située en plein cœur de la ville, nous proposons des cours de salsa cubaine et portoricaine pour tous les niveaux, des débutants aux danseurs confirmés.</p>
          
          <div className="mb-8 max-w-3xl mx-auto px-4">
            <h3 className="text-xl font-semibold mb-4 text-[#f6bc7c]">Nos Professeurs</h3>
            <div className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-xl mb-6">
              <div className="bg-[#333] aspect-[16/9] flex items-center justify-center">
              <img
                src="/images/clem-eric.webp"
                alt="Professeurs de salsa à Rennes"
                className="w-full h-auto"
                loading="lazy"
              />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-medium text-center">L'équipe de professeurs de Salsa Rennes</p>
              </div>
            </div>
          </div>
          
          <p className="text-white/90 mb-6 max-w-3xl mx-auto px-4">Notre équipe de professeurs passionnés vous accompagne dans votre apprentissage de la salsa à Rennes, avec une pédagogie adaptée et une ambiance conviviale qui fait notre réputation.</p>
          <a 
            href="https://www.quericomambo.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-[#f6bc7c] text-[#2b2b2b] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#f6bc7c]/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 mb-12 relative overflow-hidden group"
          >
            <span className="relative z-10">Découvrir Qué Rico Mambo</span>
            <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
          </a>
        </div>
        
        <div className="w-full bg-[#222] py-10 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-[#f6bc7c] text-center">La Salsa à Rennes : Une Communauté Dynamique</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaMapMarkerAlt className="text-[#f6bc7c] text-2xl flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-[#f6bc7c]">Cours de Salsa à Rennes</h3>
                </div>
                <p className="text-white/90">Nos cours de salsa à Rennes se déroulent dans plusieurs salles à travers la ville, notamment dans le centre-ville et le quartier Villejean. Accessibles en transport en commun, nos salles sont équipées pour vous offrir une expérience d'apprentissage optimale.</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaCalendarAlt className="text-[#f6bc7c] text-2xl flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-[#f6bc7c]">Événements Salsa à Rennes</h3>
                </div>
                <p className="text-white/90">Tout au long de l'année, nous organisons des soirées salsa à Rennes, des stages avec des danseurs internationaux et des événements festifs. Rejoignez la communauté salsa rennaise et partagez votre passion pour la danse latine.</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaUsers className="text-[#f6bc7c] text-2xl flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-[#f6bc7c]">La Communauté Salsa de Rennes</h3>
                </div>
                <p className="text-white/90">Rennes est reconnue pour sa scène salsa dynamique et accueillante. Nos élèves viennent de tous horizons : étudiants, professionnels, retraités... tous unis par la passion de la salsa. Intégrez facilement notre communauté et développez votre réseau social à Rennes.</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <FaGraduationCap className="text-[#f6bc7c] text-2xl flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-[#f6bc7c]">Apprendre la Salsa à Rennes</h3>
                </div>
                <p className="text-white/90">Notre méthode d'enseignement de la salsa à Rennes est reconnue pour son efficacité. Nous proposons des cours structurés, progressifs et adaptés à chaque niveau. Que vous soyez débutant complet ou danseur expérimenté, vous trouverez chez nous le cours qui vous correspond à Rennes.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 md:mt-16 mb-12 md:mb-16 w-full text-center">
          <h2 className="text-2xl font-semibold mb-6 text-[#f6bc7c]">Témoignages de nos élèves de Salsa à Rennes</h2>
          <p className="text-white/90 mb-6 max-w-3xl mx-auto px-4">Découvrez ce que nos élèves pensent de nos cours de salsa à Rennes et pourquoi ils nous recommandent.</p>
          <div className="mt-6 md:mt-8 w-full">
            <GoogleReviews />
          </div>
        </div>
      </main>
    </div>
  );
}
