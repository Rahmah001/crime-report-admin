import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import Router from 'next/router';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { query, collection, getDocs } from 'firebase/firestore';

import { toast } from 'react-hot-toast';

import { firestoreDb } from 'src/libs';
import { AppState, Admin } from 'src/types';

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        crimes: null,
        isLoadingCrime: false,
        isLoadingUser: false,
        user: null,

        // methods
        loginAdmin: ({ email, password }: Admin) => {
          const auth = getAuth();
          set((state) => ({ isLoadingUser: (state.isLoadingUser = true) }));
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              set((state) => ({ ...state, user: user }));
              set((state) => ({ ...state, isLoadingUser: false }));
              Router.push('/dashboard');
            })
            .catch((error) => {
              console.log(error);
              set((state) => ({ ...state, isLoadingUser: false }));
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
            .catch((err) => {
              set((state) => ({ ...state, isLoadingCrime: false }));
              console.log(err);
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
