import { describe, expect, it } from 'vitest'
import {
  LogInSchema,
  NewPasswordSchema,
  ResetPasswordSchema,
  SignUpSchema
} from '@/lib/schemas/auth'
import { AddLinkSchema, UpdateTreeSchema } from '@/lib/schemas/tree'
import {
  LINK_IMAGE_URL,
  LINK_URL,
  SHORT_PASSWORD,
  TREE_ID,
  USER_EMAIL,
  USER_NAME,
  USER_PASSWORD
} from '../constants/unit'

const MAX_LINK_NAME_LENGTH = 40
const MIN_TREE_TEXT_LENGTH = 5
const MAX_TREE_URL_LENGTH = 50
const MAX_TREE_DESCRIPTION_LENGTH = 250
const EXTRA_CHAR = 1

function firstIssue(result: {
  error?: { issues: Array<{ message: string }> }
}) {
  return result.error?.issues[0]?.message
}

describe('auth schemas', () => {
  it('requires a valid email and a password to log in', () => {
    expect(
      LogInSchema.safeParse({ email: USER_EMAIL, password: USER_PASSWORD })
        .success
    ).toBe(true)
    expect(
      firstIssue(
        LogInSchema.safeParse({ email: 'nope', password: USER_PASSWORD })
      )
    ).toBe('Email is required')
    expect(
      firstIssue(LogInSchema.safeParse({ email: USER_EMAIL, password: '' }))
    ).toBe('Password is required')
  })

  it('requires a name and passwords of at least 6 chars to sign up', () => {
    const valid = {
      name: USER_NAME,
      email: USER_EMAIL,
      password: USER_PASSWORD,
      confirmPassword: USER_PASSWORD
    }

    expect(SignUpSchema.safeParse(valid).success).toBe(true)
    expect(firstIssue(SignUpSchema.safeParse({ ...valid, name: '' }))).toBe(
      'Name is required'
    )
    expect(
      firstIssue(SignUpSchema.safeParse({ ...valid, password: SHORT_PASSWORD }))
    ).toBe('Minimum 6 characters required')
  })

  it('requires passwords of at least 6 chars to change the password', () => {
    expect(
      NewPasswordSchema.safeParse({
        password: USER_PASSWORD,
        confirmPassword: USER_PASSWORD
      }).success
    ).toBe(true)
    expect(
      NewPasswordSchema.safeParse({
        password: USER_PASSWORD,
        confirmPassword: SHORT_PASSWORD
      }).success
    ).toBe(false)
  })

  it('requires a valid email to reset the password', () => {
    expect(ResetPasswordSchema.safeParse({ email: USER_EMAIL }).success).toBe(
      true
    )
    expect(firstIssue(ResetPasswordSchema.safeParse({ email: '' }))).toBe(
      'Email is required'
    )
  })
})

describe('AddLinkSchema', () => {
  const link = {
    treeId: TREE_ID,
    name: 'Portfolio',
    url: LINK_URL,
    featured: true,
    image: LINK_IMAGE_URL
  }

  it('accepts a link and trims its name', () => {
    expect(AddLinkSchema.parse({ ...link, name: '  Portfolio  ' })).toEqual(
      link
    )
  })

  it('accepts a link without an image', () => {
    expect(AddLinkSchema.safeParse({ ...link, image: null }).success).toBe(true)
  })

  it('rejects empty and too long names', () => {
    expect(firstIssue(AddLinkSchema.safeParse({ ...link, name: '   ' }))).toBe(
      'Required field'
    )
    expect(
      firstIssue(
        AddLinkSchema.safeParse({
          ...link,
          name: 'a'.repeat(MAX_LINK_NAME_LENGTH + EXTRA_CHAR)
        })
      )
    ).toBe('Maximum 40 chars')
  })

  it('rejects invalid urls', () => {
    expect(AddLinkSchema.safeParse({ ...link, url: 'nope' }).success).toBe(
      false
    )
    expect(AddLinkSchema.safeParse({ ...link, image: 'nope' }).success).toBe(
      false
    )
  })
})

describe('UpdateTreeSchema', () => {
  it('accepts an empty update', () => {
    expect(UpdateTreeSchema.safeParse({}).success).toBe(true)
  })

  it.each(['name', 'url', 'description'])(
    'requires at least 5 chars in the %s',
    (field) => {
      expect(
        firstIssue(
          UpdateTreeSchema.safeParse({
            [field]: 'a'.repeat(MIN_TREE_TEXT_LENGTH - EXTRA_CHAR)
          })
        )
      ).toBe('Minimum 5 chars')
    }
  )

  it.each([
    { field: 'name', max: MAX_LINK_NAME_LENGTH },
    { field: 'url', max: MAX_TREE_URL_LENGTH },
    { field: 'description', max: MAX_TREE_DESCRIPTION_LENGTH }
  ])('allows at most $max chars in the $field', ({ field, max }) => {
    expect(
      UpdateTreeSchema.safeParse({ [field]: 'a'.repeat(max) }).success
    ).toBe(true)
    expect(
      UpdateTreeSchema.safeParse({ [field]: 'a'.repeat(max + EXTRA_CHAR) })
        .success
    ).toBe(false)
  })
})
