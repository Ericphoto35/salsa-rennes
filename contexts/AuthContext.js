import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

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
      
      // Utiliser la nouvelle fonction avec réessais automatiques
      const data = await fetchUserProfileWithRetry(userId, 3);
      
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

  // Vérification périodique de la validité de la session
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Vérifier la validité de la session toutes les 30 minutes
    const sessionCheckInterval = 30 * 60 * 1000; // 30 minutes
    
    const checkSessionValidity = async () => {
      if (!user) return; // Ne pas vérifier si l'utilisateur n'est pas connecté
      
      console.log('Vérification périodique de la validité de la session...');
      const isValid = await validateAndCleanSession(supabase);
      
      if (!isValid && isMounted.current) {
        console.log('Session invalide détectée lors de la vérification périodique, déconnexion...');
        // La session n'est plus valide, déconnecter l'utilisateur
        resetAuthState();
        safeSetState(setAuthError, 'Votre session a expiré. Veuillez vous reconnecter.');
        
        // Forcer un rafraîchissement de la page
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        }
      }
    };
    
    // Vérifier immédiatement au démarrage
    if (user) {
      checkSessionValidity();
    }
    
    // Configurer la vérification périodique
    const intervalId = setInterval(checkSessionValidity, sessionCheckInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [user, resetAuthState, safeSetState]);

  // Initialiser l'authentification
  useEffect(() => {
    console.log('AuthProvider initialized');
    isMounted.current = true;

    const initAuth = async () => {
      try {
        safeSetState(setLoading, true);
        safeSetState(setAuthError, null);
        
        // Vérifier la session utilisateur avec la fonction utilitaire améliorée
        const { session, error: sessionError } = await checkSession();
        
        if (sessionError) throw sessionError;
        
        console.log('Session checked:', session?.user?.email);

        if (session?.user && isMounted.current) {
          safeSetState(setUser, session.user);
          try {
            // Ajouter un délai court pour s'assurer que la session est bien établie
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Essayer de récupérer le profil avec gestion d'erreur améliorée
            try {
              const profile = await fetchUserProfile(session.user.id);
              
              // Vérifier si c'est un profil d'urgence (créé en cas d'erreur réseau)
              if (profile.emergency_profile) {
                console.warn('Using emergency profile due to network issues');
                safeSetState(setUserProfile, profile);
                // Ne pas déconnecter l'utilisateur, mais planifier une nouvelle tentative
                setTimeout(() => {
                  if (isMounted.current) {
                    fetchUserProfile(session.user.id).catch(e => {
                      console.log('Background profile refresh failed:', e);
                    });
                  }
                }, 30000); // Réessayer dans 30 secondes
              } else if (!profile.is_approved) {
                await handleUnapprovedUser();
              }
            } catch (profileError) {
              console.error('Error fetching profile, but will continue session:', profileError);
              // Ne pas déconnecter l'utilisateur en cas d'erreur réseau temporaire
              // sauf si explicitement demandé par l'utilisateur
              if (profileError.message && profileError.message.includes('not approved')) {
                await handleUnapprovedUser();
              }
            }
          } catch (profileError) {
            console.error('Error fetching profile during init:', profileError);
            // En cas d'erreur de profil, on force une déconnexion pour éviter l'état bloqué
            await supabase.auth.signOut();
            resetAuthState();
            // Forcer une actualisation complète en production
            if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
              window.localStorage.removeItem('salsa-rennes-auth-storage');
              window.location.href = '/';
            }
          }
        } else if (isMounted.current) {
          resetAuthState();
        }
      } catch (error) {
        console.error('Error in initAuth:', error);
        if (isMounted.current) {
          resetAuthState();
          safeSetState(setAuthError, 'Erreur d\'initialisation de l\'authentification');
          // Forcer une actualisation complète en cas d'erreur en production
          if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
            window.localStorage.removeItem('salsa-rennes-auth-storage');
          }
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

        if (event === 'SIGNED_OUT') {
          console.log('User signed out, cleaning up state');
          resetAuthState();
          
          // En production, s'assurer que le stockage local est nettoyé
          if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
            window.localStorage.removeItem('salsa-rennes-auth-storage');
          }
        } else if (session?.user && isMounted.current) {
          safeSetState(setUser, session.user);
          try {
            // Ajouter un délai court pour s'assurer que la session est bien établie
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Essayer de récupérer le profil avec gestion d'erreur améliorée
            try {
              const profile = await fetchUserProfile(session.user.id);
              
              // Vérifier si c'est un profil d'urgence (créé en cas d'erreur réseau)
              if (profile.emergency_profile) {
                console.warn('Using emergency profile due to network issues during state change');
                safeSetState(setUserProfile, profile);
                // Ne pas déconnecter l'utilisateur, mais planifier une nouvelle tentative
                setTimeout(() => {
                  if (isMounted.current) {
                    fetchUserProfile(session.user.id).catch(e => {
                      console.log('Background profile refresh failed:', e);
                    });
                  }
                }, 30000); // Réessayer dans 30 secondes
              } else if (!profile.is_approved) {
                await handleUnapprovedUser();
              }
            } catch (profileError) {
              console.error('Error fetching profile during state change, but will continue session:', profileError);
              // Ne pas déconnecter l'utilisateur en cas d'erreur réseau temporaire
              // sauf si explicitement demandé par l'utilisateur
              if (profileError.message && profileError.message.includes('not approved')) {
                await handleUnapprovedUser();
              }
            }
          } catch (profileError) {
            console.error('Error fetching profile during state change:', profileError);
            // En cas d'erreur de profil, on force une déconnexion pour éviter l'état bloqué
            await supabase.auth.signOut();
            resetAuthState();
            
            // Forcer une actualisation complète en production
            if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
              window.localStorage.removeItem('salsa-rennes-auth-storage');
              window.location.href = '/';
            }
          }
        } else if (isMounted.current) {
          resetAuthState();
        }
      } catch (error) {
        console.error('Error in auth state change handler:', error);
        if (isMounted.current) {
          resetAuthState();
          safeSetState(setAuthError, 'Erreur lors du changement d\'état d\'authentification');
          
          // Nettoyer le stockage local en cas d'erreur
          if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
            window.localStorage.removeItem('salsa-rennes-auth-storage');
          }
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
      
      // Utiliser la fonction utilitaire pour nettoyer tous les cookies et le stockage
      cleanAuthStorage();
      
      // Déconnexion de Supabase avec options de nettoyage complètes
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      if (error) throw error;
      
      resetAuthState();
      
      // Attendre un court instant pour s'assurer que toutes les opérations de nettoyage sont terminées
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Forcer un rafraîchissement complet pour éviter les problèmes de cache
      if (typeof window !== 'undefined') {
        console.log('Forcing page refresh after signout');
        // Utiliser location.replace au lieu de location.href pour éviter l'historique
        window.location.replace('/');
        return; // Ne pas continuer l'exécution après la redirection
      }
      
      // Fallback au routeur Next.js (ne devrait jamais être atteint)
      await router.push('/');
    } catch (error) {
      console.error('Error signing out:', error.message);
      safeSetState(setAuthError, 'Erreur lors de la déconnexion');
      
      // Même en cas d'erreur, essayer de nettoyer les cookies et forcer un rafraîchissement
      cleanAuthStorage();
      
      if (typeof window !== 'undefined') {
        // Forcer un rafraîchissement complet même en cas d'erreur
        window.location.replace('/');
      }
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
