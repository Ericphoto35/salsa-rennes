import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserProfile = async (userId) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      console.log('User profile fetched:', data);
      setUserProfile(data);
      return data;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      setUserProfile(null);
      return null;
    }
  };

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;
    console.log('AuthProvider initialized');

    const initAuth = async () => {
      try {
        setLoading(true);
        // Vérifier la session utilisateur actuelle
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session checked:', session?.user?.email);

        if (session?.user && mounted) {
          setUser(session.user);
          const profile = await fetchUserProfile(session.user.id);
          if (!profile?.is_approved) {
            console.log('User not approved, signing out');
            await supabase.auth.signOut();
            setUser(null);
            setUserProfile(null);
          }
        } else if (mounted) {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error in initAuth:', error);
        if (mounted) {
          setUser(null);
          setUserProfile(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', session?.user?.email);

      if (session?.user && mounted) {
        setUser(session.user);
        const profile = await fetchUserProfile(session.user.id);
        if (!profile?.is_approved) {
          console.log('User not approved, signing out');
          await supabase.auth.signOut();
          setUser(null);
          setUserProfile(null);
        }
      } else if (mounted) {
        setUser(null);
        setUserProfile(null);
      }
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password, fullName, phone }) => {
    try {
      setLoading(true);
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Créer le profil utilisateur
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert([
          {
            id: authData.user.id,
            email,
            full_name: fullName,
            phone,
            is_admin: false,
            is_approved: false,
          },
        ]);

      if (profileError) throw profileError;

      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Vérifier si l'utilisateur est approuvé
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('is_approved')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      if (!profile.is_approved) {
        await supabase.auth.signOut();
        throw new Error('Votre compte est en attente d\'approbation par un administrateur.');
      }

      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setUserProfile(null);
      
      // Rediriger vers la page d'accueil
      await router.push('/');
      
      // Forcer un rafraîchissement de la page
      window.location.reload();
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = () => {
    return userProfile?.is_admin ?? false;
  };

  const isApproved = () => {
    return userProfile?.is_approved ?? false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      loading,
      signUp,
      signIn,
      signOut,
      isAdmin,
      isApproved,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
