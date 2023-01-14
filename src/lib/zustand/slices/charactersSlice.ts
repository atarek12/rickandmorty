import { StateCreator } from "zustand";

export interface CharactersSlice {
  opened: string[];
  open: (id: string) => void;
  close: (id: string) => void;
  collapse: () => void;
}

export const createCharactersSlice: StateCreator<
  CharactersSlice,
  [],
  [],
  CharactersSlice
> = (set) => ({
  opened: [],
  open: (id: string) => set((state) => ({ opened: [...state.opened, id] })),
  close: (id: string) =>
    set((state) => ({ opened: state.opened.filter((i) => i !== id) })),
  collapse: () => set({ opened: [] }),
});
