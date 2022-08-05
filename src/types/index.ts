import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

export type Admin = { email: string; password: string };

export type AppStore = {
  user: User | null;
  crimes: DocumentData[] | [] | null;
  isLoadingCrime: boolean | undefined;
  isLoadingUser: boolean | undefined;
  fetchCrimes: () => void;
  loginAdmin: (user: Admin) => void;
};
