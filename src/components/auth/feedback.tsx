import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldAlert, ShieldCheck } from 'lucide-react'

interface Props {
  data: {
    error: string
    success: string
  }
}

export default function Feedback({ data }: Props) {
  const isError = data.error.length > 0
  const isSuccess = data.success.length > 0

  if (isError) {
    return (
      <Alert variant='error'>
        <ShieldAlert />
        <AlertDescription>{data.error}</AlertDescription>
      </Alert>
    )
  }

  if (isSuccess) {
    return (
      <Alert variant='success'>
        <ShieldCheck />
        <AlertDescription>{data.success}</AlertDescription>
      </Alert>
    )
  }
}
