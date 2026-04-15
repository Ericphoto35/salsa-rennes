import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  auth,
  fetchUserProfile,
  createUserProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
} from '../lib/firebase';
import { cleanAuthStorage } from '../lib/authUtils';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const isMounted = useRef(true);
  const router = useRouter();

  const safeSet = useCallback((setter, value) => {
    if (isMounted.current) setter(value);
  }, []);

  const resetAuthState = useCallback(() => {
    safeSet(setUser, null);
    safeSet(setUserProfile, null);
    safeSet(setAuthError, null);
  }, [safeSet]);

  const loadProfile = useCallback(async (firebaseUser) => {
    try {
      const profile = await fetchUserProfile(firebaseUser.uid);
      if (isMounted.current) setUserProfile(profile);
      return profile;
    } catch (err) {
      console.error('Erreur chargement profil:', err);
      if (isMounted.current) setUserProfile(null);
      return null;
    }
  }, []);

  // Écouter les changements d'état Firebase Auth
  useEffect(() => {
    isMounted.current = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted.current) return;

      safeSet(setLoading, true);
      safeSet(setAuthError, null);

      if (firebaseUser) {
        // Vérifier que l'email est confirmé
        if (!firebaseUser.emailVerified) {
          safeSet(setUser, null);
          safeSet(setUserProfile, null);
          safeSet(setAuthError, '📧 Veuillez confirmer votre adresse email avant de vous connecter. Vérifiez votre boîte de réception et cliquez sur le lien de confirmation.');
          safeSet(setLoading, false);
          return;
        }

        safeSet(setUser, firebaseUser);

        const profile = await loadProfile(firebaseUser);

        if (profile && !profile.is_approved) {
          // Déconnecter les utilisateurs non approuvés
          await firebaseSignOut(auth);
          resetAuthState();
          safeSet(setAuthError, '⏳ Votre compte est en attente d\'approbation par un administrateur. Vous recevrez un email de confirmation une fois votre compte validé.');
        }
      } else {
        resetAuthState();
      }

      safeSet(setLoading, false);
    });

    return () => {
      isMounted.current = false;
      unsubscribe();
    };
  }, [loadProfile, resetAuthState, safeSet]);

  // ─── Inscription ────────────────────────────────────────────────────────────

  const signUp = async ({ email, password, fullName, phone }) => {
    try {
      safeSet(setLoading, true);
      safeSet(setAuthError, null);

      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);

      // Envoyer l'email de confirmation
      await sendEmailVerification(newUser);

      // Créer le profil dans Firestore
      await createUserProfile(newUser.uid, { email, full_name: fullName, phone });

      // Déconnecter immédiatement : l'utilisateur doit confirmer son email ET être approuvé
      await firebaseSignOut(auth);
      resetAuthState();

      return {
        error: null,
        message: '✅ Inscription réussie ! Vérifiez votre email pour confirmer votre compte. Votre compte sera ensuite examiné par un administrateur.',
      };
    } catch (error) {
      console.error('Erreur inscription:', error);
      const msg = translateFirebaseError(error.code);
      safeSet(setAuthError, msg);
      return { error: { message: msg } };
    } finally {
      safeSet(setLoading, false);
    }
  };

  // ─── Connexion ──────────────────────────────────────────────────────────────

  const signIn = async (email, password) => {
    try {
      safeSet(setLoading, true);
      safeSet(setAuthError, null);

      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

      // Vérifier l'email confirmé
      if (!firebaseUser.emailVerified) {
        await firebaseSignOut(auth);
        resetAuthState();
        const msg = '📧 Veuillez confirmer votre adresse email avant de vous connecter. Vérifiez votre boîte de réception et cliquez sur le lien de confirmation.';
        safeSet(setAuthError, msg);
        return { error: { message: msg } };
      }

      // Vérifier l'approbation admin
      const profile = await fetchUserProfile(firebaseUser.uid);

      if (!profile) {
        await firebaseSignOut(auth);
        resetAuthState();
        const msg = '🔒 Aucun profil trouvé. Veuillez vous inscrire ou contacter l\'administrateur.';
        safeSet(setAuthError, msg);
        return { error: { message: msg } };
      }

      if (!profile.is_approved) {
        await firebaseSignOut(auth);
        resetAuthState();
        const msg = '⏳ Votre compte est en attente d\'approbation par un administrateur. Vous recevrez un email de confirmation une fois votre compte validé.';
        safeSet(setAuthError, msg);
        return { error: { message: msg } };
      }

      return { error: null };
    } catch (error) {
      console.error('Erreur connexion:', error);
      const msg = translateFirebaseError(error.code);
      safeSet(setAuthError, msg);
      return { error: { message: msg } };
    } finally {
      safeSet(setLoading, false);
    }
  };

  // ─── Déconnexion ────────────────────────────────────────────────────────────

  const signOut = async () => {
    try {
      safeSet(setLoading, true);
      cleanAuthStorage();
      await firebaseSignOut(auth);
      resetAuthState();
      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
    } catch (error) {
      console.error('Erreur déconnexion:', error);
      cleanAuthStorage();
      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
    } finally {
      safeSet(setLoading, false);
    }
  };

  const isAdmin = () => userProfile?.is_admin ?? false;
  const isApproved = () => userProfile?.is_approved ?? false;

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
      fetchUserProfile: loadProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// ─── Traduction des codes d'erreur Firebase ───────────────────────────────────

function translateFirebaseError(code) {
  const errors = {
    'auth/user-not-found': 'Aucun compte trouvé avec cet email.',
    'auth/wrong-password': 'Mot de passe incorrect.',
    'auth/invalid-credential': 'Email ou mot de passe incorrect.',
    'auth/email-already-in-use': 'Cet email est déjà utilisé par un autre compte.',
    'auth/weak-password': 'Le mot de passe doit contenir au moins 6 caractères.',
    'auth/invalid-email': 'Adresse email invalide.',
    'auth/too-many-requests': 'Trop de tentatives. Veuillez réessayer plus tard.',
    'auth/network-request-failed': 'Erreur réseau. Vérifiez votre connexion internet.',
  };
  return errors[code] || 'Une erreur est survenue. Veuillez réessayer.';
}
