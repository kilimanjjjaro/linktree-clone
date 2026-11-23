import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react'
import DropAvatar from '@/components/trees/settings/avatar/drop-avatar'
import CropAvatar from '@/components/trees/settings/avatar/crop-avatar'
import { StoreProvider } from '@/lib/store/store-provider'

vi.mock('@/lib/actions/trees/update-avatar', () => ({ updateAvatar: vi.fn() }))
vi.mock('@/lib/actions/trees/delete-cloudinary-asset', () => ({
  deleteCloudinaryAsset: vi.fn()
}))

const BLOB_URL = 'blob:http://localhost/avatar'

function createFile(name: string, type: string) {
  return new File(['image'], name, { type })
}

async function flushPromises() {
  await new Promise((resolve) => setTimeout(resolve, 0))
}

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

function selectFiles(files: File[]) {
  const input = document.querySelector('input[type="file"]')

  if (input === null) throw new Error('Missing file input')

  fireEvent.change(input, { target: { files } })
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', ResizeObserverMock)
  URL.createObjectURL = vi.fn(() => BLOB_URL)
  URL.revokeObjectURL = vi.fn()
})

afterEach(() => {
  cleanup()
})

describe('DropAvatar', () => {
  it('only accepts a single png or jpeg image', () => {
    render(<DropAvatar setAvatarToCrop={vi.fn()} />)

    const input = document.querySelector('input[type="file"]')

    expect(input).toHaveProperty('multiple', false)
    expect(input?.getAttribute('accept')).toBe(
      'image/png,.png,image/jpeg,.jpeg'
    )
  })

  it.each([
    { name: 'avatar.png', type: 'image/png' },
    { name: 'avatar.jpeg', type: 'image/jpeg' },
    { name: 'avatar.jpg', type: 'image/jpeg' }
  ])('crops the selected $name', async ({ name, type }) => {
    const setAvatarToCrop = vi.fn()
    render(<DropAvatar setAvatarToCrop={setAvatarToCrop} />)

    selectFiles([createFile(name, type)])

    await waitFor(() => {
      expect(setAvatarToCrop).toHaveBeenCalledWith(BLOB_URL)
    })
  })

  it('ignores files that are not images', async () => {
    const setAvatarToCrop = vi.fn()
    render(<DropAvatar setAvatarToCrop={setAvatarToCrop} />)

    selectFiles([createFile('avatar.pdf', 'application/pdf')])
    await act(flushPromises)

    expect(URL.createObjectURL).not.toHaveBeenCalled()
    expect(setAvatarToCrop).not.toHaveBeenCalled()
  })

  it('shows the upload instructions', () => {
    render(<DropAvatar setAvatarToCrop={vi.fn()} />)

    expect(
      screen.getByText(
        'Click to select your image or drag-and-drop here to upload it.'
      )
    ).toBeDefined()
  })
})

describe('CropAvatar', () => {
  function renderCropAvatar(avatarToCrop: string) {
    return render(
      <StoreProvider>
        <CropAvatar
          closeDialog={vi.fn()}
          avatarToCrop={avatarToCrop}
          setAvatarToCrop={vi.fn()}
        />
      </StoreProvider>
    )
  }

  it('shows the image to crop with a zoom slider', () => {
    renderCropAvatar(BLOB_URL)

    const image = document.querySelector('img')

    expect(image?.getAttribute('src')).toBe(BLOB_URL)
    expect(screen.getByLabelText('Zoom')).toBeDefined()
    expect(screen.getByRole('slider')).toBeDefined()
  })

  it('shows nothing to crop without an image', () => {
    renderCropAvatar('')

    expect(document.querySelector('img')).toBeNull()
    expect(screen.queryByRole('slider')).toBeNull()
  })
})
