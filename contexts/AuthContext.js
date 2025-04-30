import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const isMounted = useRef(true);
  const router = useRouter();

  const fetchUserProfile = useCallback(async (userId) => {
    if (!userId) return null;
    
    try {
      console.log('Fetching user profile for:', userId);
      // Ajout d'un timeout pour éviter les problèmes de réseau infinis
      const fetchPromise = supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      // Créer un timeout de 10 secondes
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout fetching user profile')), 10000);
      });
      
      // Race entre la requête et le timeout
      const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      if (!data) {
        console.error('No profile data returned for user:', userId);
        throw new Error('No profile data found');
      }

      console.log('User profile fetched:', data);
      if (isMounted.current) {
        setUserProfile(data);
      }
      return data;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      if (isMounted.current) {
        setUserProfile(null);
        setAuthError('Erreur lors de la récupération du profil utilisateur');
      }
      return null;
    }
  }, []);

  // Gestion sécurisée des états d'authentification
  const safeSetState = useCallback((setter, value) => {
    if (isMounted.current) {
      setter(value);
    }
  }, []);

  // Réinitialiser les états d'authentification
  const resetAuthState = useCallback(() => {
    safeSetState(setUser, null);
    safeSetState(setUserProfile, null);
    safeSetState(setAuthError, null);
  }, [safeSetState]);

  // Gérer la déconnexion en cas d'utilisateur non approuvé
  const handleUnapprovedUser = useCallback(async () => {
    console.log('User not approved, signing out');
    try {
      await supabase.auth.signOut();
      resetAuthState();
      safeSetState(setAuthError, 'Votre compte est en attente d\'approbation par un administrateur.');
    } catch (error) {
      console.error('Error during unapproved user signout:', error);
      resetAuthState();
    }
  }, [resetAuthState, safeSetState]);

  // Initialiser l'authentification
  useEffect(() => {
    console.log('AuthProvider initialized');
    isMounted.current = true;

    const initAuth = async () => {
      try {
        safeSetState(setLoading, true);
        safeSetState(setAuthError, null);
        
        // Vérifier la session utilisateur actuelle
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        console.log('Session checked:', session?.user?.email);

        if (session?.user && isMounted.current) {
          safeSetState(setUser, session.user);
          try {
            const profile = await fetchUserProfile(session.user.id);
            
            if (!profile) {
              console.warn('No profile found for user, forcing sign out');
              await supabase.auth.signOut();
              resetAuthState();
            } else if (!profile.is_approved) {
              await handleUnapprovedUser();
            }
          } catch (profileError) {
            console.error('Error fetching profile during init:', profileError);
            // En cas d'erreur de profil, on force une déconnexion pour éviter l'état bloqué
            await supabase.auth.signOut();
            resetAuthState();
          }
        } else if (isMounted.current) {
          resetAuthState();
        }
      } catch (error) {
        console.error('Error in initAuth:', error);
        if (isMounted.current) {
          resetAuthState();
          safeSetState(setAuthError, 'Erreur d\'initialisation de l\'authentification');
        }
      } finally {
        if (isMounted.current) {
          safeSetState(setLoading, false);
        }
      }
    };

    initAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      try {
        safeSetState(setLoading, true);
        safeSetState(setAuthError, null);

        if (session?.user && isMounted.current) {
          safeSetState(setUser, session.user);
          try {
            const profile = await fetchUserProfile(session.user.id);
            
            if (!profile) {
              console.warn('No profile found for user in state change, forcing sign out');
              await supabase.auth.signOut();
              resetAuthState();
            } else if (!profile.is_approved) {
              await handleUnapprovedUser();
            }
          } catch (profileError) {
            console.error('Error fetching profile during state change:', profileError);
            // En cas d'erreur de profil, on force une déconnexion pour éviter l'état bloqué
            await supabase.auth.signOut();
            resetAuthState();
          }
        } else if (isMounted.current) {
          resetAuthState();
        }
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        if (isMounted.current) {
          resetAuthState();
          safeSetState(setAuthError, 'Erreur lors du changement d\'état d\'authentification');
        }
      } finally {
        if (isMounted.current) {
          safeSetState(setLoading, false);
        }
      }
    });

    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, handleUnapprovedUser, resetAuthState, safeSetState]);

  const signUp = async ({ email, password, fullName, phone }) => {
    try {
      safeSetState(setLoading, true);
      safeSetState(setAuthError, null);
      
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

      return { error: null, message: 'Inscription réussie. Votre compte est en attente d\'approbation.' };
    } catch (error) {
      console.error('Error in signUp:', error);
      safeSetState(setAuthError, error.message || 'Erreur lors de l\'inscription');
      return { error };
    } finally {
      safeSetState(setLoading, false);
    }
  };

  const signIn = async (email, password) => {
    try {
      safeSetState(setLoading, true);
      safeSetState(setAuthError, null);
      
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
        resetAuthState();
        const approvalError = new Error('Votre compte est en attente d\'approbation par un administrateur.');
        safeSetState(setAuthError, approvalError.message);
        throw approvalError;
      }

      return { error: null };
    } catch (error) {
      console.error('Error in signIn:', error);
      safeSetState(setAuthError, error.message || 'Échec de la connexion. Vérifiez vos identifiants.');
      return { error };
    } finally {
      safeSetState(setLoading, false);
    }
  };

  const signOut = async () => {
    try {
      safeSetState(setLoading, true);
      safeSetState(setAuthError, null);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      resetAuthState();
      
      // Rediriger vers la page d'accueil sans forcer un rafraîchissement complet
      // ce qui peut causer des problèmes d'état
      await router.push('/');
      
      // Nous évitons window.location.reload() car cela peut interrompre
      // d'autres opérations en cours et causer des problèmes d'état
    } catch (error) {
      console.error('Error signing out:', error.message);
      safeSetState(setAuthError, 'Erreur lors de la déconnexion');
    } finally {
      safeSetState(setLoading, false);
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
      authError,
      signUp,
      signIn,
      signOut,
      isAdmin,
      isApproved,
      fetchUserProfile, // Exposer cette fonction peut être utile pour rafraîchir le profil
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
