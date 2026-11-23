export function createFormData(values: Record<string, string>) {
  const formData = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value)
  })

  return formData
}
