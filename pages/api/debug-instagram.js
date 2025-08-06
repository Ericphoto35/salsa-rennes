// API de debug pour tester Instagram en production
export default async function handler(req, res) {
  try {
    // Vérifier si la variable d'environnement existe
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    
    const debugInfo = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      tokenExists: !!accessToken,
      tokenLength: accessToken ? accessToken.length : 0,
      tokenPreview: accessToken ? accessToken.substring(0, 8) + '...' + accessToken.substring(accessToken.length - 4) : 'N/A',
      allEnvKeys: Object.keys(process.env).filter(key => key.includes('INSTAGRAM')),
      vercelUrl: process.env.VERCEL_URL || 'N/A'
    };

    // Si pas de token, retourner les infos de debug
    if (!accessToken) {
      return res.status(200).json({
        error: 'Token manquant',
        debug: debugInfo
      });
    }

    // Tester l'appel à l'API Instagram
    const response = await fetch(
      `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(200).json({
        error: 'Erreur API Instagram',
        apiError: errorData,
        debug: debugInfo
      });
    }

    const userData = await response.json();
    
    res.status(200).json({
      success: true,
      user: userData,
      debug: debugInfo
    });

  } catch (error) {
    res.status(500).json({
      error: 'Erreur serveur',
      message: error.message,
      debug: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      }
    });
  }
}
