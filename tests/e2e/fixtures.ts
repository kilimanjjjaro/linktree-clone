import { test as base, expect } from '@playwright/test'
import { IGNORED_ERROR_URLS } from '../constants/e2e'

function isIgnored(url: string) {
  return IGNORED_ERROR_URLS.some((ignored) => url.includes(ignored))
}

export const test = base.extend<{ browserErrors: string[] }>({
  browserErrors: [
    async ({ page }, use) => {
      const errors: string[] = []

      page.on('console', (message) => {
        const { url } = message.location()
        if (message.type() !== 'error' || isIgnored(url)) return
        errors.push(`${message.text()} ${url}`)
      })
      page.on('pageerror', (error) => {
        errors.push(`Uncaught: ${error.message}`)
      })

      await use(errors)

      expect(errors).toEqual([])
    },
    { auto: true }
  ]
})

export { expect }
