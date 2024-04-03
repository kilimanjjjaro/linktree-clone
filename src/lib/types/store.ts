import { type LinkSocialMedia, type SocialMediaInterface } from "@/lib/types/globals";

export interface GlobalsSliceInterface {
  dummyState: boolean;
  setDummyState: (dummyState: boolean) => void;
}

export interface AvatarSliceInterface {
  avatar: string;
  setAvatar: (avatar: string) => void;
  avatarToCrop: string;
  setAvatarToCrop: (avatar: string) => void;
}

export interface SocialMediaSliceInterface {
  linkMedia: LinkSocialMedia[];
  setLinkMedia: (linkMedia: LinkSocialMedia[]) => void;
  selectedMedia: SocialMediaInterface | null;
  setSelectedMedia: (selectedMedia: SocialMediaInterface | null) => void;
  step: number;
  setStep: (step: number) => void;
}

export interface StoreInterface
  extends GlobalsSliceInterface,
    AvatarSliceInterface,
    SocialMediaSliceInterface {}
