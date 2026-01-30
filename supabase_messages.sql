-- Create messages table
create table public.messages (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  name text not null,
  email text not null,
  message text not null,
  constraint messages_pkey primary key (id)
) tablespace pg_default;

-- Enable RLS
alter table public.messages enable row level security;

-- Allow public access to insert messages
create policy "Allow public to insert messages"
on public.messages
for insert
to public
with check (true);

-- Allow admins (authenticated users) to view messages
create policy "Allow admins to view messages"
on public.messages
for select
to authenticated
using (true);
