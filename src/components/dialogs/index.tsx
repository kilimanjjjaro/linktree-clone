import SaveTreeDialog from '@/components/dialogs/save-tree'
import AddSocialProfilesDialog from '@/components/dialogs/add-social-profiles'
import UploadAvatar from '@/components/dialogs/upload-avatar'
import AddLink from '@/components/dialogs/add-link'

export default function Dialogs() {
  return (
    <>
      <SaveTreeDialog />
      <UploadAvatar />
      <AddSocialProfilesDialog />
      <AddLink />
    </>
  )
}
