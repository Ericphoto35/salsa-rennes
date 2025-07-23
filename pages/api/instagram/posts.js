// API endpoint pour récupérer les publications Instagram
export default async function handler(req, res) {
  try {
    // Afficher toutes les variables d'environnement disponibles (sans les valeurs pour la sécurité)
    console.log('Débogage Instagram API - Variables d\'environnement disponibles:', Object.keys(process.env));
    
    // Récupérer le token d'accès depuis les variables d'environnement
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    console.log('Débogage Instagram API - Token existe:', !!accessToken);
    if (accessToken) {
      // Masquer la majorité du token pour la sécurité, mais montrer le début pour vérifier
      const tokenPreview = accessToken.substring(0, 8) + '...' + accessToken.substring(accessToken.length - 4);
      console.log('Débogage Instagram API - Aperçu du token:', tokenPreview);
    } else {
      console.log('Débogage Instagram API - Erreur: Token manquant');
      console.log('Débogage Instagram API - Vérifiez que INSTAGRAM_ACCESS_TOKEN est bien dans .env.local');
      return res.status(500).json({ 
        error: 'Token Instagram non configuré. Veuillez ajouter INSTAGRAM_ACCESS_TOKEN dans votre fichier .env.local' 
      });
    }

    // Appel à l'API Instagram Graph
    const response = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type,thumbnail_url&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur API Instagram:', errorData);
      return res.status(response.status).json({ 
        error: 'Erreur lors de la récupération des publications Instagram',
        details: errorData
      });
    }

    const data = await response.json();
    
    // Filtrer et formater les données si nécessaire
    const formattedPosts = data.data.map(post => ({
      id: post.id,
      caption: post.caption || '',
      media_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
      permalink: post.permalink,
      timestamp: post.timestamp,
      media_type: post.media_type
    }));

    // Mettre en cache pendant 1 heure (3600 secondes)
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    
    return res.status(200).json({ posts: formattedPosts });
  } catch (error) {
    console.error('Erreur serveur Instagram:', error);
    return res.status(500).json({ 
      error: 'Erreur serveur lors de la récupération des publications Instagram',
      message: error.message
    });
  }
}
