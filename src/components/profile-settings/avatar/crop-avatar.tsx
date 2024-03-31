import { useCallback, useState } from 'react'
import Cropper, { Area } from 'react-easy-crop'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { useStore } from '@/lib/store/store'
import { cropImage } from '@/lib/utils/crop-image'
import { Avatar } from '@/components/ui/avatar'
import { fetchBlobData } from '@/lib/utils/fetchBlobData'

export default function CropAvatar() {
  const avatarToCrop = useStore((state) => state.avatarToCrop)
  const setAvatar = useStore((state) => state.setAvatar)
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

  const saveImage = useCallback(async () => {
    if (avatarToCrop === null) return

    try {
      const croppedImage = await cropImage(avatarToCrop, croppedArea)

      if (croppedImage === null) return

      setCroppedAvatar(croppedImage)
    } catch (error) {
      console.error(error)
    }
  }, [croppedArea, avatarToCrop])

  const uploadAvatar = async () => {
    if (croppedAvatar === null) return

    const formData = new FormData()

    formData.append('file', await fetchBlobData(croppedAvatar))

    const response = await fetch('/api/upload-avatar', {
      method: 'POST',
      body: formData
    })

    const avatar = await response.json()

    setAvatar(avatar)
  }

  return (
    <section className='flex flex-col gap-3'>
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
      <footer className='grid w-full grid-cols-2 gap-3'>
        <Button variant='outline'>Delete</Button>
        {croppedAvatar === null ? (
          <Button variant='secondary' onClick={saveImage}>
            Crop
          </Button>
        ) : (
          <Button variant='secondary' onClick={uploadAvatar}>
            Upload
          </Button>
        )}
      </footer>
    </section>
  )
}
