import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

export type Admin = { email: string; password: string };
export type CrimeType = DocumentData[] | null | [];

export type AppStore = {
  // States
  user: User | null;
  crimes: CrimeType;
  attendedToCrimes: CrimeType;
  nonAttendedToCrimes: CrimeType;
  isLoadingCrime: boolean | undefined;
  isLoadingUser: boolean | undefined;
  isLoadingEdit: boolean | undefined;

  // Methods
  fetchCrimes: () => void;
  fetchCrimesAttendedTo: () => void;
  fetchNonAttendedToCrimes: () => void;
  loginAdmin: (user: Admin) => void;
  editCrime: (id: string, data: DocumentData, onClose: () => void) => void;
};

export type CrimeProps = {
  crime: DocumentData;
};
