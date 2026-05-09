import { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
import BreadcrumbSchema from '../components/BreadcrumbSchema';
import { FaInstagram } from 'react-icons/fa';

export default function NotreCommunaute({ initialPosts, isUsingMockData, apiError }) {
  const [posts, setPosts] = useState(initialPosts || []);
  const [loading, setLoading] = useState(!initialPosts);
  const [error, setError] = useState('');
  const [usingMockData, setUsingMockData] = useState(isUsingMockData);
  const [apiErrorState, setApiErrorState] = useState(apiError || null);

  // Fonction pour formater la date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      <Head>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Notre Communauté Salsa à Rennes - Qué Rico Mambo",
              "description": "Découvrez la communauté dynamique de notre école de salsa à Rennes à travers nos publications Instagram. Rejoignez-nous pour des cours, événements et soirées salsa à Rennes.",
              "url": "https://www.salsarennes.fr/notre-communaute",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Salsa Rennes - Qué Rico Mambo",
                "url": "https://www.salsarennes.fr"
              }
            }
          `}
        </script>
      </Head>
      <BreadcrumbSchema items={[
        { name: 'Accueil', url: 'https://www.salsarennes.fr' },
        { name: 'Notre Communauté', url: 'https://www.salsarennes.fr/notre-communaute' },
      ]} />
      <Seo
        title="Notre Communauté Salsa à Rennes - Photos et Événements"
        description="Découvrez la communauté dynamique de notre école de salsa à Rennes à travers nos publications Instagram. Rejoignez-nous pour des cours, événements et soirées salsa à Rennes."
        url="https://www.salsarennes.fr/notre-communaute"
        image="/images/logo.png"
        keywords="salsa rennes, communauté salsa, événements salsa rennes, photos salsa rennes, instagram salsa rennes, cours salsa rennes, soirées salsa, danse latine rennes, qué rico mambo instagram"
      />

      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16">
        <div className="text-center mb-12">
          <p className="text-[#f6bc7c] text-sm font-semibold uppercase tracking-widest mb-3">Instagram</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre Communauté Salsa à Rennes</h1>
          <p className="text-white/55 text-base max-w-2xl mx-auto mb-5 leading-relaxed">
            Découvrez les moments forts de notre école de salsa à Rennes à travers nos publications Instagram.
            Rejoignez notre communauté passionnée de danseurs !
          </p>
          <a
            href="https://www.instagram.com/quericomambo_salsa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#f6bc7c] border border-[#f6bc7c]/30 bg-[#f6bc7c]/5 hover:bg-[#f6bc7c]/15 hover:border-[#f6bc7c]/60 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
          >
            <FaInstagram className="text-base" />
            Suivez-nous sur Instagram
          </a>

          {usingMockData && (
            <div className="mt-5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 py-2.5 px-5 rounded-xl inline-block">
              <p className="text-sm font-medium">
                Mode démo : affichage de données fictives.
              </p>
              {apiErrorState && (
                <p className="text-sm mt-1 text-red-400">
                  Erreur : {typeof apiErrorState === 'string' ? apiErrorState : JSON.stringify(apiErrorState)}
                </p>
              )}
              {!apiErrorState && (
                <p className="text-sm mt-1 text-yellow-400/70">
                  Pour voir vos vraies publications Instagram, configurez votre token d&apos;accès.
                </p>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f6bc7c]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-center max-w-md mx-auto">
            <p>{error}</p>
            <p className="mt-2">
              En attendant, vous pouvez consulter notre profil Instagram directement{' '}
              <a
                href="https://www.instagram.com/quericomambo_salsa"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                ici
              </a>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <div key={post.id} className="group bg-[#1e1e1e] border border-white/7 rounded-2xl overflow-hidden hover:border-[#f6bc7c]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40">
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative w-full aspect-square overflow-hidden">
                    <Image
                      src={post.media_url}
                      alt={post.caption || "Publication Instagram de Salsa Rennes"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized={!post.media_url.includes('placehold.co')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
                <div className="p-4">
                  {post.caption && (
                    <p className="text-white/70 text-sm line-clamp-3 mb-3 leading-relaxed">
                      {post.caption}
                    </p>
                  )}
                  <div className="flex justify-between items-center text-xs text-white/35">
                    <span>{formatDate(post.timestamp)}</span>
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#f6bc7c] hover:text-white transition-colors font-medium"
                    >
                      Voir sur Instagram
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center text-white/70 py-12">
            <p>Aucune publication Instagram n'a été trouvée.</p>
            <p className="mt-2">
              Consultez notre profil Instagram{' '}
              <a
                href="https://www.instagram.com/quericomambo_salsa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f6bc7c] hover:text-white transition-colors"
              >
                ici
              </a>.
            </p>
          </div>
        )}
      </main>

      <div className="bg-[#161616] border-t border-white/5 py-16 text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Rejoignez notre communauté salsa à Rennes</h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            Suivez-nous sur Instagram pour découvrir nos événements, cours et soirées salsa à Rennes.
            Partagez vos moments de danse avec le hashtag <span className="text-[#f6bc7c]">#SalsaRennes</span> !
          </p>
          <a
            href="/inscription"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#121212] px-8 py-3.5 rounded-full font-bold hover:shadow-lg hover:shadow-[#f6bc7c]/25 transition-all duration-300 hover:scale-105"
          >
            Rejoindre nos cours
          </a>
        </div>
      </div>
    </div>
  );
}

// Cette fonction s'exécute côté serveur à chaque requête
export async function getServerSideProps() {
  try {
    // Récupération des publications Instagram depuis notre API interne
    // Cette API gère l'authentification et le cache
    // En développement, utiliser directement localhost
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
      apiUrl = 'http://localhost:3000/api/instagram/posts';
    } else {
      const protocol = 'https';
      const host = process.env.VERCEL_URL || 'www.salsarennes.fr';
      apiUrl = `${protocol}://${host}/api/instagram/posts`;
    }

    console.log('Débogage Notre Communauté - URL API:', apiUrl);
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur lors de la récupération des publications Instagram:', errorText);
      throw new Error('Erreur lors de la récupération des publications Instagram');
    }

    const data = await response.json();
    console.log('Débogage Notre Communauté - Réponse API:', JSON.stringify(data).substring(0, 200) + '...');

    // Si l'API renvoie une erreur, utiliser des données fictives
    if (data.error) {
      console.warn('Utilisation de données fictives car l\'API a renvoyé une erreur:', data.error);
      return {
        props: {
          initialPosts: getMockPosts(),
          isUsingMockData: true,
          apiError: data.error // Ajouter l'erreur pour l'afficher sur la page
        }
      };
    }

    // Vérifier si nous avons des publications
    console.log('Débogage Notre Communauté - Nombre de publications:', data.posts ? data.posts.length : 0);

    return {
      props: {
        initialPosts: data.posts || [],
        isUsingMockData: false
      }
    };
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    // En cas d'erreur, utiliser des données fictives
    return {
      props: {
        initialPosts: getMockPosts(),
        isUsingMockData: true
      }
    };
  }
}

// Fonction pour générer des données fictives
function getMockPosts() {
  return [
    {
      id: 'post1',
      media_url: 'https://placehold.co/600x600/f6bc7c/2b2b2b?text=Cours+de+Salsa',
      caption: 'Cours de salsa débutant à Rennes ce soir ! Venez nombreux pour apprendre les bases de la salsa cubaine. #SalsaRennes #DanseLatine',
      permalink: 'https://www.instagram.com/p/example1/',
      timestamp: '2025-07-15T18:30:00Z'
    },
    {
      id: 'post2',
      media_url: 'https://placehold.co/600x600/f6bc7c/2b2b2b?text=Soirée+Salsa',
      caption: 'Superbe soirée salsa hier soir à Rennes ! Merci à tous les participants pour cette ambiance incroyable. #SoiréeSalsa #Rennes',
      permalink: 'https://www.instagram.com/p/example2/',
      timestamp: '2025-07-10T22:00:00Z'
    },
    {
      id: 'post3',
      media_url: 'https://placehold.co/600x600/f6bc7c/2b2b2b?text=Stage+Salsa',
      caption: 'Stage intensif de salsa portoricaine ce weekend à Rennes. Inscrivez-vous dès maintenant ! #StageSalsa #SalsaRennes',
      permalink: 'https://www.instagram.com/p/example3/',
      timestamp: '2025-07-05T10:15:00Z'
    },
    {
      id: 'post4',
      media_url: 'https://placehold.co/600x600/f6bc7c/2b2b2b?text=Festival+Salsa',
      caption: 'Le festival de salsa de Rennes approche ! Réservez vos places pour cet événement incontournable. #FestivalSalsa #Rennes',
      permalink: 'https://www.instagram.com/p/example4/',
      timestamp: '2025-06-28T14:20:00Z'
    },
    {
      id: 'post5',
      media_url: 'https://placehold.co/600x600/f6bc7c/2b2b2b?text=Démonstration',
      caption: 'Démonstration de salsa cubaine par nos professeurs au centre-ville de Rennes. #DemoSalsa #SalsaRennes',
      permalink: 'https://www.instagram.com/p/example5/',
      timestamp: '2025-06-20T16:45:00Z'
    },
    {
      id: 'post6',
      media_url: 'https://placehold.co/600x600/f6bc7c/2b2b2b?text=Cours+Particuliers',
      caption: 'Nouveaux créneaux disponibles pour des cours particuliers de salsa à Rennes. Progressez à votre rythme ! #CoursParticuliers #SalsaRennes',
      permalink: 'https://www.instagram.com/p/example6/',
      timestamp: '2025-06-15T09:30:00Z'
    }
  ];
}
