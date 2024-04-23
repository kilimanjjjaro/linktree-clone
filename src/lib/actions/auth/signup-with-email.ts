'use server'

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password')
  }

  const response = await fetch('http://localhost:3000/api/edge', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rawData)
  })

  const data = await response.json()

  console.log('signUpAction: ', data)

  return data
}
