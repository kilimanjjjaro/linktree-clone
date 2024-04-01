import SocialMedia from "@/components/links/settings/profile/social-media/social-media";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SOCIAL_MEDIA } from "@/lib/constants/globals";
import { useStore } from "@/lib/store/store";

export default function MediaSelector() {
  const selectedMedia = useStore((state) => state.selectedMedia);
  const setSelectedMedia = useStore((state) => state.setSelectedMedia);

  return (
    <Command className="rounded-xl border">
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {SOCIAL_MEDIA.map((media) => (
            <CommandItem
              key={media.value}
              value={media.value}
              onSelect={(value: string) => {
                setSelectedMedia(value === selectedMedia ? "" : value);
              }}
            >
              <SocialMedia media={media} />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
