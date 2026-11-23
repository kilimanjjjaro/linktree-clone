import { DEMO_TREE_VALUES } from '@/lib/constants/trees'
import type { TreeInterface } from '@/lib/types/trees'
import { TREE_ID, USER_ID } from '../constants/unit'

export function createTree(overrides: Partial<TreeInterface> = {}) {
  return {
    ...structuredClone(DEMO_TREE_VALUES),
    id: TREE_ID,
    authorId: USER_ID,
    ...overrides
  }
}

export function createLink(
  overrides: Partial<TreeInterface['links'][number]> = {}
) {
  return {
    ...structuredClone(DEMO_TREE_VALUES.links[0]),
    treeId: TREE_ID,
    ...overrides
  }
}

export function createSocialProfile(
  overrides: Partial<TreeInterface['socialProfiles'][number]> = {}
) {
  return {
    ...structuredClone(DEMO_TREE_VALUES.socialProfiles[0]),
    treeId: TREE_ID,
    ...overrides
  }
}
