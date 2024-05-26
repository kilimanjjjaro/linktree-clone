import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStore } from '@/lib/store/store'
import useSocialProfiles from '@/lib/hooks/useSocialProfiles'
import { delay } from '@/lib/utils/delay'
import { createInputAttributes } from '@/lib/utils/create-input-attributes'

interface Props {
  closeDialog: () => void
}

export default function SocialProfileSettings({ closeDialog }: Props) {
  const { saveProfiles } = useSocialProfiles()
  const setStep = useStore((state) => state.setStep)
  const selectedTree = useStore((state) => state.selectedTree)
  const selectedSocialProfile = useStore((state) => state.selectedSocialProfile)
  const setSelectedSocialProfile = useStore(
    (state) => state.setSelectedSocialProfile
  )

  if (selectedSocialProfile === null) return

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    if (selectedTree === null) return
    event.preventDefault()

    try {
      const form = event.target as HTMLFormElement
      const formData = new FormData(form)
      const socialProfileValue = formData.get('socialProfileValue') as string

      if (socialProfileValue === '') return

      await saveProfiles({
        treeId: selectedTree.id,
        type: selectedSocialProfile.type,
        url: socialProfileValue,
        name: selectedSocialProfile.name
      })

      closeDialog()
      void delay(200).then(() => {
        setStep(1)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const goPrevStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    setStep(1)
    setSelectedSocialProfile(null)
  }

  const existingSocialProfile = selectedTree?.socialProfiles.find(
    (profile) => profile.type === selectedSocialProfile.type
  )

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
          defaultValue={existingSocialProfile?.url ?? undefined}
          required
          autoFocus
          {...createInputAttributes(selectedSocialProfile.form.inputType)}
        />
      </div>
      <footer className='grid grid-cols-2 gap-x-3'>
        <Button type='submit' variant='secondary' className='order-2'>
          {existingSocialProfile !== undefined ? 'Update' : 'Add'}
        </Button>
        <Button
          variant='outline'
          className='order-1'
          onClick={(event) => {
            goPrevStep(event)
          }}
        >
          Back
        </Button>
      </footer>
    </form>
  )
}
