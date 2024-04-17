import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  if (
    process.env.PUBLIC_SUPABASE_URL === undefined ||
    process.env.PUBLIC_SUPABASE_ANON_KEY === undefined
  ) {
    throw new Error('Invalid environment variables')
  }

  return createBrowserClient(
    process.env.PUBLIC_SUPABASE_URL,
    process.env.PUBLIC_SUPABASE_ANON_KEY
  )
}
