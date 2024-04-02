import { CircleHelp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LinkName() {
  return (
    <div className="flex flex-col gap-3 p-5">
      <div className="flex items-center gap-2">
        <Label htmlFor="link-name">Name</Label>
        <Popover>
          <PopoverTrigger>
            <CircleHelp className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="sr-only">Show help</span>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-sm text-muted-foreground">
              This will be used as the URL for your link and for SEO. You can
              change it as many times as you want.
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="group relative flex h-10 items-center overflow-hidden rounded-xl border border-border has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background">
        <span className="flex h-full cursor-not-allowed select-none items-center border-r border-border px-3 text-sm text-muted-foreground">
          linktr.ee/
        </span>
        <Input
          id="link-name"
          className="rounded-none border-none px-3 placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          type="text"
          placeholder="kilimanjjjaro"
        />
        <Button
          size="icon"
          variant="outline"
          className="absolute right-1.5 h-6 w-6 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
        >
          <Copy className="h-3 w-3" strokeWidth={1.5} />
          <span className="sr-only">Copy Order ID</span>
        </Button>
      </div>
    </div>
  );
}
