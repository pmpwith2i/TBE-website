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
