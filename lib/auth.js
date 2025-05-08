// Fonctions utilitaires pour l'authentification avec JWT

/**
 * Connecte un utilisateur avec email et mot de passe
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<{user, token, error}>} - Résultat de la connexion
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur de connexion');
    }

    // Stocker le token dans le localStorage
    localStorage.setItem('auth-token', data.token);
    
    return { user: data.user, token: data.token, error: null };
  } catch (error) {
    console.error('Erreur de connexion:', error);
    return { user: null, token: null, error: error.message };
  }
}

/**
 * Inscrit un nouvel utilisateur
 * @param {string} name - Nom de l'utilisateur
 * @param {string} email - Email de l'utilisateur
 * @param {string} password - Mot de passe de l'utilisateur
 * @returns {Promise<{user, token, error}>} - Résultat de l'inscription
 */
export async function registerUser(name, email, password) {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur d\'inscription');
    }

    // Stocker le token dans le localStorage
    localStorage.setItem('auth-token', data.token);
    
    return { user: data.user, token: data.token, error: null };
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return { user: null, token: null, error: error.message };
  }
}

/**
 * Déconnecte l'utilisateur
 * @returns {void}
 */
export function logoutUser() {
  localStorage.removeItem('auth-token');
}

/**
 * Récupère l'utilisateur actuel à partir du token stocké
 * @returns {Promise<{user, error}>} - Informations sur l'utilisateur
 */
export async function getCurrentUser() {
  try {
    const token = localStorage.getItem('auth-token');
    
    if (!token) {
      return { user: null, error: null };
    }
    
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Erreur de récupération de l\'utilisateur');
    }
    
    return { user: data.user, error: null };
  } catch (error) {
    console.error('Erreur de récupération de l\'utilisateur:', error);
    return { user: null, error: error.message };
  }
}

/**
 * Vérifie si l'utilisateur est authentifié
 * @returns {boolean} - True si l'utilisateur est authentifié
 */
export function isAuthenticated() {
  return !!localStorage.getItem('auth-token');
}

/**
 * Récupère le token d'authentification
 * @returns {string|null} - Token d'authentification ou null
 */
export function getAuthToken() {
  return localStorage.getItem('auth-token');
}

/**
 * Ajoute le token d'authentification aux en-têtes de requête
 * @param {Object} headers - En-têtes de requête
 * @returns {Object} - En-têtes avec le token d'authentification
 */
export function addAuthHeader(headers = {}) {
  const token = getAuthToken();
  
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`,
    };
  }
  
  return headers;
}
