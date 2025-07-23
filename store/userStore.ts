// store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  specialization: string;
  isAdmin: boolean;
  organizationId: string | null;
  profileImage: string;
  createdAt: Date;
};

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // localStorage key
    },
  ),
);
