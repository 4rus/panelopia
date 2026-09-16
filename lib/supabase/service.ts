import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Service-role client — bypasses Row Level Security entirely. Only ever
// use this from trusted server code that has already verified the caller
// some other way (e.g. the Mailgun signature check in
// app/api/leads/inbound/route.ts). Never import this into a client
// component or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured.')
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
