import { createBrowserClient } from '@supabase/ssr'

// Session-aware client for the dashboard and login page. Unlike the plain
// client in lib/supabase.ts, this one stores the auth session in cookies
// (via @supabase/ssr) instead of localStorage, so the server — middleware,
// route handlers, server components — can read the same session and
// enforce the "authenticated only" RLS policies on the leads/replies tables.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
  )
}
