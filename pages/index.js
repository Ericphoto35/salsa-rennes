import Seo from '../components/Seo';
import Image from 'next/image';
import Link from 'next/link';
import { FaGraduationCap, FaUserTie, FaClock, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaFacebook, FaInstagram, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import GoogleReviews from '../components/GoogleReviews';
import Head from 'next/head';

export default function Home() {
  const isLoggedIn = false;
  return (
    <div className="min-h-screen bg-[#121212]">
      <Head>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "DanceSchool",
              "name": "Salsa Rennes - Qué Rico Mambo",
              "description": "École de danse salsa à Rennes proposant des cours pour tous niveaux, des débutants aux danseurs confirmés",
              "url": "https://www.salsarennes.fr",
              "logo": "https://www.salsarennes.fr/images/logo.png",
              "image": "https://www.salsarennes.fr/images/clem-eric.webp",
              "telephone": "+33000000000",
              "email": "contact@salsarennes.fr",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rennes",
                "addressRegion": "Bretagne",
                "postalCode": "35000",
                "addressCountry": "FR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "48.1173",
                "longitude": "-1.6778"
              },
              "openingHours": "Mo,Tu,We,Th 18:00-22:00",
              "priceRange": "180€/an",
              "sameAs": [
                "https://www.facebook.com/quericomambo.fr",
                "https://www.instagram.com/quericomambo_salsa"
              ],
              "offers": {
                "@type": "Offer",
                "name": "Cours de salsa à Rennes",
                "description": "Cours de salsa cubaine et portoricaine pour tous niveaux à Rennes"
              }
            }
          `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Je ne sais pas danser, est-ce que je peux venir au cours débutant ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bien sûr, ce cours de salsa à Rennes s'adresse aux personnes qui n'ont jamais dansé la salsa."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Est-ce que je dois venir accompagné ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Non, tu peux venir seul ou accompagné."
                  }
                }
              ]
            }
          `}
        </script>
      </Head>
      <Seo
        title="Salsa Rennes - École de danse cubaine et portoricaine à Rennes"
        description="Apprenez la salsa à Rennes avec nos cours en ligne et en présentiel. École de danse cubaine et portoricaine proposant cours, événements, stages et soirées pour tous niveaux à Rennes. Rejoignez la communauté salsa de Rennes."
        url="https://www.salsarennes.fr"
        image="/images/logo.png"
        keywords="salsa rennes, cours salsa rennes, école de danse rennes, salsa cubaine rennes, salsa portoricaine, apprendre salsa bretagne, soirées salsa rennes, professeurs salsa, danse latine rennes, cours débutant salsa, stage salsa bretagne, salsa on1 on2, bachata rennes, danser à rennes, meilleure école salsa, cours particuliers salsa, qué rico mambo, festival salsa rennes, initiation salsa, cours salsa débutant rennes, apprendre à danser rennes"
      />

      <Navbar isLoggedIn={isLoggedIn} />

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <main>
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-0 pb-10 md:pt-0 md:pb-16 overflow-hidden">
          {/* Fond décoratif */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#f6bc7c]/5 blur-[120px]" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#e8a254]/4 blur-[100px]" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Logo + réseaux */}
            <div className="mb-3 md:mb-8 w-[160px] sm:w-[200px] md:w-[340px] relative mx-auto">
              <Image
                src="/images/logo.png"
                alt="Qué Rico Mambo Salsa"
                width={340}
                height={170}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>

            <div className="flex justify-center gap-4 mb-4 md:mb-8">
              <a
                href="https://www.facebook.com/quericomambo.fr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 bg-white/5 text-[#f6bc7c] hover:bg-[#f6bc7c]/20 hover:border-[#f6bc7c]/40 transition-all duration-300 hover:scale-110"
              >
                <FaFacebook className="text-base md:text-lg" />
              </a>
              <a
                href="https://www.instagram.com/quericomambo_salsa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/10 bg-white/5 text-[#f6bc7c] hover:bg-[#f6bc7c]/20 hover:border-[#f6bc7c]/40 transition-all duration-300 hover:scale-110"
              >
                <FaInstagram className="text-base md:text-lg" />
              </a>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-5 leading-tight">
              <span className="text-white">Apprenez la </span>
              <span className="text-[#f6bc7c]">Salsa</span>
              <br className="hidden sm:block" />
              <span className="text-white"> à Rennes</span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl mb-6 md:mb-10 max-w-2xl mx-auto text-white/60 leading-relaxed">
              Découvrez notre méthode unique d&apos;apprentissage, du niveau débutant à avancé,
              avec des cours adaptés à tous les profils et tous les âges.
            </p>

            <div className="flex flex-col items-center gap-4">
              <Link
                href="/inscription"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-[#f6bc7c]/25 transition-all duration-300 hover:-translate-y-1 hover:scale-105 group"
              >
                Commencer maintenant
                <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {[
                  { href: '/niveaux/debutant', label: 'Débutant' },
                  { href: '/niveaux/intermediaire', label: 'Intermédiaire' },
                  { href: '/niveaux/avance', label: 'Avancé' },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[#f6bc7c] text-sm font-medium px-5 py-2 rounded-full border border-[#f6bc7c]/30 bg-[#f6bc7c]/5 hover:bg-[#f6bc7c]/15 hover:border-[#f6bc7c]/60 transition-all duration-300 hover:scale-105"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── POURQUOI NOUS CHOISIR ─────────────────────────────── */}
        <section className="py-20 px-4 bg-[#161616]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">Nos atouts</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Pourquoi nous choisir ?</h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaGraduationCap className="text-[#f6bc7c] text-3xl" />,
                  title: 'Cours Adaptés',
                  desc: 'Des leçons personnalisées pour tous les niveaux, du débutant absolu au danseur confirmé.',
                },
                {
                  icon: <FaUserTie className="text-[#f6bc7c] text-3xl" />,
                  title: 'Professeurs Experts',
                  desc: `Une équipe passionnée avec plus de 10 ans d'expérience dans l'enseignement.`,
                },
                {
                  icon: <FaClock className="text-[#f6bc7c] text-3xl" />,
                  title: 'Flexibilité',
                  desc: 'Apprenez à votre rythme avec des créneaux variés en semaine et le week-end.',
                },
              ].map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="group bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 text-left hover:border-[#f6bc7c]/25 hover:bg-[#222] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
                >
                  <div className="mb-4 w-12 h-12 rounded-xl bg-[#f6bc7c]/10 flex items-center justify-center group-hover:bg-[#f6bc7c]/20 transition-colors">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NOTRE ÉCOLE ───────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">À propos</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre École de Salsa à Rennes</h2>
              <p className="text-white/55 max-w-2xl mx-auto leading-relaxed">
                Depuis plus de 10 ans, notre école Qué Rico Mambo est devenue une référence pour apprendre la salsa à Rennes.
                Nous proposons des cours de salsa cubaine et portoricaine pour tous les niveaux.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video">
                <Image
                  src="/images/clem-eric.webp"
                  alt="Professeurs de salsa à Rennes"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium text-center">
                  L'équipe de professeurs de Salsa Rennes
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-white/65 leading-relaxed">
                  Notre équipe de professeurs passionnés vous accompagne dans votre apprentissage avec une pédagogie adaptée
                  et une ambiance conviviale qui fait notre réputation.
                </p>
                <a
                  href="https://www.quericomambo.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1e1e1e] border border-[#f6bc7c]/30 text-[#f6bc7c] px-7 py-3.5 rounded-full font-semibold hover:bg-[#f6bc7c]/10 hover:border-[#f6bc7c]/60 transition-all duration-300 group"
                >
                  Découvrir Qué Rico Mambo
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── COMMUNAUTÉ ────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-[#161616]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">La scène salsa</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                La Salsa à Rennes : Une Communauté Dynamique
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <FaMapMarkerAlt className="text-[#f6bc7c] text-xl" />,
                  title: 'Cours de Salsa à Rennes',
                  desc: 'Nos cours se déroulent dans plusieurs salles à travers la ville, accessibles en transport en commun et équipées pour une expérience optimale.',
                },
                {
                  icon: <FaCalendarAlt className="text-[#f6bc7c] text-xl" />,
                  title: 'Événements Salsa à Rennes',
                  desc: `Tout au long de l'année : soirées salsa, stages avec des danseurs internationaux et événements festifs. Rejoignez la scène rennaise !`,
                },
                {
                  icon: <FaUsers className="text-[#f6bc7c] text-xl" />,
                  title: 'La Communauté Salsa',
                  desc: 'Étudiants, professionnels, retraités… tous unis par la passion. Intégrez facilement notre communauté et développez votre réseau.',
                },
                {
                  icon: <FaGraduationCap className="text-[#f6bc7c] text-xl" />,
                  title: 'Apprendre la Salsa',
                  desc: 'Cours structurés, progressifs et adaptés à chaque niveau. Débutant ou expérimenté, vous trouverez le cours qui vous correspond.',
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 bg-[#1e1e1e] border border-white/7 rounded-2xl p-6 hover:border-[#f6bc7c]/20 transition-all duration-300">
                  <div className="flex-shrink-0 mt-1 w-9 h-9 rounded-lg bg-[#f6bc7c]/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1.5">{title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ───────────────────────────────────────────────── */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Questions fréquentes sur nos cours
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: 'Je ne sais pas danser, est-ce que je peux venir au cours débutant ?',
                  a: `Bien sûr, ce cours de salsa à Rennes s'adresse aux personnes qui n'ont jamais dansé la salsa. Aucune expérience préalable n'est nécessaire.`,
                },
                {
                  q: 'Est-ce que je dois venir accompagné ?',
                  a: `Non, tu peux venir seul ou accompagné. La rotation des partenaires est pratiquée dans nos cours, ce qui permet à chacun de s'améliorer et de rencontrer d'autres danseurs.`,
                },
              ].map(({ q, a }) => (
                <div key={q} className="bg-[#1e1e1e] border border-white/7 rounded-2xl p-6 border-l-2 border-l-[#f6bc7c]/60 hover:border-l-[#f6bc7c] transition-all duration-300">
                  <h3 className="text-white font-semibold mb-2">{q}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AVIS ──────────────────────────────────────────────── */}
        <section className="py-20 px-4 bg-[#161616]">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">Témoignages</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ce que nos élèves pensent
            </h2>
            <p className="text-white/55 mb-10 max-w-2xl mx-auto">
              Découvrez les avis de nos élèves de salsa à Rennes.
            </p>
            <GoogleReviews />
          </div>
        </section>
      </main>
    </div>
  );
}
