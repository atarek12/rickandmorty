import { StateCreator } from "zustand";
import { CharacterDetailedInfoFragment } from "../../../generated/graphql";

export interface CharactersSlice {
  characters: CharacterDetailedInfoFragment[];
  opened: string[];
  page: number | null | undefined;
  addCharacters: (characters: CharacterDetailedInfoFragment[]) => void;
  updatePage: (page: number | null | undefined) => void;
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
  characters: [],
  opened: [],
  page: 1,
  addCharacters: (characters) =>
    set((state) => ({ characters: [...state.characters, ...characters] })),
  updatePage: (page: number | null | undefined) => set(() => ({ page })),
  open: (id: string) => set((state) => ({ opened: [...state.opened, id] })),
  close: (id: string) =>
    set((state) => ({ opened: state.opened.filter((i) => i !== id) })),
  collapse: () => set({ opened: [] }),
});
