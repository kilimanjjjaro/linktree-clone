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
  value: SocialMediaType;
  label: string;
}
