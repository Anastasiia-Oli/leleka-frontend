import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/user";

type AuthUserStore = {
  user: User;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  setIsAuthenticated: (value: boolean) => void;
  clearIsAuthenticated: () => void;
};

const initialUser: User = {
  _id: "",
  name: "",
  email: "",
  childSex: "Ще не знаю",
  dueDate: "",
  photo: "",
  createdAt: "",
  updatedAt: "",
};

export const useAuthUserStore = create<AuthUserStore>()(
  persist(
    (set) => ({
      user: initialUser,
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setUser: (user) =>
        set(() => ({
          user: user,
          isAuthenticated: true,
        })),
      clearIsAuthenticated: () =>
        set(() => ({
          user: initialUser,
          isAuthenticated: false,
        })),
    }),
    {
      name: "user-draft",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      // merge: (persistedState: unknown, currentState) => {
      //   if (typeof persistedState === "object" && persistedState !== null) {
      //     return {
      //       ...currentState,
      //       ...(persistedState as Partial<AuthUserStore>),
      //     };
      //   }
      //   return currentState;
      // },
    }
  )
);
