import z from "zod"

export const AddLinkSchema = z.object({
  treeId: z.string(),
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Required field"
    })
    .max(40, {
      message: "Maximum 40 chars"
    }),
  url: z.string().url(),
  featured: z.boolean(),
  image: z.string().url().nullable()
})

export const UpdateTreeSchema = z.object({
  status: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(5, {
      message: "Minimum 5 chars"
    })
    .max(40, {
      message: "Maximum 40 chars"
    })
    .optional(),
  url: z
    .string()
    .trim()
    .min(5, {
      message: "Minimum 5 chars"
    })
    .max(50, {
      message: "Maximum 50 chars"
    })
    .optional(),
  description: z
    .string()
    .trim()
    .min(5, {
      message: "Minimum 5 chars"
    })
    .max(250, {
      message: "Maximum 250 chars"
    })
    .optional()
})
