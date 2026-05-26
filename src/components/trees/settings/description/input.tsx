"use client"

import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { ErrorTooltip } from "@/components/ui/error-tooltip"
import { useStore } from "@/lib/store/store-provider"
import { UpdateTreeSchema } from "@/lib/schemas/tree"
import { DEMO_TREE_VALUES } from "@/lib/constants/trees"

export default function DescriptionInput() {
  const selectedTree = useStore((state) => state.selectedTree)
  const setSelectedTree = useStore((state) => state.setSelectedTree)
  const [description, setDescription] = useState(selectedTree.description)
  const [prevTree, setPrevTree] = useState(selectedTree)
  const [errors, setErrors] = useState<string[]>([])

  if (selectedTree !== prevTree) {
    setPrevTree(selectedTree)
    if (selectedTree !== null) {
      setDescription(selectedTree.description)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedTree === null) return

    const value = event.target.value
    setDescription(value)
    setSelectedTree({ ...selectedTree, description: value })

    const validated = UpdateTreeSchema.safeParse({ description: value })
    setErrors(
      validated.success
        ? []
        : validated.error.issues.map((issue) => issue.message)
    )
  }

  return (
    <div className="relative flex">
      <Textarea
        id="tree-description"
        name="description"
        className="peer min-h-[86px] resize-none"
        value={description}
        onChange={handleChange}
        placeholder={DEMO_TREE_VALUES.description}
        aria-invalid={errors.length > 0}
        maxLength={120}
      />
      <span className="text-lt-lightest-gray pointer-events-none absolute right-3 bottom-2.5 text-[11px] leading-none select-none">
        {description.length}/120
      </span>
      <ErrorTooltip errors={errors} />
    </div>
  )
}
