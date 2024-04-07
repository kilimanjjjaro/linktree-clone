import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store/store'
import { createInputAttributes } from '@/lib/utils/create-input-attributes'
import { delay } from '@/lib/utils/delay'

interface Props {
  setShowDialog: (showDialog: boolean) => void
}

export default function SocialMediaOptions({ setShowDialog }: Props) {
  const selectedMedia = useStore((state) => state.selectedMedia)
  const setSelectedMedia = useStore((state) => state.setSelectedMedia)
  const linkMedia = useStore((state) => state.linkMedia)
  const setLinkMedia = useStore((state) => state.setLinkMedia)
  const setStep = useStore((state) => state.setStep)

  if (selectedMedia === null) return

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const form = event.target as HTMLFormElement
      const data = new FormData(form)
      const mediaValue = data.get('mediaValue') as string

      if (mediaValue === null) return

      const newLinkMedia = {
        id: selectedMedia.id,
        name: selectedMedia.name,
        slug: selectedMedia.slug,
        inputValue: mediaValue,
        link: selectedMedia.link
      }

      setLinkMedia([...linkMedia, newLinkMedia])
      setShowDialog(false)
      toast.success(`${newLinkMedia.name} icon added!`)
      void delay(200).then(() => {
        setStep(1)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const goPrevStep = () => {
    setStep(1)
    setSelectedMedia(null)
  }

  return (
    <form onSubmit={submitForm} className='mt-12 flex flex-col gap-y-3 p-5'>
      <Label htmlFor='media-input'>{selectedMedia?.form.label}</Label>
      <div className='flex h-10 items-center overflow-hidden rounded-xl border border-lt-light-gray'>
        {selectedMedia.form.disabledText.length > 0 && (
          <span className='flex h-full cursor-not-allowed select-none items-center border-r border-lt-light-gray px-3 text-sm text-lt-lightest-gray'>
            {selectedMedia?.form.disabledText}
          </span>
        )}
        <Input
          id='media-input'
          className='rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          name='mediaValue'
          placeholder={selectedMedia?.form.placeholder}
          required
          autoFocus
          {...createInputAttributes(selectedMedia.form.inputType)}
        />
      </div>
      <footer className='grid grid-cols-2 gap-x-3'>
        <Button type='submit' variant='secondary' className='order-2'>
          Save
        </Button>
        <Button variant='outline' className='order-1' onClick={goPrevStep}>
          Back
        </Button>
      </footer>
    </form>
  )
}
