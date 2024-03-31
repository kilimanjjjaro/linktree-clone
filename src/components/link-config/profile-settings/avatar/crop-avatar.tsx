import { useCallback, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { DialogFooter } from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store'
import { cropImage } from '@/lib/utils/crop-image'
import { fetchBlobData } from '@/lib/utils/fetchBlobData'

interface Props {
  setOpen: (open: boolean) => void
}

export default function CropAvatar({ setOpen }: Props) {
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const setAvatarToCrop = useStore((state) => state.setAvatarToCrop)
  const setAvatar = useStore((state) => state.setAvatar)
  const [loading, setLoading] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAvatar, setCroppedAvatar] = useState<string | null>(null)
  const [croppedArea, setCroppedArea] = useState<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0
  })

  const onZoomChange = useCallback((value: [number]) => setZoom(...value), [])
  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }, [])

  const saveCrop = useCallback(async () => {
    if (avatarToCrop === null) return

    try {
      const croppedImage = await cropImage(avatarToCrop, croppedArea)

      if (croppedImage === null) return

      setCroppedAvatar(croppedImage)
    } catch (error) {
      console.error(error)
    }
  }, [croppedArea, avatarToCrop])

  const uploadAvatar = useCallback(async () => {
    if (croppedAvatar === null) return
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

      setAvatar(avatar)
      setOpen(false)
      toast.success('Link avatar updated!')
    } catch (error) {
      toast.error('Something happened. Please try again!')
    } finally {
      setLoading(false)
      setCroppedAvatar(null)
      setAvatarToCrop(null)
    }
  }, [croppedAvatar, setAvatar, setAvatarToCrop, setOpen])

  const deleteAvatar = useCallback(() => {
    setCroppedAvatar(null)
    setAvatarToCrop(null)
  }, [setCroppedAvatar, setAvatarToCrop])

  return (
    <section className='mt-[49px] flex flex-col gap-3'>
      <section className='relative aspect-square w-full overflow-hidden rounded-xl bg-border'>
        {avatarToCrop !== null && croppedAvatar === null && (
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
            <div className='absolute bottom-5 left-5 right-5'>
              <Slider
                aria-labelledby='Zoom'
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
        {croppedAvatar !== null && (
          <Avatar className='size-full' src={croppedAvatar} alt='Gonzalo' />
        )}
      </section>
      <DialogFooter className='gap-x-3 *:w-full'>
        <Button variant='outline' onClick={deleteAvatar}>
          Delete
        </Button>
        {croppedAvatar === null ? (
          <Button variant='secondary' onClick={saveCrop}>
            Crop
          </Button>
        ) : (
          <Button variant='secondary' onClick={uploadAvatar} disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
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
