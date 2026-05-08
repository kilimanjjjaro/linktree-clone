'use client'

import { useSyncExternalStore } from 'react'
import { notFound } from 'next/navigation'

import PublicTreeView from '@/components/trees/public/view'
import { type TreeInterface } from '@/lib/types/trees'

interface Props {
  treeUrl: string
}

const subscribe = () => () => {}
const getSnapshot = () => localStorage.getItem('__LOCAL_TREE__')
const getServerSnapshot = () => undefined

export default function LocalTreeFallback({ treeUrl }: Props) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  if (raw === undefined) return null

  let tree: TreeInterface | null = null

  try {
    if (raw !== null) {
      const parsed = JSON.parse(raw) as TreeInterface
      if (parsed.url === treeUrl) tree = parsed
    }
  } catch {}

  if (tree === null) notFound()

  return <PublicTreeView tree={tree} isPrivate />
}
