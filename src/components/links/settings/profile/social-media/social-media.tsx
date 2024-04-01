import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SocialMediaInterface } from "@/lib/types/globals";
import { useStore } from "@/lib/store/store";

interface Props {
  media: SocialMediaInterface;
}

export default function SocialMedia({ media }: Props) {
  const selectedMedia = useStore((state) => state.selectedMedia);

  return (
    <>
      {media.label}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          selectedMedia === media.value ? "opacity-100" : "opacity-0",
        )}
      />
    </>
  );
}
