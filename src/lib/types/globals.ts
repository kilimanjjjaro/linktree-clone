export interface ChildrenType {
  children: React.ReactNode;
}

export type SocialMediaType =
  | "email"
  | "facebook"
  | "discord"
  | "instagram"
  | "linkedin"
  | "pinterest"
  | "reddit"
  | "telegram"
  | "threads"
  | "tiktok"
  | "twitch"
  | "twitter"
  | "whatsapp"
  | "youtube";

export interface SocialMediaInterface {
  id: number;
  name: string;
  slug: SocialMediaType;
  link: string;
  form: {
    inputType: number;
    label: string;
    disabledText: string;
    placeholder: string;
  };
}

export type LinkSocialMedia = {
  id: number;
  name: string;
  slug: SocialMediaType;
  inputValue: string | number;
  link: string;
};
