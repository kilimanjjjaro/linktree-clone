export interface TreeInterface {
  id: number
  status: number
  name: string
  slug: string
  url: string
  description: string
  avatar: string
  socialMedia: Array<{
    id: number
    type: number
    url: string
  }>
  appearence: {
    background: {
      type: number
      settings: {
        steps: number[][]
        angle: number
      }
    }
    font: number
    general: {
      cornerStyle: number
      contentContainer: boolean
    }
  }
  links: Array<{
    id: number
    name: string
    url: string
    featured: boolean
    backgroundImage: string
  }>
}

export interface TreesStoreInterface {
  trees: TreeInterface[]
  setTrees: (trees: TreeInterface[]) => void
}
