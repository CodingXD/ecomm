import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ConfigState = {
  isMenuOpen: boolean;
  setConfig: ({ key, value }: UpdateConfig) => void;
};

type Keys = keyof Omit<ConfigState, "setConfig">;

type UpdateConfig = {
  key: Keys;
  value: ConfigState[Keys];
};

const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      isMenuOpen: false,
      setConfig: ({ key, value }) => set({ [key]: value }),
    }),
    {
      name: "config",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useConfigStore;
