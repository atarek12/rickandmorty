import { create } from "zustand";
import {
  CharactersSlice,
  createCharactersSlice,
} from "./slices/charactersSlice";

export const useBoundStore = create<CharactersSlice>()((set, get, api) => ({
  ...createCharactersSlice(set, get, api),
}));
