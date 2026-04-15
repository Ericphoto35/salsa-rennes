/**
 * Utilitaires pour la gestion de l'authentification Firebase
 */

/**
 * Nettoie les données de stockage local liées à l'authentification
 */
export const cleanAuthStorage = () => {
  if (typeof window === 'undefined') return;

  const keysToRemove = [
    'salsa-rennes-user-profile',
    'salsa-rennes-profile-timestamp',
    'salsa-rennes-auth-storage',
  ];

  keysToRemove.forEach((key) => window.localStorage.removeItem(key));

  // Supprimer toutes les clés Firebase résiduelles
  Object.keys(window.localStorage)
    .filter((key) => key.includes('firebase') || key.startsWith('fb-'))
    .forEach((key) => window.localStorage.removeItem(key));
};
