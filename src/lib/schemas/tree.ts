import z from 'zod'

// const SocialProfileSchema = z.object({
//   id: z.string().cuid(),
//   treeId: z.string().cuid(),
//   type: z.number(),
//   url: z.string().url(),
//   createdAt: z.string().datetime(),
//   updatedAt: z.string().datetime()
// })

export const AddLinkSchema = z.object({
  treeId: z.string(),
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'Required field'
    })
    .max(40, {
      message: 'Maximum 40 chars'
    }),
  url: z.string().url(),
  featured: z.boolean(),
  image: z.string().url().nullable()
})

// const AppearanceSchema = z.object({
//   background: z.object({
//     type: z.number(),
//     settings: z.object({
//       steps: z.array(z.array(z.number())),
//       angle: z.number()
//     })
//   }),
//   font: z.number(),
//   general: z.object({
//     cornerStyle: z.number(),
//     contentContainer: z.boolean()
//   })
// })

export const UpdateTreeSchema = z.object({
  status: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(5, {
      message: 'Minimum 5 chars'
    })
    .max(40, {
      message: 'Maximum 40 chars'
    })
    .optional(),
  url: z
    .string()
    .trim()
    .min(5, {
      message: 'Minimum 5 chars'
    })
    .max(50, {
      message: 'Maximum 50 chars'
    })
    .optional(),
  description: z
    .string()
    .trim()
    .min(5, {
      message: 'Minimum 5 chars'
    })
    .max(250, {
      message: 'Maximum 250 chars'
    })
    .optional()
})
