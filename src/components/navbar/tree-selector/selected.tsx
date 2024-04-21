import { fetchTrees } from '@/lib/services/fetchTrees'

export default async function SelectedTree() {
  const trees = await fetchTrees()

  return <>{trees[0].name}</>
}
