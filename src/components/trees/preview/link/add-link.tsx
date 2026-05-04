'use client'

import { useRef, useState } from 'react'
import { Globe, ImageIcon, LoaderCircle, Plus, Upload, X } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useStore } from '@/lib/store/store-provider'
import useLinks from '@/lib/hooks/useLinks'
import { updateLinkImage } from '@/lib/actions/trees/update-link-image'
import { extractLinkImage } from '@/lib/actions/trees/extract-link-image'
import { deleteCloudinaryAsset } from '@/lib/actions/trees/delete-cloudinary-asset'
import { isUserUploadedAsset } from '@/lib/utils/cloudinary'

export default function AddLink() {
  const selectedTree = useStore((state) => state.selectedTree)
  const selectedLink = useStore((state) => state.selectedLink)
  const setSelectedLink = useStore((state) => state.setSelectedLink)
  const showAddLinkDialog = useStore((state) => state.showAddLinkDialog)
  const setShowAddLinkDialog = useStore((state) => state.setShowAddLinkDialog)
  const { addLink } = useLinks()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState(selectedLink?.url ?? '')
  const [featured, setFeatured] = useState(selectedLink?.featured ?? false)
  const [imageUrl, setImageUrl] = useState<string | null>(
    selectedLink?.image ?? null
  )
  const [isUploading, setIsUploading] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const isBusy = isUploading || isExtracting

  const replaceImage = (nextUrl: string) => {
    if (imageUrl !== null && isUserUploadedAsset(imageUrl)) {
      void deleteCloudinaryAsset(imageUrl)
    }

    setImageUrl(nextUrl)
  }

  const removeImage = () => {
    if (imageUrl !== null && isUserUploadedAsset(imageUrl)) {
      void deleteCloudinaryAsset(imageUrl)
    }

    setImageUrl(null)
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const response = await updateLinkImage(formData)

    if (response !== null) {
      replaceImage(response.secure_url)
    } else {
      toast.error('Something went wrong uploading the image. Please try again.')
    }

    setIsUploading(false)
    event.target.value = ''
  }

  const handleExtract = async () => {
    if (url.trim() === '') {
      toast.error('Enter a URL first.')
      return
    }

    setIsExtracting(true)

    const response = await extractLinkImage(url)

    if (response !== null) {
      replaceImage(response.secure_url)
    } else {
      toast.error('Could not extract the image from the site.')
    }

    setIsExtracting(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (selectedTree === null) return
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const newLink = {
      treeId: selectedTree.id,
      name: formData.get('name') as string,
      url: formData.get('url') as string,
      featured,
      image: featured ? imageUrl : null
    }

    const response = await addLink(newLink)

    if (response !== null) {
      setShowAddLinkDialog(false)
      setSelectedLink(null)
    }
  }

  const isSubmitDisabled = isBusy || (featured && imageUrl === null)

  return (
    <Dialog
      open={showAddLinkDialog}
      onOpenChange={(value) => {
        setShowAddLinkDialog(value)
        setSelectedLink(null)
      }}
    >
      <DialogTrigger asChild>
        <Button size='sm'>
          Add link <Plus className='size-3.5' aria-hidden />
        </Button>
      </DialogTrigger>
      <DialogContent className='p-0'>
        <DialogHeader>
          <DialogTitle>Add link</DialogTitle>
        </DialogHeader>
        <main className='mt-12 flex gap-5 p-5'>
          <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-5'>
            <div className='flex flex-col gap-y-3'>
              <Label htmlFor='link-name'>Name</Label>
              <Input
                type='text'
                id='link-name'
                name='name'
                defaultValue={selectedLink?.name}
                placeholder='Example link'
                required
                autoFocus
              />
            </div>
            <div className='flex flex-col gap-y-3'>
              <Label htmlFor='link-url'>URL</Label>
              <Input
                type='url'
                id='link-url'
                name='url'
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder='https://www.example.com/'
                required
              />
            </div>
            <div className='border-lt-light-gray/60 flex items-center gap-x-3 rounded-2xl border p-5'>
              <div className='flex flex-col gap-y-1.5'>
                <Label htmlFor='featured-link'>Featured link</Label>
                <p className='text-lt-lightest-gray text-sm text-balance'>
                  Displayed with a background image. Upload your own or extract
                  it from the site.
                </p>
              </div>
              <Switch
                id='featured-link'
                checked={featured}
                onCheckedChange={setFeatured}
              />
            </div>
            {featured && (
              <div className='flex flex-col gap-y-3'>
                <Label>Image</Label>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleFileChange}
                />
                <div
                  className='border-lt-light-gray/60 relative aspect-video w-full overflow-hidden rounded-2xl border bg-cover bg-center'
                  style={
                    imageUrl !== null
                      ? { backgroundImage: `url(${imageUrl})` }
                      : undefined
                  }
                >
                  {imageUrl === null && !isBusy && (
                    <div className='text-lt-lightest-gray flex size-full items-center justify-center'>
                      <ImageIcon className='size-8' aria-hidden />
                    </div>
                  )}
                  {isBusy && (
                    <div className='text-lt-lightest-gray bg-lt-black/60 absolute inset-0 flex items-center justify-center'>
                      <LoaderCircle
                        className='size-6 animate-spin'
                        aria-hidden
                      />
                    </div>
                  )}
                  {imageUrl !== null && !isBusy && (
                    <button
                      type='button'
                      aria-label='Remove image'
                      onClick={removeImage}
                      className='text-lt-white absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-full bg-red-500 transition-colors xl:hover:bg-red-600'
                    >
                      <X className='size-4' aria-hidden strokeWidth={2.5} />
                    </button>
                  )}
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <Button
                    type='button'
                    variant='secondary'
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isBusy}
                  >
                    Upload
                    <Upload className='size-4' aria-hidden />
                  </Button>
                  <Button
                    type='button'
                    variant='secondary'
                    onClick={handleExtract}
                    disabled={isBusy || url.trim() === ''}
                  >
                    Extract
                    <Globe className='size-4' aria-hidden />
                  </Button>
                </div>
              </div>
            )}
            <Button
              type='submit'
              className='w-full'
              disabled={isSubmitDisabled}
            >
              {selectedLink !== null ? 'Update' : 'Add'}
            </Button>
          </form>
        </main>
      </DialogContent>
    </Dialog>
  )
}
