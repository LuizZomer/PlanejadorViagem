import { create } from "zustand";
import { IUser } from "../../types/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodedUser } from "../../utils/decodedUser";
import { api } from "../../../services/axios";

interface IAuthStore {
  isAuthenticated: boolean;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  login: (token: string) => void;
  logout: () => void;
  initializeAuth: () => Promise<void>;
}

export const authStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setUser: (user) => set({ user }),
  login: async (token: string) => {
    await AsyncStorage.setItem("token", token);

    const user = decodedUser(token);

    set({ user, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  initializeAuth: async (): Promise<void> => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      return;
    }

    try {
      await api.get("/auth");

      const user = decodedUser(token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      await AsyncStorage.removeItem("token");
      set({ user: null, isAuthenticated: false });
    }
  },
}));
