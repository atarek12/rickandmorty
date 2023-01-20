import { create } from "zustand";
import {
  CharactersSlice,
  SearchAndFilterSlice,
  createCharactersSlice,
  createSearchAndFilterSlice,
} from "./slices";

export const useBoundStore = create<CharactersSlice & SearchAndFilterSlice>()(
  (set, get, api) => ({
    ...createCharactersSlice(set, get, api),
    ...createSearchAndFilterSlice(set, get, api),
  })
);
