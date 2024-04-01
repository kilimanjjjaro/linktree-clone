import { StateCreator } from "zustand";
import type { GlobalsSliceInterface } from "@/lib/types/store";

export const createGlobalsSlice: StateCreator<GlobalsSliceInterface> = (
  set,
) => ({
  dummyState: true,
  setDummyState: (dummyState) => set(() => ({ dummyState })),
});
