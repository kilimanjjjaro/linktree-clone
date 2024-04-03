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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
      <Label htmlFor='media-input'>{selectedMedia?.form.label}</Label>
      <div className='flex h-10 items-center overflow-hidden rounded-xl border border-border has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background'>
        {selectedMedia.form.disabledText.length > 0 && (
          <span className='flex h-full cursor-not-allowed select-none items-center border-r border-border px-3 text-sm text-muted-foreground'>
            {selectedMedia?.form.disabledText}
          </span>
        )}
        <Input
          id='media-input'
          className='rounded-none border-none px-3 focus-visible:ring-0 focus-visible:ring-offset-0'
          name='mediaValue'
          placeholder={selectedMedia?.form.placeholder}
          required
          {...createInputAttributes(selectedMedia.form.inputType)}
        />
      </div>
      <footer className='grid grid-cols-2 gap-3'>
        <Button variant='outline' onClick={goPrevStep}>
          Back
        </Button>
        <Button type='submit' variant='secondary'>
          Save
        </Button>
      </footer>
    </form>
  )
}
