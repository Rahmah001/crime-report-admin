import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

export type Admin = { email: string; password: string };
export type CrimeType = DocumentData[] | null | [];

export type AppStore = {
  user: User | null;
  crimes: CrimeType;
  isLoadingCrime: boolean | undefined;
  isLoadingUser: boolean | undefined;
  fetchCrimes: () => void;
  loginAdmin: (user: Admin) => void;
};

export type CrimeProps = {
  crime: DocumentData;
};
