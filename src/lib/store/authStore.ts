import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (v) => set({ isAuthenticated: v }),
  clearIsAuthenticated: () => set({ isAuthenticated: false }),
}));