import type { UserProfile } from "@/types/interfaces";
import { create } from "zustand";
import { mutative } from "zustand-mutative";
import { persist } from "zustand/middleware";

type TokenState = {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
};

type TokenActions = {
  setUser: (user: UserProfile | null) => void;
  setToken: (token: string | null) => void;
  removeToken: () => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<TokenState & TokenActions>()(
  persist(
    mutative((set) => ({
      user: null,
      token: localStorage.getItem("access-token"),
      isLoading: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      removeToken: () => set({ token: null }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
    })),
    { name: "access-token", partialize: (state) => ({ token: state.token }) },
  ),
);
