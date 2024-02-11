import create from 'zustand';
import Cookies from 'js-cookie'; // Assuming js-cookie is already installed

// Define the store's state and actions
const useAuthStore = create((set) => ({
  userId: Cookies.get('userId') || null, // Initialize userId from cookie
  username: null, // Optional: manage username globally
  setUser: (userId, username) => {
    Cookies.set('userId', userId, { expires: 7 }); // Set cookie to expire in 7 days
    set({ userId, username });
  },
  clearUser: () => {
    Cookies.remove('userId');
    set({ userId: null, username: null });
  },
  // Additional auth related state/actions can be added here
}));

export default useAuthStore;
