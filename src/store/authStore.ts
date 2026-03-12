import { create } from 'zustand';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  init: () => () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  error: null,

  signInWithGoogle: async () => {
    set({ error: null });
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  },

  signInWithEmail: async (email, password) => {
    set({ error: null });
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: unknown) {
      set({ error: parseAuthError(e) });
    }
  },

  signUpWithEmail: async (email, password) => {
    set({ error: null });
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e: unknown) {
      set({ error: parseAuthError(e) });
    }
  },

  signOutUser: async () => {
    await signOut(auth);
  },

  init: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
    return unsubscribe;
  },
}));

function parseAuthError(e: unknown): string {
  const code = (e as { code?: string }).code ?? '';
  if (code === 'auth/email-already-in-use') return 'Email already in use.';
  if (code === 'auth/invalid-credential') return 'Invalid email or password.';
  if (code === 'auth/weak-password') return 'Password must be at least 6 characters.';
  return 'Something went wrong. Try again.';
}
