-- Run this in your Supabase SQL editor AFTER the original lib/schema.sql.
-- Adds support for capturing the customer's reply back into a lead's thread.

-- Which side sent a given reply row.
alter table public.lead_replies
  add column direction text not null default 'outbound'
    check (direction in ('outbound', 'inbound'));

-- Set when a customer replies, cleared when someone opens that lead in the
-- dashboard — drives the "unread" dot on the lead card.
alter table public.leads
  add column needs_attention boolean not null default false;

-- The inbound webhook (app/api/leads/inbound/route.ts) runs with the
-- service role key, which bypasses RLS entirely, so no new policy is
-- needed for it to insert here or flip needs_attention on leads.
