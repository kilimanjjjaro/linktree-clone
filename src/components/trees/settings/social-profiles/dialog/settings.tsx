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

export default function SocialProfileSettings({ setShowDialog }: Props) {
  const socialProfiles = useStore((state) => state.socialProfiles)
  const setSocialProfiles = useStore((state) => state.setSocialProfiles)
  const selectedSocialProfile = useStore((state) => state.selectedSocialProfile)
  const setSelectedSocialProfile = useStore(
    (state) => state.setSelectedSocialProfile
  )
  const setStep = useStore((state) => state.setStep)

  if (selectedSocialProfile === null) return

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)
      const socialProfileValue = formData.get('socialProfileValue') as string

      if (socialProfileValue === '') return

      const newSocialProfile = {
        id: selectedSocialProfile.id,
        name: selectedSocialProfile.name,
        slug: selectedSocialProfile.slug,
        inputValue: socialProfileValue,
        link: selectedSocialProfile.link
      }

      setSocialProfiles([...socialProfiles, newSocialProfile])
      setShowDialog(false)
      toast.success(`${newSocialProfile.name} icon added!`)
      void delay(200).then(() => {
        setStep(1)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const goPrevStep = () => {
    setStep(1)
    setSelectedSocialProfile(null)
  }

  return (
    <form onSubmit={submitForm} className='mt-12 flex flex-col gap-y-3 p-5'>
      <Label htmlFor='social-profile-input'>
        {selectedSocialProfile?.form.label}
      </Label>
      <div className='flex h-10 items-center overflow-hidden rounded-full border border-lt-light-gray/60'>
        {selectedSocialProfile.form.disabledText.length > 0 && (
          <span className='flex h-full cursor-not-allowed select-none items-center border-r border-lt-light-gray/60 px-3 text-sm text-lt-lightest-gray'>
            {selectedSocialProfile?.form.disabledText}
          </span>
        )}
        <Input
          id='social-profile-input'
          className='rounded-none border-none focus-visible:ring-0 focus-visible:ring-offset-0'
          name='socialProfileValue'
          placeholder={selectedSocialProfile?.form.placeholder}
          required
          autoFocus
          {...createInputAttributes(selectedSocialProfile.form.inputType)}
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
