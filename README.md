# Apartment Finder

A small full-stack rental platform: browse apartments, filter them, and apply. Landlords manage incoming applications in a password-protected admin pipeline.

**Live demo:** _add your Vercel link here_

## Features

- **Listings with filters.** Filter by city, maximum rent, and minimum bedrooms. Filters live in the URL, so any search can be shared.
- **Apply form.** Server-side validation, loading, error, and success states, built with a Server Action and `useActionState`.
- **Bilingual (English / Dutch).** Switch languages from the header on every page.
- **Admin pipeline (mini CRM).** Every application with its apartment, status counts, and a status update (`new → contacted → viewing → accepted/rejected`). Protected with a password.
- **JSON API.** `GET /api/apartments?city=Utrecht&maxRent=1600&minBedrooms=2`

## Tech stack

- **Next.js** (App Router) with **React** and **TypeScript**
- **Supabase** (Postgres): relational tables with a foreign key, check constraints, indexes, and Row Level Security
- **Vercel** for hosting and environment variables

## How it's built

| Area | Where |
|---|---|
| Database schema, security, seed data | `supabase/schema.sql` |
| Server-only Supabase client (secret key never reaches the browser) | `lib/supabase.ts` |
| Shared queries and filter parsing | `lib/apartments.ts` |
| Listings page | `app/page.tsx` |
| Apartment page and apply form | `app/apartments/[id]/` |
| Admin pipeline and status updates | `app/admin/` |
| JSON API route | `app/api/apartments/route.ts` |
| Admin password check | `proxy.ts` |
| English/Dutch translations | `lib/i18n.ts` |

## Run it locally

1. Create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
2. Copy `.env.example` to `.env.local` and fill in the values.
3. Run `npm install`, then `npm run dev`, then open http://localhost:3000.

## Author

Mayjhon Gabunada · [Portfolio](https://mgabunad.github.io/portfolio) · [GitHub](https://github.com/mgabunad)
