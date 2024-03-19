import create from 'zustand';

const useUserStore = create((set) => ({
  userId: 'bc3004dd-7b86-4440-a7a2-661466e78ba8',
  setUserId: (userId) => set({ userId }),
}));

export default useUserStore;
