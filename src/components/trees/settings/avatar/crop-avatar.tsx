import { useCallback, useState } from 'react'
import Image from 'next/image'
import Cropper, { type Area } from 'react-easy-crop'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { CROPPED_AREA_VALUES } from '@/lib/constants/trees'
import { cropImage } from '@/lib/utils/crop-image'
import { fetchBlobData } from '@/lib/utils/fetch-blob-data'

interface Props {
  setShowDialog: (open: boolean) => void
}

export default function CropAvatar({ setShowDialog }: Props) {
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const setAvatarToCrop = useStore((state) => state.setAvatarToCrop)
  const setAvatar = useStore((state) => state.setAvatar)
  const [loading, setLoading] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAvatar, setCroppedAvatar] = useState('')
  const [croppedArea, setCroppedArea] = useState<Area>(CROPPED_AREA_VALUES)

  const onZoomChange = useCallback((value: [number]) => {
    setZoom(...value)
  }, [])

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }, [])

  const saveCrop = useCallback(async () => {
    if (avatarToCrop.length === 0) return

    try {
      const croppedImage = await cropImage(avatarToCrop, croppedArea)

      if (croppedImage.length > 0) setCroppedAvatar(croppedImage)
    } catch (error) {
      console.error(error)
    }
  }, [croppedArea, avatarToCrop])

  const uploadAvatar = useCallback(async () => {
    if (croppedAvatar.length === 0) return
    setLoading(true)

    try {
      const formData = new FormData()

      formData.append('file', await fetchBlobData(croppedAvatar))

      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Something happened uploading the image')
      }

      const data = await response.json()
      const avatar = data.eager[0].secure_url

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setAvatar(avatar)
      setShowDialog(false)
      toast.success('Your avatar was updated!')
    } catch (error) {
      toast.error('Something happened. Please try again!')
    } finally {
      setLoading(false)
      setCroppedAvatar('')
      setAvatarToCrop('')
    }
  }, [croppedAvatar, setAvatar, setAvatarToCrop, setShowDialog])

  const deleteAvatar = useCallback(() => {
    setCroppedAvatar('')
    setAvatarToCrop('')
  }, [setCroppedAvatar, setAvatarToCrop])

  return (
    <section className='flex flex-col gap-y-3'>
      <section className='relative aspect-square w-full overflow-hidden rounded-2xl bg-lt-dark-gray'>
        {avatarToCrop.length > 0 && croppedAvatar.length === 0 && (
          <>
            <Cropper
              image={avatarToCrop}
              crop={crop}
              zoom={zoom}
              zoomSpeed={0.1}
              aspect={1 / 1}
              cropShape='round'
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
            <div className='absolute inset-x-5 bottom-5'>
              <Slider
                aria-label='Zoom'
                defaultValue={[1]}
                value={[zoom]}
                min={1}
                max={2}
                step={0.01}
                onValueChange={onZoomChange}
              />
            </div>
          </>
        )}
        {croppedAvatar.length > 0 && (
          <div className='relative size-full overflow-hidden rounded-full border border-lt-light-gray/60'>
            <Image
              className='absolute h-auto w-full object-cover object-center'
              src={croppedAvatar}
              alt='Gonzalo'
              fill
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          </div>
        )}
      </section>
      <DialogFooter className='gap-3'>
        <Button variant='outline' onClick={deleteAvatar}>
          Delete
        </Button>
        {croppedAvatar.length === 0 ? (
          <Button variant='secondary' onClick={saveCrop}>
            Crop
          </Button>
        ) : (
          <Button variant='secondary' onClick={uploadAvatar} disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle
                  className='mr-2 size-4 animate-spin'
                  aria-hidden
                />
                Uploading
              </>
            ) : (
              'Upload'
            )}
          </Button>
        )}
      </DialogFooter>
    </section>
  )
}
