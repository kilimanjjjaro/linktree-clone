import { describe, expect, it, vi } from 'vitest'
import { GMAIL_USER } from '../constants/unit'

const GMAIL_PASSWORD = 'app-password'
const GMAIL_HOST = 'smtp.gmail.com'
const SECURE_SMTP_PORT = 465

describe('transporter', () => {
  it('sends through gmail with the app password', async () => {
    vi.stubEnv('GMAIL_USER', GMAIL_USER)
    vi.stubEnv('GMAIL_APP_PASSWORD', GMAIL_PASSWORD)

    const { transporter } = await import('@/lib/email')
    const options = (transporter.transporter as unknown as { options: unknown })
      .options as {
      host: string
      port: number
      secure: boolean
      auth: { user: string; pass: string }
    }

    expect(options).toMatchObject({
      host: GMAIL_HOST,
      port: SECURE_SMTP_PORT,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_PASSWORD }
    })
  })
})
