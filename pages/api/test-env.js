// API endpoint pour tester les variables d'environnement
export default function handler(req, res) {
  // Récupérer toutes les clés des variables d'environnement (sans les valeurs pour la sécurité)
  const envKeys = Object.keys(process.env);
  
  // Vérifier si INSTAGRAM_ACCESS_TOKEN existe
  const hasInstagramToken = !!process.env.INSTAGRAM_ACCESS_TOKEN;
  
  // Renvoyer les informations
  return res.status(200).json({
    envKeysCount: envKeys.length,
    envKeys: envKeys,
    hasInstagramToken: hasInstagramToken,
    nodeEnv: process.env.NODE_ENV
  });
}
