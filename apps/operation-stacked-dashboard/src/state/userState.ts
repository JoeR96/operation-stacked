import create, { SetState } from 'zustand';

type StoreState = {
  userId: string | undefined;
  username: string | undefined;
  setUserId: (userId: string | undefined) => void;
  setUsername: (username: string | undefined) => void;
};

export const useUserStore = create<StoreState>((set: SetState<StoreState>) => ({
  userId: undefined,
  username: undefined,
  setUserId: (userId: string | undefined) => set({ userId }),
  setUsername: (username: string | undefined) => set({ username }),
}));
