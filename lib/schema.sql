-- Run this in your Supabase SQL editor to create the leads + replies tables.

create table public.leads (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  city text check (city in ('Calgary', 'Edmonton')),
  product_interest text,
  project_type text,
  budget text,
  message text,
  status text default 'New' check (status in ('New', 'Contacted', 'Quoted', 'Won', 'Lost')),
  created_at timestamptz default now(),
  -- Set when the customer replies to a dashboard email, cleared when
  -- someone opens the lead in the dashboard. Drives the "unread" dot.
  needs_attention boolean not null default false
);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Allow inserts from anonymous users (contact form, visualizer quote form)
create policy "Allow public inserts"
  on public.leads
  for insert
  to anon
  with check (true);

-- Only authenticated users (the dashboard login) can read/update
create policy "Allow authenticated reads"
  on public.leads
  for select
  to authenticated
  using (true);

create policy "Allow authenticated updates"
  on public.leads
  for update
  to authenticated
  using (true);

-- Index for common queries
create index leads_status_idx on public.leads (status);
create index leads_city_idx on public.leads (city);
create index leads_created_at_idx on public.leads (created_at desc);

-- ── Replies ────────────────────────────────────────────────────────────
-- One row per reply sent to a lead from the dashboard. Kept even if the
-- outbound email fails to send, so there's always a record of what was
-- written and whether it actually went out.
create table public.lead_replies (
  id uuid default gen_random_uuid() primary key,
  lead_id uuid not null references public.leads (id) on delete cascade,
  message text not null,
  sent_by text,               -- email of the dashboard user, or the customer's address for inbound
  direction text not null default 'outbound' check (direction in ('outbound', 'inbound')),
  email_sent boolean default false,
  email_error text,           -- set if Resend returned an error
  created_at timestamptz default now()
);

alter table public.lead_replies enable row level security;

create policy "Allow authenticated reads on replies"
  on public.lead_replies
  for select
  to authenticated
  using (true);

create policy "Allow authenticated inserts on replies"
  on public.lead_replies
  for insert
  to authenticated
  with check (true);

-- No policy for inbound rows: the /api/leads/inbound webhook (Mailgun ->
-- our server) writes with the service role key, which bypasses RLS
-- entirely rather than needing to authenticate as a dashboard user.

create index lead_replies_lead_id_idx on public.lead_replies (lead_id);
