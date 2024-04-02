"use client";

import { CircleHelp } from "lucide-react";
import SocialMediaList from "./list";
import SocialMediaDialog from "./dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SocialMedia() {
  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <Label htmlFor="link-social-media">Social media</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className="h-3.5 w-3.5" />
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-muted-foreground">
              Add icons linking to your social profiles, email and more.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <SocialMediaList />
      <SocialMediaDialog />
    </div>
  );
}
