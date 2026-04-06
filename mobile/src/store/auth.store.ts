import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  authToken: string | null;
  isLoading: boolean;
  setAuthToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  restoreToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(async (set) => ({
  user: null,
  authToken: null,
  isLoading: true,

  setAuthToken: async (token: string) => {
    await AsyncStorage.setItem('authToken', token);
    set({ authToken: token });
  },

  setUser: (user: User) => {
    set({ user });
    AsyncStorage.setItem('user', JSON.stringify(user));
  },

  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    set({ user: null, authToken: null });
  },

  restoreToken: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const user = await AsyncStorage.getItem('user');
      set({
        authToken: token,
        user: user ? JSON.parse(user) : null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Ошибка восстановления токена:', error);
      set({ isLoading: false });
    }
  },
}));
