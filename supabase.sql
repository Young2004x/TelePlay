-- TELEPLAY SUPABASE DATABASE
create extension if not exists pgcrypto;

create table if not exists public.movies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  year int,
  type text not null default 'Movie' check (type in ('Movie','Series')),
  genre text,
  rating numeric(3,1) default 0,
  quality text default '1080p',
  poster_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists movies_created_at_idx on public.movies(created_at desc);
create index if not exists movies_published_idx on public.movies(published);

-- Admin email is controlled by this table. Add your own auth user's UUID after creating the account.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.movies enable row level security;
alter table public.admin_users enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

drop policy if exists "public can read published movies" on public.movies;
create policy "public can read published movies" on public.movies
for select using (published = true or public.is_admin());

drop policy if exists "admins can insert movies" on public.movies;
create policy "admins can insert movies" on public.movies
for insert with check (public.is_admin());

drop policy if exists "admins can update movies" on public.movies;
create policy "admins can update movies" on public.movies
for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins can delete movies" on public.movies;
create policy "admins can delete movies" on public.movies
for delete using (public.is_admin());

-- IMPORTANT:
-- 1) Supabase Dashboard > Authentication > Users > create your admin user.
-- 2) Copy that user's UUID.
-- 3) Run: insert into public.admin_users(user_id) values ('YOUR-USER-UUID');
