import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Props {
  variant: 'error' | 'success'
  headline: string
  text: string
}

export default function Feedback({ variant, headline, text }: Props) {
  if (variant === 'error') {
    return (
      <Alert variant='error' className='text-center'>
        <AlertTitle>{headline}</AlertTitle>
        <AlertDescription>{text}</AlertDescription>
      </Alert>
    )
  }

  if (variant === 'success') {
    return (
      <Alert variant='success' className='text-center'>
        <AlertTitle>{headline}</AlertTitle>
        <AlertDescription>{text}</AlertDescription>
      </Alert>
    )
  }
}
