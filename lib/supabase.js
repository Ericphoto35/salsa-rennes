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
