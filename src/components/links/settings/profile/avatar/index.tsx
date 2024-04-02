"use client";

import { useState } from "react";
import DropAvatar from "@/components/links/settings/profile/avatar/drop-avatar";
import CropAvatar from "@/components/links/settings/profile/avatar/crop-avatar";
import Avatar from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store/store";

export default function LinkAvatar() {
  const avatar = useStore((state) => state.avatar);
  const avatarToCrop = useStore((state) => state.avatarToCrop);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex items-center gap-x-5 p-5">
      <Avatar className="size-20" src={avatar} alt="Gonzalo" />
      <div className="grid flex-1 grid-cols-2 gap-3">
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger
            className={`cursor-pointer ${buttonVariants({ variant: "secondary" })}`}
          >
            Upload
          </DialogTrigger>
          <DialogContent className="p-0 outline-none">
            <DialogHeader className="absolute left-0 top-0 flex h-12 w-full items-center justify-center border-b border-border p-3">
              <DialogTitle>Upload your avatar</DialogTitle>
            </DialogHeader>
            <main className="mt-12 p-5">
              {avatarToCrop.length === 0 ? (
                <DropAvatar />
              ) : (
                <CropAvatar setShowDialog={setShowDialog} />
              )}
            </main>
          </DialogContent>
        </Dialog>
        <Button variant="outline">Remove</Button>
      </div>
    </div>
  );
}
