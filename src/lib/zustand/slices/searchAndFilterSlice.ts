import { StateCreator } from "zustand";

export interface SearchAndFilterSlice {
  status: string | undefined;
  gender: string | undefined;
  search: string | null | undefined;
  page: number | null | undefined;
  updateStatus: (status: string | undefined) => void;
  updateGender: (gender: string | undefined) => void;
  updateSearch: (search: string | undefined) => void;
  updatePage: (page: number | null | undefined) => void;
}

export const createSearchAndFilterSlice: StateCreator<
  SearchAndFilterSlice,
  [],
  [],
  SearchAndFilterSlice
> = (set) => ({
  status: "",
  gender: "",
  search: "",
  page: 1,
  updateStatus: (status: string | undefined) => set(() => ({ status })),
  updateGender: (gender: string | undefined) => set(() => ({ gender })),
  updateSearch: (search: string | undefined) => set(() => ({ search })),
  updatePage: (page: number | null | undefined) => set(() => ({ page })),
});
