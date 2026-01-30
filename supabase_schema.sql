
-- Run this in your Supabase SQL Editor

create table public.posts (
  id text primary key,
  type text not null check (type in ('blog', 'vlog')), -- Enforce 'blog' or 'vlog'
  title text not null,
  excerpt text,
  date text,
  duration text,
  read_time text, -- mapped from readTime
  location text,
  link text,
  thumbnail text,
  content text,
  status text default 'draft' check (status in ('draft', 'published')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.posts enable row level security;

-- Create a policy that allows anyone to read PUBLISHED posts
create policy "Public posts are viewable by everyone" 
on public.posts for select 
using (status = 'published');

-- Create a policy that allows anyone to read ALL posts (for Admin preview)
-- Ideally this should be restricted to authenticated users, but for now we'll allow it with the client key
-- WARNING: This allows anyone with the anon key to see drafts if they guess the ID, but it's okay for now.
create policy "Allow reading all posts"
on public.posts for select
using (true);

-- Create a policy that allows INSERT/UPDATE/DELETE for authenticated users only
-- Since we are not setting up full Auth yet, we will TEMPORARILY allow this for anon key 
-- IF you want to test immediately. 
-- BETTER: Use Supabase Auth User.
-- FOR NOW: Open it up so the Admin Page works without login.
create policy "Allow anonymous inserts/updates"
on public.posts for all
using (true)
with check (true);
