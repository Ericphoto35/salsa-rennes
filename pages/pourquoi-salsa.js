import Seo from '../components/Seo';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useEffect } from 'react';
import Head from 'next/head';

export default function PourquoiSalsa() {
  // Initialiser les graphiques après le chargement de la page
  useEffect(() => {
    // Vérifier si les scripts sont déjà chargés
    const chartJsExists = document.getElementById('chartjs-script');
    const salsaChartsExists = document.getElementById('salsa-charts-script');
    
    // Charger Chart.js et le script personnalisé de manière dynamique
    const loadScripts = async () => {
      try {
        // Charger Chart.js s'il n'est pas déjà chargé
        if (!chartJsExists) {
          const chartScript = document.createElement('script');
          chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
          chartScript.async = true;
          chartScript.id = 'chartjs-script';
          
          // Attendre que Chart.js soit chargé
          await new Promise((resolve, reject) => {
            chartScript.onload = resolve;
            chartScript.onerror = () => reject(new Error('Impossible de charger Chart.js'));
            document.body.appendChild(chartScript);
          });
        }
        
        // Charger le script personnalisé s'il n'est pas déjà chargé
        if (!salsaChartsExists) {
          const customScript = document.createElement('script');
          customScript.src = '/js/salsa-charts.js';
          customScript.async = true;
          customScript.id = 'salsa-charts-script';
          
          // Attendre que le script personnalisé soit chargé
          await new Promise((resolve, reject) => {
            customScript.onload = resolve;
            customScript.onerror = () => reject(new Error('Impossible de charger le script des graphiques personnalisés'));
            document.body.appendChild(customScript);
          });
        }
        
        // Initialiser les graphiques
        if (window.initSalsaCharts) {
          window.initSalsaCharts();
        } else {
          console.warn('La fonction initSalsaCharts n\'est pas disponible');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des scripts:', error);
      }
    };

    loadScripts();

    // Pas besoin de nettoyer les scripts car ils peuvent être réutilisés
    // entre les rendus et les navigations
    return () => {};
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#333333]">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        <script type="application/ld+json">
          {`
            {
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
            }
          `}
        </script>
      </Head>
      
      <Seo
        title="Pourquoi fait-on de la salsa en France ? Les bienfaits et motivations - Salsa Rennes"
        description="Découvrez pourquoi la salsa est si populaire en France : bienfaits physiques et mentaux, lien social, immersion culturelle et plaisir. Témoignages et statistiques sur la pratique de la salsa en France."
        url="https://www.salsarennes.fr/pourquoi-salsa"
        image="/images/logo.png"
        keywords="pourquoi faire de la salsa, salsa en France, bienfaits salsa, cours salsa Rennes, danse latine France, raisons danser salsa, communauté salsa"
      />

      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12" style={{ fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center text-[#118AB2] hover:text-[#118AB2]/80 mb-6 group">
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l'accueil</span>
          </Link>
          
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-[#EF476F] mb-4">
              La Salsa en France : Plus qu'une Danse !
            </h1>
          
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">Découvrez les raisons profondes qui poussent des milliers de Français à embrasser le rythme enfiévré de la salsa, transformant leurs vies sur et hors de la piste de danse. Une analyse des motivations et des bénéfices qui expliquent l'engouement pour cette danse en France.</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            <section className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-around text-center">
                <div className="mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-2">Popularité Croissante</h2>
                    <p className="text-gray-600 mb-4">La salsa séduit de plus en plus, avec une augmentation notable des pratiquants.</p>
                    <div className="text-7xl font-black text-[#FFD166]" aria-hidden="true">↑ 45%</div>
                    <div className="text-gray-500">d'inscriptions en clubs de salsa ces 5 dernières années</div>
                </div>
                <div className="w-full md:w-1/3 h-64 md:h-auto">
                    <div className="chart-container" style={{ height: '250px' }}>
                        <canvas id="salsaGrowthChart" aria-label="Graphique montrant la croissance des inscriptions en salsa" role="img"></canvas>
                    </div>
                </div>
            </section>
            
            <section className="lg:col-span-2 bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-1">Le Magnétisme Social</h2>
                <p className="text-gray-600 mb-4">La salsa est avant tout un formidable vecteur de lien social, permettant de rencontrer de nouvelles personnes et de s'intégrer dans une communauté dynamique.</p>
                <div className="chart-container" style={{ position: 'relative', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', height: '320px', maxHeight: '400px' }}>
                    <canvas id="socialBenefitsChart" aria-label="Graphique des bénéfices sociaux de la salsa" role="img"></canvas>
                </div>
            </section>
            
            <section className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-1">Bien-être Physique & Mental</h2>
                <p className="text-gray-600 mb-4">Au-delà du plaisir, la salsa est une activité complète qui contribue à la forme physique et à la réduction du stress.</p>
                <div className="chart-container" style={{ position: 'relative', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', height: '320px', maxHeight: '400px' }}>
                    <canvas id="healthBenefitsChart" aria-label="Graphique des bénéfices pour la santé de la salsa" role="img"></canvas>
                </div>
            </section>

            <section className="lg:col-span-3 bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-1 text-center">Immersion Culturelle et Passion</h2>
                <p className="text-gray-600 mb-6 text-center max-w-4xl mx-auto">L'attrait pour la salsa est souvent lié à la richesse de sa musique, à l'exploration d'une nouvelle culture et à la pure joie de l'expression corporelle.</p>
                <div className="chart-container md:max-w-4xl" style={{ position: 'relative', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', height: '320px', maxHeight: '400px' }}>
                    <canvas id="culturalAppealChart" aria-label="Graphique sur l'attrait culturel de la salsa" role="img"></canvas>
                </div>
            </section>

            <section className="bg-white rounded-lg shadow-xl p-6 md:p-8 text-center flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-2">Un Antidote au Stress</h2>
                <p className="text-gray-600 mb-4">La danse permet de se vider la tête et de libérer des endorphines.</p>
                <div className="text-6xl font-black my-4 text-[#06D6A0]">90%</div>
                <div className="text-gray-500 font-bold">des danseurs se sentent moins stressés après une session</div>
                <span className="text-6xl mt-4 text-[#06D6A0]" role="img" aria-label="Emoji visage détendu">😌</span>
            </section>

            <section className="md:col-span-2 bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Le Parcours du Salsero Débutant</h2>
                <p className="text-gray-600 mb-6 text-center">Découvrir la salsa est un processus simple et gratifiant.</p>
                <div className="flex flex-col md:flex-row items-center justify-around space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flow-step" style={{ borderColor: '#FFD166', backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px', border: '2px solid' }}>
                        <span className="text-4xl" role="img" aria-label="Emoji notes de musique">🎶</span>
                        <h3 className="font-bold mt-2">Découverte</h3>
                        <p className="text-sm">Soirées, amis, réseaux sociaux</p>
                    </div>
                    <div className="flow-arrow-icon transform md:-rotate-0" style={{ fontSize: '2.5rem', color: '#118AB2', lineHeight: '1', margin: '0 1rem' }}>➔</div>
                    <div className="flow-step" style={{ borderColor: '#06D6A0', backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px', border: '2px solid' }}>
                        <span className="text-4xl" role="img" aria-label="Emoji chapeau de diplôme">🎓</span>
                        <h3 className="font-bold mt-2">Apprentissage</h3>
                        <p className="text-sm">Cours, stages, tutoriels</p>
                    </div>
                    <div className="flow-arrow-icon transform md:-rotate-0" style={{ fontSize: '2.5rem', color: '#118AB2', lineHeight: '1', margin: '0 1rem' }}>➔</div>
                    <div className="flow-step" style={{ borderColor: '#118AB2', backgroundColor: '#ffffff', borderRadius: '0.75rem', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px', border: '2px solid' }}>
                        <span className="text-4xl" role="img" aria-label="Emoji danseuse">💃</span>
                        <h3 className="font-bold mt-2">Pratique</h3>
                        <p className="text-sm">Soirées, festivals, voyages</p>
                    </div>
                </div>
            </section>
            
            <section className="md:col-span-2 lg:col-span-3 bg-white rounded-lg shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-1 text-center">Profil des Danseurs de Salsa en France</h2>
                <p className="text-gray-600 mb-6 text-center max-w-4xl mx-auto">Qui sont ces passionnés qui rejoignent les rangs des danseurs de salsa ?</p>
                <div className="chart-container md:max-w-4xl" style={{ position: 'relative', width: '100%', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', height: '320px', maxHeight: '400px' }}>
                    <canvas id="demographicsChart" aria-label="Graphique du profil démographique des danseurs de salsa" role="img"></canvas>
                </div>
            </section>

            <section className="lg:col-span-3 bg-white rounded-lg shadow-xl p-6 md:p-8 mt-8">
              <h2 className="text-2xl font-bold mb-4 text-center text-[#EF476F]">Pourquoi commencer la salsa en France aujourd'hui ?</h2>
              <p className="text-gray-600 mb-6 text-center max-w-3xl mx-auto">
                La salsa en France est devenue bien plus qu'une simple tendance : c'est un véritable phénomène culturel qui séduit par ses multiples facettes. Les Français sont de plus en plus nombreux à pratiquer cette danse pour ses bienfaits physiques, son aspect social, et l'immersion culturelle qu'elle procure.
              </p>
              <p className="text-gray-600 mb-6 text-center max-w-3xl mx-auto">
                Que vous soyez attiré par l'aspect physique, social, culturel ou simplement par curiosité, la salsa a quelque chose à vous offrir. À Salsa Rennes, nous accueillons des danseurs de tous horizons et de tous niveaux dans une ambiance bienveillante et stimulante.
              </p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/inscription" 
                  className="inline-block bg-gradient-to-r from-[#EF476F] to-[#FFD166] text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-[#FFD166] hover:to-[#EF476F] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 text-center"
                >
                  Commencer la salsa
                </Link>
                <Link 
                  href="/cours" 
                  className="inline-block border-2 border-[#118AB2] text-[#118AB2] px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#118AB2]/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 text-center"
                >
                  Voir nos cours
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <footer className="bg-[#333333] py-6">
        <div className="container mx-auto px-4 text-center text-white/60">
          <div className="mb-8 max-w-3xl mx-auto">
            <h2 className="text-xl text-[#FFD166] font-bold mb-4">Pourquoi la salsa est-elle si populaire en France ?</h2>
            <p className="text-gray-300 mb-4">La salsa en France est bien plus qu'une simple danse. Elle représente un véritable phénomène culturel et social qui séduit des milliers de Français chaque année. Les écoles de danse comme <span className="text-[#06D6A0]">Salsa Rennes</span> contribuent à cette popularité croissante en proposant des cours adaptés à tous les niveaux, des débutants aux danseurs confirmés.</p>
            <p className="text-gray-300">La pratique de la salsa en France répond à de nombreux besoins : activité physique complète, évasion culturelle, développement personnel et création de liens sociaux. C'est cette combinaison unique de bénéfices qui explique pourquoi tant de Français choisissent de faire de la salsa.</p>
          </div>
          <p className="text-center mt-12 text-gray-500 text-sm">Infographie basée sur des données illustratives et des observations générales sur la pratique de la salsa en France.</p>
          <p>&copy; {new Date().getFullYear()} Salsa Rennes - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  );
}
