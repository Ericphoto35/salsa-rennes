// API route pour récupérer le feed Facebook
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { FACEBOOK_ACCESS_TOKEN } = process.env;

    if (!FACEBOOK_ACCESS_TOKEN) {
      console.log('Token Facebook manquant, utilisation de données fictives');
      return res.status(200).json({
        data: getMockFacebookPosts(),
        isUsingMockData: true,
        error: 'Token Facebook non configuré'
      });
    }

    // Récupération du feed Facebook via l'API Graph
    const response = await fetch(
      `https://graph.facebook.com/v18.0/me/posts?fields=id,message,created_time,full_picture,permalink_url,attachments{media,url}&access_token=${FACEBOOK_ACCESS_TOKEN}&limit=12`
    );

    if (!response.ok) {
      throw new Error(`Erreur API Facebook: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    // Formatage des données pour correspondre à la structure attendue
    const formattedPosts = data.data.map(post => ({
      id: post.id,
      caption: post.message || '',
      media_url: post.full_picture || (post.attachments?.data[0]?.media?.image?.src) || '/images/placeholder.jpg',
      permalink: post.permalink_url,
      timestamp: post.created_time,
      platform: 'facebook'
    }));

    res.status(200).json({
      data: formattedPosts,
      isUsingMockData: false,
      error: null
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du feed Facebook:', error);
    
    // En cas d'erreur, retourner des données fictives
    res.status(200).json({
      data: getMockFacebookPosts(),
      isUsingMockData: true,
      error: error.message
    });
  }
}

// Fonction pour générer des données fictives Facebook
function getMockFacebookPosts() {
  return [
    {
      id: 'fb_mock_1',
      caption: '🕺💃 Soirée salsa exceptionnelle hier soir ! Merci à tous les participants pour cette ambiance de feu ! 🔥 #SalsaRennes #QueRicoMambo',
      media_url: '/images/salsa-demo.jpg',
      permalink: 'https://facebook.com/mock-post-1',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      platform: 'facebook'
    },
    {
      id: 'fb_mock_2',
      caption: '📸 Retour en images sur notre dernier cours de bachata ! Vos progrès sont impressionnants ! 👏 #BachataRennes #DanseLatine',
      media_url: '/images/bachata-demo.jpg',
      permalink: 'https://facebook.com/mock-post-2',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      platform: 'facebook'
    },
    {
      id: 'fb_mock_3',
      caption: '🎉 Grande soirée salsa ce samedi ! Venez nombreux pour danser et partager votre passion ! 💃🕺',
      media_url: '/images/soiree-salsa.jpg',
      permalink: 'https://facebook.com/mock-post-3',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      platform: 'facebook'
    }
  ];
}
