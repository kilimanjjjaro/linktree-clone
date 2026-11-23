import { expect, test } from './fixtures'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import {
  E2E_EMAIL,
  E2E_OTHER_PASSWORD,
  E2E_PASSWORD,
  LOCAL_TREE_KEY,
  LOCAL_TREE_NAME,
  LOCAL_TREE_URL,
  UNKNOWN_TREE_URL
} from '../constants/e2e'

const AUTH_PAGES = [
  { path: '/login', title: 'Log In', heading: 'Welcome back' },
  { path: '/signup', title: 'Sign Up', heading: 'Create an account' },
  {
    path: '/reset-password',
    title: 'Reset Password',
    heading: 'Reset password'
  },
  {
    path: '/new-password',
    title: 'New Password',
    heading: "We're almost done!"
  },
  {
    path: '/confirm-account',
    title: 'Confirm Account',
    heading: "We're almost done!"
  }
]

test('the editor shows the demo tree to guests', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle('Linktree Clone')
  await expect(
    page.getByText(DEMO_TREE_VALUES.name, { exact: true }).first()
  ).toBeVisible()
  await expect(page.getByRole('link', { name: 'Log In' }).first()).toBeVisible()
})

for (const { path, title, heading } of AUTH_PAGES) {
  test(`${path} renders its form`, async ({ page }) => {
    await page.goto(path)

    await expect(page).toHaveTitle(`${title} — Linktree Clone`)
    await expect(page.getByText(heading, { exact: true })).toBeVisible()
  })
}

test('pages that need a session redirect guests to log in', async ({
  page
}) => {
  await page.goto('/settings/account')

  await expect(page).toHaveURL('/login')
})

test('an unknown tree shows the not found page', async ({ page }) => {
  await page.goto(`/${UNKNOWN_TREE_URL}`)

  await expect(
    page.getByRole('heading', { name: 'Tree not found' })
  ).toBeVisible()
})

test('guests can preview the tree saved in their browser', async ({ page }) => {
  const tree = {
    ...DEMO_TREE_VALUES,
    name: LOCAL_TREE_NAME,
    url: LOCAL_TREE_URL
  }
  await page.addInitScript(
    ({ key, value }) => {
      localStorage.setItem(key, value)
    },
    { key: LOCAL_TREE_KEY, value: JSON.stringify(tree) }
  )

  await page.goto(`/${LOCAL_TREE_URL}`)

  await expect(
    page.getByRole('heading', { name: LOCAL_TREE_NAME })
  ).toBeVisible()
  for (const link of DEMO_TREE_VALUES.links) {
    await expect(page.getByText(link.name, { exact: true })).toBeVisible()
  }
})

test('logging in with an unknown email shows an error', async ({ page }) => {
  await page.goto('/login')

  await page.getByLabel('Email').fill(E2E_EMAIL)
  await page.getByLabel('Password').fill(E2E_PASSWORD)
  await page.getByRole('button', { name: 'Log In' }).click()

  await expect(page.getByText('User not found.')).toBeVisible()
  await expect(page.getByLabel('Email')).toHaveValue(E2E_EMAIL)
})

test.fail('signing up requires both passwords to match', async ({ page }) => {
  await page.goto('/signup')

  await page.getByLabel('Name', { exact: true }).fill(LOCAL_TREE_NAME)
  await page.getByLabel('Email', { exact: true }).fill(E2E_EMAIL)
  await page.getByLabel('Password', { exact: true }).fill(E2E_PASSWORD)
  await page.getByLabel('Confirm Password').fill(E2E_OTHER_PASSWORD)
  await page.getByRole('button', { name: 'Sign Up' }).click()

  await expect(page.getByText('Passwords must be equal.')).toBeVisible()
})

test.fail(
  'a new password requires both passwords to match',
  async ({ page }) => {
    await page.goto('/new-password')

    await page.getByLabel('Password', { exact: true }).fill(E2E_PASSWORD)
    await page.getByLabel('Confirm Password').fill(E2E_OTHER_PASSWORD)
    await page.getByRole('button', { name: 'Reset Password' }).click()

    await expect(page.getByText('Passwords must be equal.')).toBeVisible()
  }
)

test('a confirmation link without a token is invalid', async ({ page }) => {
  await page.goto('/confirm-account')

  await expect(page.getByText('Invalid link')).toBeVisible()
})
