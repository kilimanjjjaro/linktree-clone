import { StateCreator } from "zustand";
import type { AvatarSliceInterface } from "@/lib/types/store";

export const createAvatarSlice: StateCreator<AvatarSliceInterface> = (set) => ({
  avatar: "/images/default-link-avatar.svg",
  setAvatar: (avatar) => set(() => ({ avatar })),
  avatarToCrop: "",
  setAvatarToCrop: (avatarToCrop) => set(() => ({ avatarToCrop })),
});
