'use client'

import { useEffect } from 'react'
import { loadFont } from '@/lib/utils/fonts'

interface Props {
  fontId: number
}

export default function FontLoader({ fontId }: Props) {
  useEffect(() => {
    loadFont(fontId)
  }, [fontId])

  return null
}
