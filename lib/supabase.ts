import { createClient } from '@supabase/supabase-js'

// Falls back to a placeholder so the client can always be constructed —
// without real env vars, calls will fail over the network (callers already
// handle that) instead of throwing at import time and crashing every page
// that references this module.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are not set — see .env.local.example. Supabase calls will fail until configured.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Types ──────────────────────────────────────────────────────────────────────

export type Lead = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  city: 'Calgary' | 'Edmonton'
  product_interest: string | null
  project_type: string | null
  budget: string | null
  message: string | null
  status: 'New' | 'Contacted' | 'Quoted' | 'Won' | 'Lost'
  created_at: string
  needs_attention: boolean
}

// ── Queries ────────────────────────────────────────────────────────────────────

export async function getLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Lead[]
}

export async function insertLead(lead: Omit<Lead, 'id' | 'created_at' | 'status' | 'needs_attention'>) {
  // Deliberately no .select() here — the anon role (public contact form,
  // visualizer quote form) only has INSERT on this table, not SELECT
  // (see lib/schema.sql). Chaining .select() makes Supabase try to read
  // the row back to return it, which anon isn't allowed to do and fails
  // with a 401 even though the insert itself succeeded. Neither caller
  // uses the returned row, so we just confirm there was no error.
  const { error } = await supabase
    .from('leads')
    .insert([{ ...lead, status: 'New' }])

  if (error) throw error
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}
