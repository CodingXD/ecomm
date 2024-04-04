import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
  id: string;
  name: string;
};

type UserState = {
  user: User | null;
  setUser: (data: User | null) => void;
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (data) => set({ user: data }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useUserStore;
