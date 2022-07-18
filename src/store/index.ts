import create from 'zustand';

import Router from 'next/router';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { query, collection, getDocs } from 'firebase/firestore';

import { toast } from 'react-hot-toast';

import { firestoreDb } from 'src/libs';
import { AppState, formData } from 'src/types';

export const useStore = create<AppState>((set) => ({
  crimes: [],
  isLoadingCrime: false,
  isLoadingUser: false,
  user: null,

  // methods
  loginAdmin: ({ email, password }: formData) => {
    const auth = getAuth();
    set((state) => ({ isLoadingUser: (state.isLoadingUser = true) }));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set((state) => ({ user: (state.user = user) }));
        set((state) => ({ isLoadingUser: (state.isLoadingUser = false) }));
        localStorage.setItem('users', JSON.stringify(user));
        console.log(userCredential);
        Router.push('/dashboard');
      })
      .catch((error) => {
        console.log(error);
        set((state) => ({ isLoadingUser: (state.isLoadingUser = false) }));
      });
  },
  fetchCrimes: async () => {
    set((state) => ({ isLoadingCrime: (state.isLoadingCrime = true) }));
    const crimeQuery = query(collection(firestoreDb, 'crimes'));
    await getDocs(crimeQuery)
      .then((snapshot) => {
        set((state) => ({ crimes: (state.crimes = snapshot.docs) }));
        set((state) => ({ isLoadingCrime: (state.isLoadingCrime = false) }));
        localStorage.setItem('crimes', JSON.stringify(snapshot.docs));
      })
      .catch((err) => {
        set((state) => ({ isLoadingCrime: (state.isLoadingCrime = false) }));
        console.log(err);
        toast('Error fetching crimes', {
          position: 'bottom-center',
          duration: 5000,
        });
      });
  },
}));
