import { INPUT_TYPES } from '@/lib/constants/globals'

export function createInputAttributes(inputType: number) {
  let attributes = {}

  if (inputType === INPUT_TYPES.TEXT) {
    attributes = {
      type: 'text',
      maxLength: 80
    }
  }

  if (inputType === INPUT_TYPES.TEL) {
    attributes = {
      type: 'tel',
      minLength: 7,
      maxLength: 20
    }
  }

  if (inputType === INPUT_TYPES.EMAIL) {
    attributes = {
      type: 'email'
    }
  }

  return attributes
}
