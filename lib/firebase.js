import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Éviter la double initialisation en mode dev (hot reload Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

// ─── Profil utilisateur ───────────────────────────────────────────────────────

export const fetchUserProfile = async (uid) => {
  if (!uid) return null;
  const ref = doc(db, 'user_profiles', uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
};

export const createUserProfile = async (uid, data) => {
  const ref = doc(db, 'user_profiles', uid);
  await setDoc(ref, {
    ...data,
    is_admin: false,
    is_approved: false,
    created_at: serverTimestamp(),
  });
};

export const updateUserProfile = async (uid, data) => {
  const ref = doc(db, 'user_profiles', uid);
  await updateDoc(ref, { ...data, updated_at: serverTimestamp() });
};

// ─── Liste de tous les profils (admin) ───────────────────────────────────────

export const fetchAllProfiles = async () => {
  const q = query(collection(db, 'user_profiles'), orderBy('created_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// ─── Événements ───────────────────────────────────────────────────────────────

export const fetchEvents = async () => {
  const q = query(collection(db, 'events'), orderBy('order', 'asc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const createEvent = async (data) => {
  await addDoc(collection(db, 'events'), {
    ...data,
    created_at: serverTimestamp(),
  });
};

export const updateEvent = async (id, data) => {
  const ref = doc(db, 'events', id);
  await updateDoc(ref, { ...data, updated_at: serverTimestamp() });
};

export const deleteEvent = async (id) => {
  await deleteDoc(doc(db, 'events', id));
};

// ─── Re-exports Auth Firebase ─────────────────────────────────────────────────

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
};
