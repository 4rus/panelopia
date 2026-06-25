-- Run this in your Supabase SQL editor to create the leads table

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
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.leads enable row level security;

-- Allow inserts from anonymous users (contact form)
create policy "Allow public inserts"
  on public.leads
  for insert
  to anon
  with check (true);

-- Only authenticated users (admins) can read/update
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
