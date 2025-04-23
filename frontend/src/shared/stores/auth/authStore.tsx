import { create } from "zustand";
import { IUser } from "../../types/user/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { decodedUser } from "../../utils/decodedUser";

interface IAuthStore {
    isAuthenticated: boolean;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    login: (token: string) => void;
    logout: () => void;
}

export const authStore = create<IAuthStore>((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user) => set({ user }),
    login: async(token: string) => {
        await AsyncStorage.setItem("token", token);        

        const user = decodedUser(token)


        set({user, isAuthenticated: true})
    },
    logout: () => {
        set({user: null, isAuthenticated: false})
    }
}))