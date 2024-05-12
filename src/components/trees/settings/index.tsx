import TreeAvatar from '@/components/trees/settings/avatar'
import TreeName from '@/components/trees/settings/name'
import TreeUrl from '@/components/trees/settings/url'
import TreeDescription from '@/components/trees/settings/description'
import TreeSocialProfiles from '@/components/trees/settings/social-profiles'
import TreeStatus from '@/components/trees/settings/status'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/services/get-current-user'
import { getCachedTree } from '@/lib/services/get-cached-tree'
import { DEMO_TREE_VALUES } from '@/lib/constants/trees'

interface Props {
  slug: string | undefined
}

export default async function TreeSettings({ slug }: Props) {
  const user = await getCurrentUser()
  let tree = await getCachedTree(slug, user?.id)

  if (tree === null) tree = DEMO_TREE_VALUES

  return (
    <aside className='flex w-[340px] flex-col rounded-2xl border border-lt-light-gray/60 bg-lt-gray'>
      <h2 className='flex h-12 items-center justify-center px-4 text-lg leading-none'>
        Settings
      </h2>
      <Separator />
      <TreeAvatar />
      <Separator />
      <TreeName tree={tree} />
      <Separator />
      <TreeUrl />
      <Separator />
      <TreeDescription />
      <Separator />
      <TreeSocialProfiles />
      <Separator />
      <TreeStatus />
    </aside>
  )
}
