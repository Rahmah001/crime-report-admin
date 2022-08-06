import create from 'zustand';

import { devtools, persist } from 'zustand/middleware';

import { AppStore } from 'src/types';
import { StoreActions } from './actions';

const initialState = {
  crimes: null,
  attendedToCrimes: null,
  nonAttendedToCrimes: null,
  isLoadingCrime: false,
  isLoadingUser: false,
  user: null,
  isLoadingEdit: false,
};

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (_) => ({
        ...initialState,
        // methods
        ...StoreActions,
      }),
      {
        name: 'app-storage',
      }
    )
  )
);

export { useAppStore };
