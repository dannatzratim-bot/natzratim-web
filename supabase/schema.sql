-- Comunidad Natzratim
-- Esquema base para Supabase

create extension if not exists pgcrypto;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  username text not null unique,
  full_name text not null,
  email text not null unique,
  role_id uuid not null references public.roles(id) on delete restrict,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.article_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.video_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  featured_image_url text,
  featured_image_alt text,
  category_id uuid references public.article_categories(id) on delete set null,
  author_id uuid references public.users(id) on delete set null,
  author_name text not null default 'Comunidad Natzratim',
  published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  reading_time_minutes integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  youtube_url text not null,
  youtube_id text not null,
  thumbnail_url text,
  category_id uuid references public.video_categories(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  content jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content jsonb not null default '[]'::jsonb,
  event_date date not null,
  start_time time,
  end_time time,
  location text,
  location_label text,
  category text not null default 'Evento',
  published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.donations_info (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  body text not null,
  bank_name text,
  bank_account text,
  bank_alias text,
  bank_swift text,
  qr_code_url text,
  donation_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text not null,
  tagline text not null,
  welcome_text text not null,
  logo_url text not null,
  banner_image_url text not null,
  hero_title text not null,
  hero_description text not null,
  contact_whatsapp text not null,
  contact_email text not null,
  contact_phone text,
  address text,
  facebook_url text,
  instagram_url text,
  youtube_url text,
  youtube_channel text,
  primary_color text,
  accent_color text,
  support_cta text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_role_slug()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select r.slug
  from public.users u
  join public.roles r on r.id = u.role_id
  where u.auth_user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role_slug() in ('admin', 'super_admin'), false);
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role_slug() = 'super_admin', false);
$$;

create or replace function public.lookup_email_by_username(username_input text)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select email
  from public.users
  where lower(username) = lower(username_input)
  limit 1;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_roles_updated_at'
  ) then
    create trigger set_roles_updated_at
    before update on public.roles
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_users_updated_at'
  ) then
    create trigger set_users_updated_at
    before update on public.users
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_article_categories_updated_at'
  ) then
    create trigger set_article_categories_updated_at
    before update on public.article_categories
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_video_categories_updated_at'
  ) then
    create trigger set_video_categories_updated_at
    before update on public.video_categories
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_articles_updated_at'
  ) then
    create trigger set_articles_updated_at
    before update on public.articles
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_videos_updated_at'
  ) then
    create trigger set_videos_updated_at
    before update on public.videos
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_events_updated_at'
  ) then
    create trigger set_events_updated_at
    before update on public.events
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_contact_messages_updated_at'
  ) then
    create trigger set_contact_messages_updated_at
    before update on public.contact_messages
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_donations_info_updated_at'
  ) then
    create trigger set_donations_info_updated_at
    before update on public.donations_info
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_site_settings_updated_at'
  ) then
    create trigger set_site_settings_updated_at
    before update on public.site_settings
    for each row execute function public.set_updated_at();
  end if;
end;
$$;

alter table public.roles enable row level security;
alter table public.users enable row level security;
alter table public.article_categories enable row level security;
alter table public.video_categories enable row level security;
alter table public.articles enable row level security;
alter table public.videos enable row level security;
alter table public.events enable row level security;
alter table public.contact_messages enable row level security;
alter table public.donations_info enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "Public can read roles" on public.roles;
create policy "Public can read roles"
on public.roles
for select
to authenticated
using (true);

drop policy if exists "Admins can read users" on public.users;
create policy "Admins can read users"
on public.users
for select
to authenticated
using (public.is_admin());

drop policy if exists "Super admins manage users" on public.users;
create policy "Super admins manage users"
on public.users
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "Anyone can read article categories" on public.article_categories;
create policy "Anyone can read article categories"
on public.article_categories
for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage article categories" on public.article_categories;
create policy "Admins manage article categories"
on public.article_categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can read video categories" on public.video_categories;
create policy "Anyone can read video categories"
on public.video_categories
for select
to anon, authenticated
using (true);

drop policy if exists "Admins manage video categories" on public.video_categories;
create policy "Admins manage video categories"
on public.video_categories
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published articles" on public.articles;
create policy "Public can read published articles"
on public.articles
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "Admins manage articles" on public.articles;
create policy "Admins manage articles"
on public.articles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published videos" on public.videos;
create policy "Public can read published videos"
on public.videos
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "Admins manage videos" on public.videos;
create policy "Admins manage videos"
on public.videos
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read published events" on public.events;
create policy "Public can read published events"
on public.events
for select
to anon, authenticated
using (published = true or public.is_admin());

drop policy if exists "Admins manage events" on public.events;
create policy "Admins manage events"
on public.events
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Anyone can insert contact messages" on public.contact_messages;
create policy "Anyone can insert contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Admins read contact messages" on public.contact_messages;
create policy "Admins read contact messages"
on public.contact_messages
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins update contact messages" on public.contact_messages;
create policy "Admins update contact messages"
on public.contact_messages
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Public can read donations" on public.donations_info;
create policy "Public can read donations"
on public.donations_info
for select
to anon, authenticated
using (true);

drop policy if exists "Super admins manage donations" on public.donations_info;
create policy "Super admins manage donations"
on public.donations_info
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

drop policy if exists "Public can read site settings" on public.site_settings;
create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "Super admins manage site settings" on public.site_settings;
create policy "Super admins manage site settings"
on public.site_settings
for all
to authenticated
using (public.is_super_admin())
with check (public.is_super_admin());

grant usage on schema public to anon, authenticated;
grant execute on function public.lookup_email_by_username(text) to anon, authenticated;
grant execute on function public.current_role_slug() to authenticated;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_super_admin() to authenticated;

grant select on public.roles to authenticated;
grant select on public.users to authenticated;
grant select on public.article_categories to anon, authenticated;
grant select on public.video_categories to anon, authenticated;
grant select on public.articles to anon, authenticated;
grant select on public.videos to anon, authenticated;
grant select on public.events to anon, authenticated;
grant select on public.contact_messages to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select on public.donations_info to anon, authenticated;
grant select on public.site_settings to anon, authenticated;
