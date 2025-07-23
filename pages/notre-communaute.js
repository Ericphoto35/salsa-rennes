import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Seo from '../components/Seo';
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
    <div className="min-h-screen bg-[#2b2b2b]">
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
      <Seo
        title="Notre Communauté Salsa à Rennes - Photos et Événements"
        description="Découvrez la communauté dynamique de notre école de salsa à Rennes à travers nos publications Instagram. Rejoignez-nous pour des cours, événements et soirées salsa à Rennes."
        url="https://www.salsarennes.fr/notre-communaute"
        image="/images/logo.png"
        keywords="salsa rennes, communauté salsa, événements salsa rennes, photos salsa rennes, instagram salsa rennes, cours salsa rennes, soirées salsa, danse latine rennes, qué rico mambo instagram"
      />

      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#f6bc7c] mb-4">Notre Communauté Salsa à Rennes</h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Découvrez les moments forts de notre école de salsa à Rennes à travers nos publications Instagram. 
            Rejoignez notre communauté passionnée de danseurs !
          </p>
          <a 
            href="https://www.instagram.com/quericomambo_salsa" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-[#f6bc7c] hover:text-white mt-4 transition-colors"
          >
            <FaInstagram className="mr-2 text-xl" />
            Suivez-nous sur Instagram
          </a>
          
          {usingMockData && (
            <div className="mt-4 bg-yellow-500/20 text-yellow-500 py-2 px-4 rounded-lg inline-block">
              <p className="text-sm font-medium">
                Mode démo : affichage de données fictives. Pour voir vos vraies publications Instagram, configurez votre token d'accès.
              </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#333333] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <a 
                  href={post.permalink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block"
                >
                  <img 
                    src={post.media_url} 
                    alt={post.caption || "Publication Instagram de Salsa Rennes"} 
                    className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
                    loading="lazy"
                  />
                </a>
                <div className="p-4">
                  {post.caption && (
                    <p className="text-white/90 line-clamp-3 mb-2">
                      {post.caption}
                    </p>
                  )}
                  <div className="flex justify-between items-center mt-2 text-sm text-white/70">
                    <span>{formatDate(post.timestamp)}</span>
                    <a 
                      href={post.permalink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#f6bc7c] hover:text-white transition-colors"
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

      <div className="bg-[#333333] py-8 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#f6bc7c] mb-6">Rejoignez notre communauté salsa à Rennes</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Suivez-nous sur Instagram pour découvrir nos événements, cours et soirées salsa à Rennes. 
            Partagez vos moments de danse avec le hashtag #SalsaRennes !
          </p>
          <a 
            href="/inscription" 
            className="inline-block bg-gradient-to-r from-[#f6bc7c] to-[#e8a254] text-[#2b2b2b] px-8 py-3 rounded-full text-lg font-bold hover:from-[#e8a254] hover:to-[#f6bc7c] transition-all duration-300 shadow-lg"
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
