import { StateCreator } from "zustand";
import { CharacterDetailedInfoFragment } from "../../../generated/graphql";

export interface CharactersSlice {
  characters: CharacterDetailedInfoFragment[];
  opened: string[];
  addCharacters: (characters: CharacterDetailedInfoFragment[]) => void;
  replaceCharacters: (characters: CharacterDetailedInfoFragment[]) => void;
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
  addCharacters: (characters) =>
    set((state) => ({ characters: [...state.characters, ...characters] })),
  replaceCharacters: (characters) => set(() => ({ characters })),
  open: (id: string) => set((state) => ({ opened: [...state.opened, id] })),
  close: (id: string) =>
    set((state) => ({ opened: state.opened.filter((i) => i !== id) })),
  collapse: () => set({ opened: [] }),
});
