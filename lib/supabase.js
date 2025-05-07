import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Configuration explicite pour améliorer la persistance des sessions
const supabaseOptions = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    // Utiliser les cookies au lieu du localStorage avec une meilleure gestion
    storageKey: 'sb-auth-token',
    storage: {
      getItem: (key) => {
        if (typeof document === 'undefined') return null;
        const value = document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${key}=`))
          ?.split('=')[1];
        return value ? decodeURIComponent(value) : null;
      },
      setItem: (key, value) => {
        if (typeof document === 'undefined') return;
        // Configurer le cookie pour qu'il expire après 7 jours
        // et qu'il soit accessible sur tout le site
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; secure`;
      },
      removeItem: (key) => {
        if (typeof document === 'undefined') return;
        // Supprimer le cookie en définissant une date d'expiration dans le passé
        // et en s'assurant de couvrir tous les chemins possibles
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; secure`;
        // Supprimer également les cookies potentiellement créés par Supabase
        document.cookie = `sb-${supabaseUrl}-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax; secure`;
        // Nettoyer le localStorage également pour éviter les conflits
        if (typeof window !== 'undefined') {
          localStorage.removeItem('supabase.auth.token');
          localStorage.removeItem('salsa-rennes-auth-storage');
          localStorage.removeItem(key);
        }
      },
    },
  },
  global: {
    fetch: fetch,
    headers: { 'x-application-name': 'salsa-rennes' },
  },
};

// Création du client avec les options optimisées
export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);

// Fonction utilitaire pour vérifier l'état de la session
export const checkSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session: data.session, error: null };
  } catch (error) {
    console.error('Error checking session:', error);
    return { session: null, error };
  }
};

// Clés pour le stockage local
const PROFILE_CACHE_KEY = 'salsa-rennes-user-profile';
const PROFILE_CACHE_TIMESTAMP = 'salsa-rennes-profile-timestamp';
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 jours en millisecondes (augmenté pour plus de résilience)

// Fonction pour sauvegarder le profil dans le stockage local
const saveProfileToCache = (profile) => {
  if (typeof window === 'undefined' || !profile) return;
  
  try {
    localStorage.setItem(PROFILE_CACHE_KEY, JSON.stringify(profile));
    localStorage.setItem(PROFILE_CACHE_TIMESTAMP, Date.now().toString());
    console.log('Profile saved to cache:', profile);
  } catch (error) {
    console.error('Error saving profile to cache:', error);
  }
};

// Fonction pour récupérer le profil depuis le stockage local
const getProfileFromCache = (userId) => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cachedProfile = localStorage.getItem(PROFILE_CACHE_KEY);
    const timestamp = localStorage.getItem(PROFILE_CACHE_TIMESTAMP);
    
    if (!cachedProfile || !timestamp) return null;
    
    // Vérifier si le cache est expiré
    const now = Date.now();
    const cacheTime = parseInt(timestamp, 10);
    if (now - cacheTime > CACHE_TTL) {
      console.log('Cache expired, clearing...');
      localStorage.removeItem(PROFILE_CACHE_KEY);
      localStorage.removeItem(PROFILE_CACHE_TIMESTAMP);
      return null;
    }
    
    const profile = JSON.parse(cachedProfile);
    
    // Vérifier que le profil correspond à l'utilisateur actuel
    if (profile.id !== userId) {
      console.log('Cached profile is for a different user, clearing...');
      localStorage.removeItem(PROFILE_CACHE_KEY);
      localStorage.removeItem(PROFILE_CACHE_TIMESTAMP);
      return null;
    }
    
    console.log('Profile retrieved from cache:', profile);
    return profile;
  } catch (error) {
    console.error('Error retrieving profile from cache:', error);
    return null;
  }
};

// Créer un profil d'urgence pour éviter la déconnexion en cas d'erreur réseau
const createEmergencyProfile = (userId) => {
  return {
    id: userId,
    email: 'unknown@emergency.profile',
    full_name: 'Utilisateur temporaire',
    is_admin: false,
    is_approved: true, // Important: considérer l'utilisateur comme approuvé pour éviter la déconnexion
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    emergency_profile: true // Marqueur pour identifier un profil d'urgence
  };
};

// Fonction utilitaire pour récupérer le profil utilisateur avec réessais et cache
export const fetchUserProfileWithRetry = async (userId, maxRetries = 3) => {
  if (!userId) return null;
  
  // Essayer d'abord de récupérer depuis le cache
  const cachedProfile = getProfileFromCache(userId);
  if (cachedProfile) {
    console.log('Using cached profile:', cachedProfile);
    return cachedProfile;
  }
  
  let lastError = null;
  let useEmergencyProfile = false;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Fetching user profile attempt ${attempt + 1}/${maxRetries} for user: ${userId}`);
      
      // Augmenter le timeout pour les connexions lentes
      const timeoutDuration = 10000; // 10 secondes
      
      const fetchPromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(`Timeout (${timeoutDuration}ms) fetching user profile`)), timeoutDuration);
      });
      
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);
      
      if (error) throw error;
      
      if (!data) {
        throw new Error('No profile data found');
      }
      
      console.log('User profile fetched successfully:', data);
      
      // Sauvegarder dans le cache avec une durée de vie plus longue
      saveProfileToCache(data);
      
      return data;
    } catch (error) {
      console.error(`Error in fetchUserProfile attempt ${attempt + 1}:`, error);
      lastError = error;
      
      // Si c'est la dernière tentative, marquer pour utiliser le profil d'urgence
      if (attempt === maxRetries - 1) {
        useEmergencyProfile = true;
      }
      
      // Attendre un peu avant de réessayer (avec backoff exponentiel)
      if (attempt < maxRetries - 1) {
        const backoffTime = Math.min(1000 * Math.pow(2, attempt), 8000);
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }
  
  console.error(`Failed to fetch user profile after ${maxRetries} attempts`);
  
  // En cas d'échec après toutes les tentatives, créer un profil d'urgence
  // pour éviter de déconnecter l'utilisateur en cas de problème réseau temporaire
  if (useEmergencyProfile) {
    console.warn('Creating emergency profile to prevent disconnection');
    const emergencyProfile = createEmergencyProfile(userId);
    saveProfileToCache(emergencyProfile); // Sauvegarder dans le cache
    return emergencyProfile;
  }
  
  throw lastError || new Error('Failed to fetch user profile');
};
