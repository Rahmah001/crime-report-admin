import create from 'zustand';

import toast from 'react-hot-toast';
import Router from 'next/router';

import { devtools, persist } from 'zustand/middleware';

import { AuthError, getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import {
  query,
  collection,
  getDocs,
  FirestoreError,
  where,
} from 'firebase/firestore';

import { firestoreDb } from 'src/libs';
import { AppStore, Admin } from 'src/types';

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set) => ({
        crimes: null,
        attendedToCrimes: null,
        isLoadingCrime: false,
        isLoadingUser: false,
        user: null,

        // methods
        loginAdmin: ({ email, password }: Admin) => {
          const auth = getAuth();
          set((state) => ({ ...state, isLoadingUser: true }));
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              set((state) => ({ ...state, user: user }));
              set((state) => ({ ...state, isLoadingUser: false }));
              toast.success('Login successful', {
                position: 'bottom-center',
              });
              Router.push('/dashboard');
            })
            .catch((error: AuthError) => {
              set((state) => ({ ...state, isLoadingUser: false }));
              toast.error(`${error.message}`, {
                position: 'bottom-center',
              });
            });
        },
        fetchCrimes: async () => {
          set((state) => ({ ...state, isLoadingCrime: true }));
          const crimeQuery = query(collection(firestoreDb, 'crimes'));
          await getDocs(crimeQuery)
            .then((snapshot) => {
              set((state) => ({
                ...state,
                isLoadingCrime: false,
              }));
              set((state) => ({
                ...state,
                crimes: snapshot?.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                }),
              }));
            })
            .catch((error: FirestoreError) => {
              set((state) => ({ ...state, isLoadingCrime: false }));
              toast.error(`${error.message}`, {
                position: 'bottom-center',
              });
            });
        },
        fetchCrimesAttendedTo: async () => {
          set((state) => ({ ...state, isLoadingCrime: true }));
          const attentedCrimeQuery = query(
            collection(firestoreDb, 'crimes'),
            where('attendedTo', '==', true)
          );
          await getDocs(attentedCrimeQuery)
            .then((snapshot) => {
              set((state) => ({
                ...state,
                isLoadingCrime: false,
              }));
              set((state) => ({
                ...state,
                attendedToCrimes: snapshot?.docs.map((doc) => {
                  return { ...doc.data(), id: doc.id };
                }),
              }));
            })
            .catch((error: FirestoreError) => {
              set((state) => ({ ...state, isLoadingCrime: false }));
              toast.error(`${error.message}`, {
                position: 'bottom-center',
              });
            });
        },
      }),
      {
        name: 'app-storage',
      }
    )
  )
);

export { useAppStore };
