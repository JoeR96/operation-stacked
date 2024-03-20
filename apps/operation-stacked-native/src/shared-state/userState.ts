import create from 'zustand';

// Define the state shape
interface UserState {
  userId: string;
  setUserId: (userId: string) => void;
}

// Create the store with typed state and actions
const useUserStore = create<UserState>((set) => ({
  userId: 'bc3004dd-7b86-4440-a7a2-661466e78ba8',
  setUserId: (userId: string) => set({ userId }),
}));

export default useUserStore;
