create extension if not exists pgcrypto;

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_slug text not null,
  event_title text not null,
  event_date_label text not null,
  first_name text not null,
  last_name text not null,
  phone text not null,
  email text not null,
  tipologia_iscrizione text,
  percorso text,
  mezzo text,
  societa text,
  custom_fields jsonb not null default '{}'::jsonb,
  privacy_accepted boolean not null default false
);

alter table public.event_registrations enable row level security;

revoke all on public.event_registrations from anon, authenticated;
grant insert on public.event_registrations to anon, authenticated;

drop policy if exists event_registrations_public_insert
  on public.event_registrations;

create policy event_registrations_public_insert
  on public.event_registrations
  for insert
  to anon, authenticated
  with check (
    privacy_accepted is true
  );

create index if not exists event_registrations_event_slug_idx
  on public.event_registrations (event_slug);

create index if not exists event_registrations_created_at_idx
  on public.event_registrations (created_at desc);

comment on table public.event_registrations is
  'Pre-iscrizioni evento inviate dal sito Teramo Bike Experience.';

create or replace function public.get_event_registration_by_id(lookup_id uuid)
returns table (
  id uuid,
  created_at timestamptz,
  event_slug text,
  event_title text,
  event_date_label text,
  first_name text,
  last_name text,
  phone text,
  email text,
  tipologia_iscrizione text,
  percorso text,
  mezzo text,
  societa text,
  custom_fields jsonb,
  privacy_accepted boolean
)
language sql
security definer
set search_path = public
as $$
  select
    event_registrations.id,
    event_registrations.created_at,
    event_registrations.event_slug,
    event_registrations.event_title,
    event_registrations.event_date_label,
    event_registrations.first_name,
    event_registrations.last_name,
    event_registrations.phone,
    event_registrations.email,
    event_registrations.tipologia_iscrizione,
    event_registrations.percorso,
    event_registrations.mezzo,
    event_registrations.societa,
    event_registrations.custom_fields,
    event_registrations.privacy_accepted
  from public.event_registrations
  where event_registrations.id = lookup_id
  limit 1;
$$;

revoke all on function public.get_event_registration_by_id(uuid) from public;
grant execute on function public.get_event_registration_by_id(uuid) to anon, authenticated;
