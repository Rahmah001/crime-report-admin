import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';

export type Admin = { email: string; password: string };
export type CrimeType = DocumentData[] | null | [];

export type StoreState = {
  user: User | null;
  crimes: CrimeType;
  attendedToCrimes: CrimeType;
  nonAttendedToCrimes: CrimeType;
  isLoadingCrime: boolean | undefined;
  isLoadingUser: boolean | undefined;
  isLoadingEdit: boolean | undefined;
  isLoadingDelete: boolean | undefined;
};

export type StoreActions = {
  fetchCrimes: () => void;
  fetchCrimesAttendedTo: () => void;
  fetchNonAttendedToCrimes: () => void;
  loginAdmin: (user: Admin) => void;
  editCrime: (id: string, data: DocumentData, onClose: () => void) => void;
  deleteCrime: (id: string, onClose: () => void) => void;
  logoutAdmin: () => void;
};

export type AppStore = StoreState & StoreActions;

export type CrimeProps = {
  crime: DocumentData;
};
