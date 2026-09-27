-- Apartment Finder: database setup
-- Paste this whole file into Supabase → SQL Editor → New query → Run.

-- 1. Tables ---------------------------------------------------------------

create table if not exists public.apartments (
  id          bigint generated always as identity primary key,
  title       text        not null,
  city        text        not null,
  rent        integer     not null check (rent > 0),
  bedrooms    integer     not null check (bedrooms >= 0),
  size_m2     integer     not null check (size_m2 > 0),
  description text        not null,
  image_url   text,
  created_at  timestamptz not null default now()
);

create table if not exists public.applications (
  id           bigint generated always as identity primary key,
  apartment_id bigint      not null references public.apartments(id) on delete cascade,
  full_name    text        not null,
  email        text        not null,
  message      text        not null,
  status       text        not null default 'new'
               check (status in ('new', 'contacted', 'viewing', 'accepted', 'rejected')),
  created_at   timestamptz not null default now()
);

create index if not exists applications_apartment_id_idx on public.applications (apartment_id);
create index if not exists apartments_city_rent_idx on public.apartments (city, rent);

-- 2. Security -------------------------------------------------------------
-- Row Level Security is ON with no public policies, so the public
-- (publishable/anon) key cannot read or write anything. The app talks to the
-- database only from the server, using the secret key.

alter table public.apartments   enable row level security;
alter table public.applications enable row level security;

-- 3. Sample data ----------------------------------------------------------

insert into public.apartments (title, city, rent, bedrooms, size_m2, description, image_url) values
('Bright canal-side studio', 'Amsterdam', 1450, 1, 38,
 'Cosy studio with large windows overlooking the canal. Walking distance to Centraal Station, furnished, available from next month.',
 'https://picsum.photos/seed/ams-studio/800/500'),
('Family apartment near Vondelpark', 'Amsterdam', 2350, 3, 95,
 'Spacious three-bedroom apartment with a balcony, two minutes from Vondelpark. Ideal for families or house-sharers.',
 'https://picsum.photos/seed/ams-family/800/500'),
('Modern loft in the city centre', 'Rotterdam', 1650, 2, 72,
 'Industrial-style loft with high ceilings, open kitchen, and a view of the Erasmus Bridge. Parking available.',
 'https://picsum.photos/seed/rtm-loft/800/500'),
('Compact student room', 'Rotterdam', 650, 1, 18,
 'Private room in a shared house close to Erasmus University. Shared kitchen and bathroom, bills included.',
 'https://picsum.photos/seed/rtm-student/800/500'),
('Quiet apartment with garden', 'Utrecht', 1550, 2, 68,
 'Ground-floor apartment with a private garden in a quiet street, 10 minutes by bike from the Dom Tower.',
 'https://picsum.photos/seed/utr-garden/800/500'),
('Penthouse with rooftop terrace', 'The Hague', 2900, 3, 120,
 'Luxury penthouse with a 40 m² rooftop terrace and views towards the sea. Two bathrooms and underfloor heating.',
 'https://picsum.photos/seed/dh-penthouse/800/500'),
('Renovated one-bedroom', 'Utrecht', 1250, 1, 45,
 'Freshly renovated apartment with a new kitchen and bathroom, near Utrecht Centraal. Unfurnished.',
 'https://picsum.photos/seed/utr-onebed/800/500'),
('Townhouse near the beach', 'The Hague', 2100, 4, 130,
 'Four-bedroom townhouse five minutes from Scheveningen beach. Small garden and bike storage.',
 'https://picsum.photos/seed/dh-townhouse/800/500');
