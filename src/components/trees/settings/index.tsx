import TreeAvatar from "@/components/trees/settings/avatar"
import TreeName from "@/components/trees/settings/name"
import TreeUrl from "@/components/trees/settings/url"
import TreeDescription from "@/components/trees/settings/description"
import TreeSocialProfiles from "@/components/trees/settings/social-profiles"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils/cn"

export default async function TreeSettings({
  className
}: {
  className?: string
}) {
  return (
    <aside
      className={cn(
        "border-lt-light-gray/60 bg-lt-gray relative flex max-h-[calc(100dvh-100px)] w-85 flex-col rounded-2xl border",
        className
      )}
    >
      <h2 className="sticky top-0 flex h-12 shrink-0 items-center justify-center px-4 text-lg leading-none">
        Settings
      </h2>
      <Separator />
      <ScrollArea className="h-screen" scrollHideDelay={0}>
        <TreeAvatar />
        <Separator />
        <TreeName />
        <Separator />
        <TreeUrl />
        <Separator />
        <TreeDescription />
        <Separator />
        <TreeSocialProfiles />
      </ScrollArea>
    </aside>
  )
}
