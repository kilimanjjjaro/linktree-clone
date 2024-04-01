import { ChevronRight } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import MediaIcon from "@/components/links/settings/profile/social-media/media-icon";
import { useStore } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import type { SocialMediaInterface } from "@/lib/types/globals";

interface Props {
  media: SocialMediaInterface;
}

export default function Media({ media }: Props) {
  const selectedMedia = useStore((state) => state.selectedMedia);
  const setSelectedMedia = useStore((state) => state.setSelectedMedia);

  return (
    <CommandItem
      className="justify-between rounded-xl py-2.5 pl-3 pr-2.5"
      key={media.value}
      value={media.value}
      onSelect={(value: string) => {
        setSelectedMedia(value === selectedMedia ? "" : value);
      }}
    >
      <span className="flex items-center gap-2.5">
        <MediaIcon name={media.value} />
        {media.label}
      </span>
      <span className="flex items-center gap-2">
        <div
          className={cn(
            "rounded-md border border-white px-1.5 text-[10px] font-normal leading-4",
            selectedMedia === media.value ? "opacity-100" : "opacity-0",
          )}
        >
          Added
        </div>
        <ChevronRight className="ml-auto h-4 w-4" />
      </span>
    </CommandItem>
  );
}
