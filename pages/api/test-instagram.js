// API endpoint pour tester directement l'API Instagram
export default async function handler(req, res) {
  try {
    // Récupérer le token d'accès depuis les variables d'environnement
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      return res.status(500).json({ 
        error: 'Token Instagram non configuré',
        tokenExists: false
      });
    }
    
    // Construire l'URL de l'API Instagram
    const instagramApiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink,timestamp,media_type,thumbnail_url&access_token=${accessToken}`;
    
    // Appel à l'API Instagram Graph
    const response = await fetch(instagramApiUrl);
    const responseStatus = response.status;
    
    // Récupérer les données brutes de la réponse
    const responseText = await response.text();
    
    // Essayer de parser la réponse en JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = null;
    }
    
    // Renvoyer les informations de diagnostic
    return res.status(200).json({
      tokenExists: true,
      tokenPreview: accessToken.substring(0, 8) + '...' + accessToken.substring(accessToken.length - 4),
      apiUrl: instagramApiUrl.replace(accessToken, '[TOKEN_MASQUÉ]'),
      responseStatus,
      responseIsJson: !!responseData,
      responseData: responseData || responseText.substring(0, 500) // Limiter la taille pour éviter une réponse trop grande
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Erreur lors du test de l\'API Instagram',
      message: error.message
    });
  }
}
