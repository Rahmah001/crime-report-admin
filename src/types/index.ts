import { User } from 'firebase/auth';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type Admin = { email: string; password: string };

export type CrimeState = {
  phoneNumber: string;
  crime: string;
  name: string;
  email: string;
};

export type AppState = {
  user: User | null;
  crimes: DocumentData[] | [] | null;
  isLoadingCrime: boolean | undefined;
  isLoadingUser: boolean | undefined;
  fetchCrimes: () => void;
  loginAdmin: (user: Admin) => void;
};
