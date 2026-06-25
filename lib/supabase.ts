import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

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

export async function insertLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{ ...lead, status: 'New' }])
    .select()
    .single()

  if (error) throw error
  return data as Lead
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
  const { error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) throw error
}
