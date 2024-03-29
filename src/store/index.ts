import create from 'zustand';

import { devtools, persist } from 'zustand/middleware';

import { AppStore, StoreState } from 'src/types';
import { StoreActions } from './actions';

export const initialState: StoreState = {
  crimes: null,
  attendedToCrimes: null,
  nonAttendedToCrimes: null,
  isLoadingCrime: false,
  isLoadingUser: false,
  user: null,
  isLoadingEdit: false,
  isLoadingDelete: false,
};

const useAppStore = create<AppStore>()(
  devtools(
    persist(
      () => ({
        ...initialState,
        ...StoreActions,
      }),
      { name: 'app-storage' }
    )
  )
);

export { useAppStore };
