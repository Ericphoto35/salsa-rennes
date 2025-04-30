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
    storageKey: 'salsa-rennes-auth-storage',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
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
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

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
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`Fetching user profile attempt ${attempt + 1}/${maxRetries} for user: ${userId}`);
      
      // Réduire le timeout pour éviter les blocages trop longs
      const timeoutDuration = 5000; // 5 secondes
      
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
      
      // Sauvegarder dans le cache
      saveProfileToCache(data);
      
      return data;
    } catch (error) {
      console.error(`Error in fetchUserProfile attempt ${attempt + 1}:`, error);
      lastError = error;
      
      // Attendre un peu avant de réessayer (avec backoff exponentiel)
      if (attempt < maxRetries - 1) {
        const backoffTime = Math.min(1000 * Math.pow(2, attempt), 5000);
        console.log(`Retrying in ${backoffTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      }
    }
  }
  
  console.error(`Failed to fetch user profile after ${maxRetries} attempts`);
  throw lastError || new Error('Failed to fetch user profile');
};
