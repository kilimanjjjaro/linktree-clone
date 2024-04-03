import { type StateCreator } from "zustand";
import type { SocialMediaSliceInterface } from "@/lib/types/store";

export const createSocialMediaSlice: StateCreator<SocialMediaSliceInterface> = (
  set,
) => ({
  linkMedia: [],
  setLinkMedia: (linkMedia) => { set(() => ({ linkMedia })); },
  step: 1,
  setStep: (step) => { set(() => ({ step })); },
  selectedMedia: null,
  setSelectedMedia: (selectedMedia) => { set(() => ({ selectedMedia })); },
});
