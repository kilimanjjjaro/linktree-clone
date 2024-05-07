import z from 'zod'

const SocialProfileSchema = z.object({
  id: z.string().cuid(),
  treeId: z.string().cuid(),
  type: z.number(),
  url: z.string().url(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

const LinkSchema = z.object({
  id: z.string().cuid(),
  treeId: z.string().cuid(),
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
  backgroundImage: z.string().url(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

const AppearanceSchema = z.object({
  background: z.object({
    type: z.number(),
    settings: z.object({
      steps: z.array(z.array(z.number())),
      angle: z.number()
    })
  }),
  font: z.number(),
  general: z.object({
    cornerStyle: z.number(),
    contentContainer: z.boolean()
  })
})

export const UpdateTreeSchema = z.object({
  id: z.string().cuid().optional(),
  authorId: z.string().cuid().optional(),
  status: z.number().optional(),
  name: z
    .string()
    .trim()
    .min(1, {
      message: 'Required field'
    })
    .max(40, {
      message: 'Maximum 40 chars'
    })
    .optional(),
  slug: z.string().trim().min(5).optional(),
  url: z.string().url().optional(),
  description: z
    .string()
    .min(1, {
      message: 'Required field'
    })
    .max(250, {
      message: 'Maximum 250 chars'
    })
    .optional(),
  avatar: z.string().url().optional(),
  socialProfiles: z.array(SocialProfileSchema).optional().optional(),
  links: z.array(LinkSchema).optional().optional(),
  appearance: AppearanceSchema.optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional()
})

export const AddLinkSchema = z.object({
  treeId: z.string().min(1),
  name: z.string().min(5),
  url: z.string().url(),
  featured: z.coerce.boolean(),
  image: z.string().url().nullable()
})
