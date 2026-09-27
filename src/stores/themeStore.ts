import { create } from "zustand";

interface ThemeState {
  theme: string;
  changeTheme: () => void;
  setTheme: (value: string) => void;
}

function locaTheme() {
  const local = localStorage.getItem("theme");

  if (local) {
    return local.toString();
  } else {
    return "light";
  }
}

export const useTheme = create<ThemeState>((set) => ({
  theme: locaTheme(),
  changeTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
  setTheme: (value) => set(() => ({ theme: value })),
}));
