/**
 * Utilitaires pour la gestion de l'authentification
 */

/**
 * Nettoie complètement tous les cookies et données de stockage liés à l'authentification
 * Cette fonction peut être appelée indépendamment du contexte d'authentification
 */
export const cleanAuthStorage = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  console.log('Nettoyage complet des données d\'authentification...');
  
  // Nettoyer le localStorage
  const keysToRemove = [
    'salsa-rennes-user-profile',
    'salsa-rennes-profile-timestamp',
    'salsa-rennes-auth-storage',
    'supabase.auth.token'
  ];
  
  // Supprimer les clés spécifiques
  keysToRemove.forEach(key => {
    window.localStorage.removeItem(key);
  });
  
  // Supprimer toutes les clés liées à Supabase
  Object.keys(window.localStorage)
    .filter(key => key.includes('supabase') || key.includes('sb-'))
    .forEach(key => {
      console.log(`Suppression de la clé localStorage: ${key}`);
      window.localStorage.removeItem(key);
    });
  
  // Supprimer les cookies d'authentification avec toutes les combinaisons possibles
  const cookiesToDelete = [
    'sb-auth-token', 
    'sb-refresh-token', 
    'sb-access-token',
    'sb-provider-token',
    'sb-id-token'
  ];
  
  // Essayer différents domaines et chemins pour s'assurer que tous les cookies sont supprimés
  const domains = ['', window.location.hostname, `.${window.location.hostname}`];
  const paths = ['/', '/api', '/auth', ''];
  
  cookiesToDelete.forEach(cookieName => {
    // Supprimer avec toutes les combinaisons possibles
    domains.forEach(domain => {
      paths.forEach(path => {
        const domainPart = domain ? `domain=${domain};` : '';
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${domainPart} path=${path}; SameSite=Lax; secure`;
      });
    });
    console.log(`Cookie supprimé: ${cookieName} avec toutes les combinaisons possibles`);
  });
  
  // Supprimer également les cookies dynamiques basés sur l'URL Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const supabaseDomain = new URL(supabaseUrl).hostname;
      document.cookie = `sb-${supabaseDomain}-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; secure`;
    }
  } catch (error) {
    console.error('Erreur lors de la suppression des cookies dynamiques:', error);
  }
  
  console.log('Nettoyage des données d\'authentification terminé');
};

/**
 * Vérifie si l'utilisateur est actuellement connecté en vérifiant les cookies
 * @returns {boolean} True si un cookie d'authentification est présent
 */
export const hasAuthCookie = () => {
  if (typeof document === 'undefined') {
    return false;
  }
  
  // Vérifier la présence d'un cookie d'authentification
  const cookies = document.cookie.split('; ');
  return cookies.some(cookie => 
    cookie.startsWith('sb-auth-token=') || 
    cookie.startsWith('sb-refresh-token=') ||
    cookie.includes('-auth-token=')
  );
};

/**
 * Vérifie la validité de la session et nettoie les données si nécessaire
 * @param {Object} supabase - Client Supabase
 * @returns {Promise<boolean>} True si la session est valide
 */
export const validateAndCleanSession = async (supabase) => {
  try {
    const { data } = await supabase.auth.getSession();
    if (!data?.session) {
      // Session invalide, nettoyer les données
      cleanAuthStorage();
      return false;
    }
    return true;
  } catch (error) {
    console.error('Erreur lors de la validation de la session:', error);
    // En cas d'erreur, nettoyer par précaution
    cleanAuthStorage();
    return false;
  }
};
