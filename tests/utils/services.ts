import { vi } from 'vitest'

export const transporterMock = {
  sendMail: vi.fn()
}

export const cloudinaryMock = {
  uploader: {
    destroy: vi.fn(),
    upload: vi.fn(),
    upload_stream: vi.fn()
  }
}

export const revalidateTagMock = vi.fn()
