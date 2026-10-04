# Local Database Migration & Validation Guide

> **Project:** Mahalaxmi Beauty Salon & Academy  
> **Supabase Configuration & Migrations**

---

## Overview

This repository contains version-controlled database migrations and seed data for Supabase located in the `supabase/` directory:

- `supabase/config.toml` — Supabase CLI configuration.
- `supabase/migrations/20261004000000_initial_schema.sql` — Schema definition, indexes, triggers, and Row Level Security (RLS) policies.
- `supabase/seed.sql` — Deterministic synthetic seed data for local testing.

---

## How to Apply Migrations

### Method A: Using Supabase CLI (Recommended)

1. **Start Local Supabase Stack**:
   ```bash
   npx supabase start
   ```
   *This starts local PostgreSQL, Auth, Storage, and Studio services.*

2. **Apply Database Migrations**:
   ```bash
   npx supabase db reset
   ```
   *`db reset` clears local database, applies all files in `supabase/migrations/`, and executes `supabase/seed.sql` automatically.*

3. **Push Migrations to Hosted Supabase Project (Akhil / Deployment)**:
   ```bash
   # Link to hosted project first
   npx supabase link --project-ref <YOUR_SUPABASE_PROJECT_REF>

   # Push pending migrations to hosted project
   npx supabase db push
   ```

---

### Method B: Via Supabase Dashboard (SQL Editor)

If running Supabase CLI locally is unavailable or restricted:

1. Open your Supabase Dashboard: `https://supabase.com/dashboard/project/<project-ref>/sql/new`
2. Open [`supabase/migrations/20261004000000_initial_schema.sql`](file:///d:/Rajat/Projects/Mahalaxmi/BeautySalon/supabase/migrations/20261004000000_initial_schema.sql) in your code editor.
3. Copy the entire file contents, paste into the SQL Editor, and click **Run**.
4. Open [`supabase/seed.sql`](file:///d:/Rajat/Projects/Mahalaxmi/BeautySalon/supabase/seed.sql), paste into SQL Editor, and click **Run**.

---

## Security Verification Checklist

After applying migrations, verify the following security safeguards:

1. **Profiles RLS (No Self-Assigned Admins)**:
   - Default role on user signup via `handle_new_user()` trigger is `'staff'`.
   - Public/authenticated users cannot update the `role` column on `profiles`.

2. **Customer & Financial Privacy**:
   - `enquiries`, `bookings`, `invoices`, `invoice_items`, `students`, and `student_payments` tables are denied to `anon` (public) for `SELECT`.
   - `anon` users can only perform `INSERT` on `enquiries` (status='New') and `bookings` (status='Pending'/'Confirmed').

3. **Admin Authorization**:
   - Only authenticated users with `role = 'admin'` in `profiles` return `true` from `public.is_admin()` and gain access to restricted endpoints.

---

## Storage Bucket Configuration

Create a public bucket named `beauty-salon-media` in Supabase Storage with the following RLS rules:

- **Public Read (`SELECT`)**: `bucket_id = 'beauty-salon-media'`
- **Admin Management (`INSERT`, `UPDATE`, `DELETE`)**: `public.is_admin() = true`
