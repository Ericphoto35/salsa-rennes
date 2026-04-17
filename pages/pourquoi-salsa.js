import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';
import Head from 'next/head';

export default function PourquoiSalsa() {
  useEffect(() => {
    const chartJsExists = document.getElementById('chartjs-script');
    const salsaChartsExists = document.getElementById('salsa-charts-script');

    const loadScripts = async () => {
      try {
        if (!chartJsExists) {
          const chartScript = document.createElement('script');
          chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
          chartScript.async = true;
          chartScript.id = 'chartjs-script';
          await new Promise((resolve, reject) => {
            chartScript.onload = resolve;
            chartScript.onerror = () => reject(new Error('Impossible de charger Chart.js'));
            document.body.appendChild(chartScript);
          });
        }
        if (!salsaChartsExists) {
          const customScript = document.createElement('script');
          customScript.src = '/js/salsa-charts.js';
          customScript.async = true;
          customScript.id = 'salsa-charts-script';
          await new Promise((resolve, reject) => {
            customScript.onload = resolve;
            customScript.onerror = () => reject(new Error('Impossible de charger le script des graphiques'));
            document.body.appendChild(customScript);
          });
        }
        if (window.initSalsaCharts) {
          window.initSalsaCharts();
        }
      } catch (error) {
        console.error('Erreur lors du chargement des scripts:', error);
      }
    };

    loadScripts();
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `{
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [{
                "@type": "Question",
                "name": "Pourquoi fait-on de la salsa en France ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Les Français pratiquent la salsa pour de nombreuses raisons : les bienfaits physiques (cardio, coordination, flexibilité), les avantages sociaux (rencontres, communauté), l'immersion culturelle et le bien-être mental (réduction du stress). La popularité de la salsa en France a augmenté de 45% ces 5 dernières années."
                }
              }, {
                "@type": "Question",
                "name": "Quels sont les bienfaits de la salsa ?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "La salsa offre de nombreux bienfaits : amélioration du cardio et de la coordination, réduction du stress (90% des danseurs se sentent moins stressés après une session), développement de la confiance en soi, création de liens sociaux et immersion dans une culture riche et passionnante."
                }
              }]
            }`
          }}
        />
      </Head>

      <Seo
        title="Pourquoi fait-on de la salsa en France ? Les bienfaits et motivations - Salsa Rennes"
        description="Découvrez pourquoi la salsa est si populaire en France : bienfaits physiques et mentaux, lien social, immersion culturelle et plaisir. Témoignages et statistiques sur la pratique de la salsa en France."
        url="https://www.salsarennes.fr/pourquoi-salsa"
        image="/images/logo.png"
        keywords="pourquoi faire de la salsa, salsa en France, bienfaits salsa, cours salsa Rennes, danse latine France, raisons danser salsa, communauté salsa"
      />

      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-white/45 hover:text-[#f6bc7c] mb-8 group transition-colors text-sm">
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Retour à l&apos;accueil
          </Link>

          {/* En-tête */}
          <header className="text-center mb-14">
            <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">Pourquoi la salsa ?</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              La Salsa en France :<br className="hidden sm:block" />
              <span className="text-[#f6bc7c]"> Plus qu&apos;une Danse !</span>
            </h1>
            <p className="text-white/55 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Découvrez les raisons profondes qui poussent des milliers de Français à embrasser le rythme enfiévré de la salsa,
              transformant leurs vies sur et hors de la piste de danse.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Stat phare + graphique croissance */}
            <section className="md:col-span-2 lg:col-span-3 bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold text-white mb-2">Popularité Croissante</h2>
                <p className="text-white/50 text-sm mb-5 max-w-xs">La salsa séduit de plus en plus, avec une augmentation notable des pratiquants.</p>
                <div className="text-7xl font-black text-[#f6bc7c]" aria-hidden="true">↑ 45%</div>
                <div className="text-white/40 text-sm mt-1">d&apos;inscriptions en clubs de salsa ces 5 dernières années</div>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/5">
                <div className="chart-container" style={{ height: '250px' }}>
                  <canvas id="salsaGrowthChart" aria-label="Graphique montrant la croissance des inscriptions en salsa" role="img"></canvas>
                </div>
              </div>
            </section>

            {/* Magnétisme social */}
            <section className="lg:col-span-2 bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-8 hover:border-[#f6bc7c]/20 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-1">Le Magnétisme Social</h2>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">La salsa est avant tout un formidable vecteur de lien social, permettant de rencontrer de nouvelles personnes et de s&apos;intégrer dans une communauté dynamique.</p>
              <div className="chart-container" style={{ position: 'relative', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', height: '280px' }}>
                <canvas id="socialBenefitsChart" aria-label="Graphique des bénéfices sociaux de la salsa" role="img"></canvas>
              </div>
            </section>

            {/* Bien-être */}
            <section className="bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-8 hover:border-[#f6bc7c]/20 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-1">Bien-être Physique &amp; Mental</h2>
              <p className="text-white/50 text-sm mb-5 leading-relaxed">Au-delà du plaisir, la salsa est une activité complète qui contribue à la forme physique et à la réduction du stress.</p>
              <div className="chart-container" style={{ position: 'relative', width: '100%', height: '280px' }}>
                <canvas id="healthBenefitsChart" aria-label="Graphique des bénéfices pour la santé de la salsa" role="img"></canvas>
              </div>
            </section>

            {/* Immersion culturelle */}
            <section className="lg:col-span-3 bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-8 hover:border-[#f6bc7c]/20 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-1 text-center">Immersion Culturelle et Passion</h2>
              <p className="text-white/50 text-sm mb-6 text-center max-w-3xl mx-auto leading-relaxed">
                L&apos;attrait pour la salsa est souvent lié à la richesse de sa musique, à l&apos;exploration d&apos;une nouvelle culture et à la pure joie de l&apos;expression corporelle.
              </p>
              <div className="chart-container" style={{ position: 'relative', width: '100%', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', height: '280px' }}>
                <canvas id="culturalAppealChart" aria-label="Graphique sur l'attrait culturel de la salsa" role="img"></canvas>
              </div>
            </section>

            {/* Stat antidote stress */}
            <section className="bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-8 text-center flex flex-col justify-center items-center hover:border-[#f6bc7c]/20 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-2">Un Antidote au Stress</h2>
              <p className="text-white/50 text-sm mb-4 leading-relaxed">La danse permet de se vider la tête et de libérer des endorphines.</p>
              <div className="text-6xl font-black my-3 text-[#f6bc7c]">90%</div>
              <div className="text-white/45 text-sm font-medium">des danseurs se sentent moins stressés après une session</div>
              <span className="text-5xl mt-4" role="img" aria-label="Emoji visage détendu">😌</span>
            </section>

            {/* Parcours débutant */}
            <section className="md:col-span-2 bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-8 hover:border-[#f6bc7c]/20 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-2 text-center">Le Parcours du Salsero Débutant</h2>
              <p className="text-white/50 text-sm mb-7 text-center">Découvrir la salsa est un processus simple et gratifiant.</p>
              <div className="flex flex-col md:flex-row items-center justify-around gap-4">
                {[
                  { emoji: '🎶', label: 'Découverte', sub: 'Soirées, amis, réseaux sociaux', color: '#f6bc7c' },
                  { emoji: '🎓', label: 'Apprentissage', sub: 'Cours, stages, tutoriels', color: '#e8a254' },
                  { emoji: '💃', label: 'Pratique', sub: 'Soirées, festivals, voyages', color: '#f6bc7c' },
                ].map(({ emoji, label, sub, color }, i, arr) => (
                  <div key={label} className="flex items-center gap-4 md:gap-0">
                    <div
                      className="flex flex-col items-center justify-center text-center rounded-xl p-5 min-w-[120px]"
                      style={{ border: `2px solid ${color}22`, background: `${color}08` }}
                    >
                      <span className="text-4xl mb-2">{emoji}</span>
                      <h3 className="font-bold text-white text-sm">{label}</h3>
                      <p className="text-white/45 text-xs mt-1">{sub}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <span className="text-[#f6bc7c]/40 text-2xl mx-1 md:mx-3 rotate-0">→</span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Démographie */}
            <section className="md:col-span-2 lg:col-span-3 bg-[#1e1e1e] border border-white/7 rounded-2xl p-7 md:p-8 hover:border-[#f6bc7c]/20 transition-all duration-300">
              <h2 className="text-xl font-bold text-white mb-1 text-center">Profil des Danseurs de Salsa en France</h2>
              <p className="text-white/50 text-sm mb-6 text-center max-w-3xl mx-auto">Qui sont ces passionnés qui rejoignent les rangs des danseurs de salsa ?</p>
              <div className="chart-container" style={{ position: 'relative', width: '100%', maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', height: '280px' }}>
                <canvas id="demographicsChart" aria-label="Graphique du profil démographique des danseurs de salsa" role="img"></canvas>
              </div>
            </section>

            {/* CTA final */}
            <section className="lg:col-span-3 bg-gradient-to-br from-[#1e1e1e] to-[#1a1a1a] border border-[#f6bc7c]/15 rounded-2xl p-8 md:p-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Pourquoi commencer la salsa en France <span className="text-[#f6bc7c]">aujourd&apos;hui</span> ?
              </h2>
              <p className="text-white/55 mb-4 max-w-3xl mx-auto leading-relaxed">
                La salsa en France est devenue bien plus qu&apos;une simple tendance : c&apos;est un véritable phénomène culturel qui séduit par ses multiples facettes.
                Les Français sont de plus en plus nombreux à pratiquer cette danse pour ses bienfaits physiques, son aspect social, et l&apos;immersion culturelle qu&apos;elle procure.
              </p>
              <p className="text-white/55 mb-8 max-w-3xl mx-auto leading-relaxed">
                À Salsa Rennes, nous accueillons des danseurs de tous horizons et de tous niveaux dans une ambiance bienveillante et stimulante.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/inscription"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-8 py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-[#f6bc7c]/25 transition-all duration-300 hover:scale-105 group"
                >
                  Commencer la salsa
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/niveaux/debutant"
                  className="inline-flex items-center justify-center gap-2 border border-[#f6bc7c]/30 text-[#f6bc7c] px-8 py-3.5 rounded-full font-bold hover:bg-[#f6bc7c]/10 hover:border-[#f6bc7c]/60 transition-all duration-300 hover:scale-105"
                >
                  Voir nos cours
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-[#0e0e0e] border-t border-white/5 py-10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-lg font-bold text-[#f6bc7c] mb-3">Pourquoi la salsa est-elle si populaire en France ?</h2>
          <p className="text-white/35 text-sm mb-3 leading-relaxed">
            La salsa en France est bien plus qu&apos;une simple danse. Elle représente un véritable phénomène culturel et social qui séduit des milliers de Français chaque année.
            Les écoles de danse comme <span className="text-[#f6bc7c]">Salsa Rennes</span> contribuent à cette popularité croissante en proposant des cours adaptés à tous les niveaux.
          </p>
          <p className="text-white/25 text-xs mt-8">
            Infographie basée sur des données illustratives et des observations générales sur la pratique de la salsa en France.
          </p>
          <p className="text-white/25 text-xs mt-1">&copy; {new Date().getFullYear()} Salsa Rennes - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
