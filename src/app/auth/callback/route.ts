import { NextResponse } from 'next/server'
import { createClient } from '@/lib/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code !== null) {
    const supabase = createClient()

    await supabase.auth.exchangeCodeForSession(code)
  }

  return NextResponse.redirect('/')
}
