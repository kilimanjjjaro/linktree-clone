"use client";

import { CircleHelp, Plus } from "lucide-react";
import MediaSelector from "@/components/links/settings/profile/social-media/media-selector";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store/store";
import { SOCIAL_MEDIA } from "@/lib/constants/globals";
import { cn } from "@/lib/utils";

export default function LinkSocialMedia() {
  const selectedMedia = useStore((state) => state.selectedMedia);

  const headline = SOCIAL_MEDIA.find(
    (media) => media.value === selectedMedia,
  )?.label;

  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <Label htmlFor="link-social-media">Social media</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className="h-3.5 w-3.5" />
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-muted-foreground text-sm">
              Add icons linking to your social profiles, email and more.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <Dialog>
        <DialogTrigger
          id="link-social-media"
          className={`w-full cursor-pointer gap-x-1 ${buttonVariants({ variant: "outline" })}`}
        >
          <Plus className="size-4" strokeWidth={1.5} />
          Add icon
        </DialogTrigger>
        <DialogContent className="p-0 outline-none">
          <DialogHeader className="border-border absolute left-0 top-0 flex h-12 w-full items-center justify-center border-b p-3">
            <DialogTitle>
              {selectedMedia.length > 0
                ? `Add ${headline}`
                : "Add social media"}
            </DialogTitle>
          </DialogHeader>
          <main className="mt-12 overflow-hidden p-5">
            <section
              className={cn(
                selectedMedia.length === 0
                  ? "translate-x-0"
                  : "-translate-x-[110%]",
              )}
            >
              <MediaSelector />
            </section>
          </main>
        </DialogContent>
      </Dialog>
    </div>
  );
}
