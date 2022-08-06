import Router from 'next/router';

import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import {
  query,
  collection,
  getDocs,
  FirestoreError,
  where,
  setDoc,
  doc,
  DocumentData,
  onSnapshot,
} from 'firebase/firestore';
import { firestoreDb } from 'src/libs';
import { Admin, StoreActions as Actions } from 'src/types';
import { useAppStore } from 'src/store';

import toast from 'react-hot-toast';

export const StoreActions: Actions = {
  loginAdmin: ({ email, password }: Admin) => {
    const auth = getAuth();
    useAppStore.setState((state) => ({ ...state, isLoadingUser: true }));
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        useAppStore.setState((state) => ({ ...state, user: user }));
        useAppStore.setState((state) => ({ ...state, isLoadingUser: false }));
        toast.success('Login successful', {
          position: 'bottom-center',
        });
        Router.push('/dashboard');
      })
      .catch((error: AuthError) => {
        useAppStore.setState((state) => ({ ...state, isLoadingUser: false }));
        toast.error(`${error.message}`, {
          position: 'bottom-center',
        });
      });
  },
  fetchCrimes: async () => {
    useAppStore.setState((state) => ({ ...state, isLoadingCrime: true }));
    const crimeQuery = query(collection(firestoreDb, 'crimes'));
    await onSnapshot(
      crimeQuery,
      (snapshot) => {
        useAppStore.setState((state) => ({
          ...state,
          isLoadingCrime: false,
        }));
        useAppStore.setState((state) => ({
          ...state,
          crimes: snapshot?.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        }));
      },
      (error) => {
        useAppStore.setState((state) => ({ ...state, isLoadingCrime: false }));
        toast.error(`${error.message}`, {
          position: 'bottom-center',
        });
      }
    );
  },
  fetchCrimesAttendedTo: async () => {
    useAppStore.setState((state) => ({ ...state, isLoadingCrime: true }));
    const attentedCrimeQuery = query(
      collection(firestoreDb, 'crimes'),
      where('attendedTo', '==', true)
    );
    await getDocs(attentedCrimeQuery)
      .then((snapshot) => {
        useAppStore.setState((state) => ({
          ...state,
          isLoadingCrime: false,
        }));
        useAppStore.setState((state) => ({
          ...state,
          attendedToCrimes: snapshot?.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        }));
      })
      .catch((error: FirestoreError) => {
        useAppStore.setState((state) => ({ ...state, isLoadingCrime: false }));
        toast.error(`${error.message}`, {
          position: 'bottom-center',
        });
      });
  },
  fetchNonAttendedToCrimes: async () => {
    useAppStore.setState((state) => ({ ...state, isLoadingCrime: true }));
    const nonAttendedQuery = query(
      collection(firestoreDb, 'crimes'),
      where('attendedTo', '==', false)
    );
    await getDocs(nonAttendedQuery)
      .then((snapshot) => {
        useAppStore.setState((state) => ({
          ...state,
          isLoadingCrime: false,
        }));
        useAppStore.setState((state) => ({
          ...state,
          nonAttendedToCrimes: snapshot?.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        }));
      })
      .catch((error: FirestoreError) => {
        useAppStore.setState((state) => ({ ...state, isLoadingCrime: false }));
        toast.error(`${error.message}`, {
          position: 'bottom-center',
        });
      });
  },
  editCrime: async (id: string, data: DocumentData, onClose: () => void) => {
    useAppStore.setState((state) => ({ ...state, isLoadingEdit: true }));
    const crimeRef = await doc(firestoreDb, 'crimes', id);
    await setDoc(crimeRef, data)
      .then(() => {
        useAppStore.setState((state) => ({ ...state, isLoadingEdit: false }));
        console.log('Document successfully updated!');
        onClose();
      })
      .catch((error: FirestoreError) => {
        useAppStore.setState((state) => ({ ...state, isLoadingEdit: false }));
        console.log(error.message, 'Error');
      });
  },
};
