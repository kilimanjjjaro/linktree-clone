"use client"

import { useState } from "react"
import slugify from "@sindresorhus/slugify"
import { toast } from "sonner"
import { Copy } from "lucide-react"

import { ErrorTooltip } from "@/components/ui/error-tooltip"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HelpPopover } from "@/components/ui/help-popover"
import { useStore } from "@/lib/store/store-provider"
import { UpdateTreeSchema } from "@/lib/schemas/tree"
import { BASE_URL } from "@/lib/constants/globals"

export default function TreeUrl() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [treeUrl, setTreeUrl] = useState(selectedTree.url)
  const [prevTree, setPrevTree] = useState(selectedTree)
  const [errors, setErrors] = useState<string[]>([])

  if (selectedTree !== prevTree) {
    setPrevTree(selectedTree)
    if (selectedTree !== null) {
      setTreeUrl(selectedTree.url)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedTree === null) return

    const value = event.target.value
    setTreeUrl(value)

    const slugified = slugify(value)
    setSelectedTree({ ...selectedTree, url: slugified })

    const validated = UpdateTreeSchema.safeParse({ url: slugified })
    setErrors(
      validated.success
        ? []
        : validated.error.issues.map((issue) => issue.message)
    )
  }

  const handleBlur = () => {
    setTreeUrl(slugify(treeUrl))
  }

  const copyUrl = () => {
    if (selectedTree === null) return

    navigator.clipboard
      .writeText(`${BASE_URL}/${selectedTree.url}`)
      .then(() => {
        toast.success("Url copied. Go and share it!")
      })
      .catch(() => {
        toast.error("Something went wrong.")
      })
  }

  return (
    <section className="flex flex-col gap-y-3 p-5">
      <div className="flex items-center gap-x-2">
        <Label htmlFor="tree-url">URL</Label>
        <HelpPopover>
          This will be used as the URL and for SEO of your tree. You can change
          it as many times as you want.
        </HelpPopover>
      </div>
      <div className="border-lt-light-gray/60 ring-lt-white ring-offset-lt-gray relative flex h-10 items-center rounded-full border ring-offset-2 has-[:focus-visible]:ring-2 has-[input[aria-invalid=true]]:ring-2 has-[input[aria-invalid=true]]:ring-red-500">
        <span className="border-lt-light-gray/60 text-lt-lightest-gray flex h-full cursor-not-allowed items-center border-r px-3 text-sm select-none">
          linktr.ee/
        </span>
        <Input
          id="tree-url"
          type="text"
          name="url"
          className="peer overflow-hidden rounded-full rounded-l-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:ring-0"
          value={treeUrl}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={errors.length > 0}
        />
        <ErrorTooltip errors={errors} />
      </div>
      <Button onClick={copyUrl}>
        Copy
        <Copy className="size-3.5" aria-hidden />
      </Button>
    </section>
  )
}
