import DescriptionInput from "@/components/trees/settings/description/input"
import { Label } from "@/components/ui/label"
import { HelpPopover } from "@/components/ui/help-popover"

export default function TreeDescription() {
  return (
    <section className="flex flex-col gap-y-3 p-5">
      <div className="flex items-center gap-x-2">
        <Label htmlFor="tree-description">Description</Label>
        <HelpPopover>
          Short description for your tree. This will be used in the header and
          to improve the SEO of your tree.
        </HelpPopover>
      </div>
      <DescriptionInput />
    </section>
  )
}
