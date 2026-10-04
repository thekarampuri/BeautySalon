# Phase 1: Database Planning & Supabase Architecture Specification

> **Project:** Mahalaxmi Beauty Salon & Academy  
> **Target System:** PostgreSQL on Supabase  
> **Document Purpose:** Complete audit findings, entity model, normalized database schema, Row Level Security (RLS) policies, server-side authentication plan, storage architecture, environment configuration, and migration roadmap.

---

## 1. Audit Findings & Blind Spot Analysis

A comprehensive inspection of the existing Next.js 14 codebase (`app/`, `components/`, `lib/`) revealed critical architectural gaps and assumptions that must be rectified during backend integration.

### Key Audit Discoveries & Technical Debt

1. **Lead Loss Risk (Public Forms Bypassing Database)**:
   - **Current State:** Forms on `/contact`, `/bridal`, `/admission`, and `BookingModal.tsx` construct a string and launch `https://wa.me/919175085070?text=...`. No data is saved to a server or state store.
   - **Risk:** If a user closes the tab, lacks WhatsApp, or experiences network disruption, the enquiry/booking is lost forever with zero admin visibility.
   - **Resolution:** Public forms must write to Supabase `enquiries` / `bookings` tables via API / Server Actions **before** or concurrently with triggering the WhatsApp link.

2. **Unauthenticated Admin Dashboard**:
   - **Current State:** `/admin` and all sub-routes (`/admin/enquiries`, `/admin/bookings`, `/admin/services`, etc.) render directly without authentication or session checks.
   - **Risk:** Anyone visiting `/admin` can read customer data and mock state.
   - **Resolution:** Implement server-side auth enforcement with Next.js Middleware + `@supabase/ssr` and Supabase Auth (`auth.users` + `profiles` RLS).

3. **Filesystem Coupling in Service Discovery**:
   - **Current State:** `lib/api/content.ts` dynamically scans `public/images/services/` subdirectories at runtime to synthesize `Service` objects with default zero prices (`price: 0`).
   - **Risk:** Hardcodes services to public static assets and prevents dynamic price/duration editing from `/admin/services`.
   - **Resolution:** Migrate service metadata and image URLs to the Supabase `services` table.

4. **Isolated Static Mock Data**:
   - **Current State:** All admin pages render hardcoded mock arrays from `lib/mock-data.ts`.
   - **Resolution:** Replace static mock data imports with Supabase queries while preserving frontend component prop types (`Service`, `Course`, `Enquiry`, `Booking`, `Invoice`, `Student`, `Testimonial`).

---

## 2. Identified Persistent Entities

| Entity | Supported in UI | Current Storage | Database Table | Key Attributes |
| :--- | :---: | :--- | :--- | :--- |
| **Services** | Yes | `mock-data.ts` & filesystem | `services` | Category, name, price, duration, description, image_url, active status |
| **Courses** | Yes | `mock-data.ts` | `courses`, `course_modules` | Title, duration, fees, eligibility, description, image_url, modules list |
| **Testimonials** | Yes | `mock-data.ts` | `testimonials` | Client name, rating (1-5), review text, initials, active status, order |
| **Gallery** | Yes | `mock-data.ts` | `gallery_images` | Image URL, category, featured flag, display order |
| **Enquiries** | Yes | `mock-data.ts` | `enquiries` | Name, mobile, type (Bridal/Admission/Contact), details, status, notes, metadata (JSONB) |
| **Bookings** | Yes | `mock-data.ts` | `bookings` | Customer name, mobile, service ID/name, date, time, status, notes |
| **Invoices** | Yes | `mock-data.ts` | `invoices`, `invoice_items` | Invoice no, customer name, mobile, total, status (Paid/Unpaid), date, line items |
| **Students** | Yes | `mock-data.ts` | `students`, `student_payments` | Name, mobile, email, course ID/name, batch, fees (total/paid), status |
| **Settings** | Yes | UI state (`admin/settings`) | `business_settings` | Business details, social links, working hours, maps embed, homepage banner |
| **Admin Users**| Future/Req | None | `profiles` | User ID (FK to `auth.users`), full name, role (`admin`) |

---

## 3. Normalized PostgreSQL Schema Specification

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Admin User Role Management)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. SERVICES (Salon & Spa Services + Makeup Packages)
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Hair', 'Skin', 'Makeup', 'Nail', 'Bridal', 'Spa')),
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price >= 0),
  duration TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. COURSES (Academy Offerings)
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  fees NUMERIC(10, 2) NOT NULL CHECK (fees >= 0),
  description TEXT NOT NULL DEFAULT '',
  eligibility TEXT NOT NULL DEFAULT 'Open to all',
  image_url TEXT NOT NULL DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. COURSE MODULES (1-to-Many with Courses)
CREATE TABLE public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_title TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TESTIMONIALS (Client Reviews)
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  initials TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. GALLERY IMAGES
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Bridal', 'Makeup', 'Hair', 'Salon', 'Students')),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. ENQUIRIES (Lead Capture for Contact, Bridal & Academy)
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('Bridal', 'Admission', 'Contact')),
  details TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Converted', 'Closed')),
  notes TEXT DEFAULT '',
  metadata JSONB DEFAULT '{}'::jsonb, -- Holds custom fields (wedding_date, venue, qualification, etc.)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. BOOKINGS (Service Appointments)
CREATE TABLE public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Confirmed', 'Pending', 'Completed', 'Cancelled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. INVOICES (Billing)
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_no TEXT UNIQUE NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
  status TEXT NOT NULL DEFAULT 'Unpaid' CHECK (status IN ('Paid', 'Unpaid')),
  invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. INVOICE ITEMS (Line Items for Invoices)
CREATE TABLE public.invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. STUDENTS (Academy Enrollment)
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT DEFAULT '',
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  course_name TEXT NOT NULL,
  batch TEXT NOT NULL,
  total_fees NUMERIC(10, 2) NOT NULL CHECK (total_fees >= 0),
  paid_fees NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (paid_fees >= 0),
  status TEXT NOT NULL DEFAULT 'Ongoing' CHECK (status IN ('Ongoing', 'Completed')),
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. STUDENT PAYMENTS (Fee Payment Transactions)
CREATE TABLE public.student_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_mode TEXT NOT NULL DEFAULT 'Cash' CHECK (payment_mode IN ('Cash', 'UPI', 'Card', 'Bank Transfer')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. BUSINESS SETTINGS (Key-Value CMS Configuration)
CREATE TABLE public.business_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Query Optimization
CREATE INDEX idx_services_category ON public.services(category);
CREATE INDEX idx_course_modules_course_id ON public.course_modules(course_id);
CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoice_items_invoice_id ON public.invoice_items(invoice_id);
CREATE INDEX idx_students_status ON public.students(status);
CREATE INDEX idx_student_payments_student_id ON public.student_payments(student_id);
```

---

## 4. Security & Access Model (Row Level Security)

All tables will have Row Level Security (RLS) enabled.

### Security Matrix

| Table | Anonymous Public Users | Authenticated Admins |
| :--- | :--- | :--- |
| `services` | `SELECT` (where `is_active = true`) | `ALL` (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) |
| `courses` | `SELECT` (where `is_active = true`) | `ALL` |
| `course_modules` | `SELECT` | `ALL` |
| `testimonials` | `SELECT` (where `is_published = true`) | `ALL` |
| `gallery_images` | `SELECT` | `ALL` |
| `business_settings` | `SELECT` | `ALL` |
| `enquiries` | `INSERT` (Lead creation only) | `ALL` |
| `bookings` | `INSERT` (Customer booking only) | `ALL` |
| `invoices` | NONE | `ALL` |
| `invoice_items` | NONE | `ALL` |
| `students` | NONE | `ALL` |
| `student_payments` | NONE | `ALL` |
| `profiles` | NONE | `SELECT` (Own profile), `ALL` if super admin |

### RLS Helper Function & Sample Policies

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- Helper Function to check if authenticated user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public Read Policies
CREATE POLICY "Public services read" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Public courses read" ON public.courses FOR SELECT USING (is_active = true);
CREATE POLICY "Public modules read" ON public.course_modules FOR SELECT USING (true);
CREATE POLICY "Public testimonials read" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public gallery read" ON public.gallery_images FOR SELECT USING (true);
CREATE POLICY "Public settings read" ON public.business_settings FOR SELECT USING (true);

-- Public Submit Policies (Lead Generation)
CREATE POLICY "Public insert enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert booking" ON public.bookings FOR INSERT WITH CHECK (true);

-- Admin Full Management Policies
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access courses" ON public.courses FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access course_modules" ON public.course_modules FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access gallery" ON public.gallery_images FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access bookings" ON public.bookings FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access invoices" ON public.invoices FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access invoice_items" ON public.invoice_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access students" ON public.students FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access student_payments" ON public.student_payments FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access settings" ON public.business_settings FOR ALL USING (public.is_admin());
```

---

## 5. Server-Side Admin Authorization Architecture

Relying on client-side state or hidden navigation buttons for admin protection is a critical security vulnerability. Admin security will be enforced at three distinct layers:

1. **Database Layer (Supabase RLS)**:
   - Queries sent with `anon` key without a valid JWT session for an admin user will return empty results or trigger 403 Forbidden errors when attempting restricted operations (`SELECT` invoices, `UPDATE` enquiries, etc.).
2. **Next.js Middleware Layer (`middleware.ts`)**:
   - Intercepts all requests matching `/admin/:path*`.
   - Uses `@supabase/ssr` to extract and validate the session cookie.
   - Unauthenticated or non-admin requests are immediately redirected to `/login` (or `/admin/login`).
3. **Next.js Server Component & Server Action Layer**:
   - Server-side data fetching creates a server client using `createClient()` with cookies.
   - Performs explicit checks on `user.id` and verifies `profiles.role === 'admin'`.

---

## 6. Mock Data Replacement & Contract Preservation Plan

To prevent UI regressions, Supabase database types will be mapped cleanly into existing TypeScript interfaces.

### Data Model Mapping

```typescript
// Example database mapper utility: lib/supabase/mappers.ts
import type { Service, Course, Enquiry, Booking } from '@/lib/mock-data';

export function mapDbServiceToFrontend(dbRow: any): Service {
  return {
    id: dbRow.id,
    name: dbRow.name,
    category: dbRow.category,
    price: Number(dbRow.price),
    duration: dbRow.duration,
    description: dbRow.description,
    image: dbRow.image_url || '/images/placeholder.jpg',
  };
}
```

### Migration of Pages
- **`app/services/page.tsx`**: Replace `getServices()` from filesystem with Supabase `SELECT * FROM services WHERE is_active = true ORDER BY display_order`.
- **`app/academy/page.tsx`**: Fetch from `courses` join `course_modules`.
- **`app/admin/*`**: Replace `mock-data.ts` static arrays with Supabase Server Action / Server Component queries.

---

## 7. Image Upload & Supabase Storage Strategy

### Bucket Setup: `beauty-salon-media`
- **Visibility:** Public (Read-only for all visitors).
- **Structure:**
  - `services/` (Service banner & card images)
  - `courses/` (Course promotional images)
  - `gallery/` (Portfolio and category images)
  - `students/` (Student avatars/photos)
  - `settings/` (Homepage banner assets)

### Storage Security Policies
- **Public Read (`SELECT`)**: `bucket_id = 'beauty-salon-media'` (Allowed for all users).
- **Admin Write (`INSERT`, `UPDATE`, `DELETE`)**: Restricted to authenticated users with `public.is_admin() = true`.

---

## 8. Environment Variables Specification

The following variables must be configured in `.env.local` (local development) and Vercel project environment variables (production).

```env
# Application URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Client Config (Safe for browser bundle)
NEXT_PUBLIC_SUPABASE_URL=https://rcjoacbewqdxklyetozq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Supabase Service Role Key (SERVER-ONLY: Seed scripts, migrations, admin tasks)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

> [!WARNING]
> `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security. It MUST NEVER be prefixed with `NEXT_PUBLIC_` or imported into client components.

---

## 9. Local Migration, Seed Data, and Handoff Strategy

### Local Supabase Setup Workflow
1. **Initialize Supabase CLI locally**:
   ```bash
   npx supabase init
   ```
2. **Generate Initial Schema Migration**:
   ```bash
   npx supabase migration new initial_schema
   ```
   Paste the SQL schema and RLS policies from Section 3 & 4 into `supabase/migrations/<timestamp>_initial_schema.sql`.

3. **Populate `supabase/seed.sql`**:
   Extract initial seed rows from `lib/mock-data.ts` (services, courses, modules, testimonials, gallery, initial settings).

4. **Upload Static Media to Storage**:
   Create a Node script (`scripts/seed-storage.ts`) using `@supabase/supabase-js` with `SUPABASE_SERVICE_ROLE_KEY` to upload local assets in `public/images/` to the `beauty-salon-media` bucket.

### Handoff Package for Akhil
When Phase 1 planning is approved and implementation begins:
- All database structure will be committed as version-controlled migration files in `supabase/migrations/`.
- Seed scripts and documentation will allow Akhil to run `npx supabase db push` or apply migrations directly to the live Supabase project.

---

## 10. Recommended Phase 1 Implementation Roadmap

1. **Step 1 (Package Setup & Supabase Client Utility)**: Install `@supabase/supabase-js` and `@supabase/ssr`. Create browser, server, and middleware Supabase client factories under `lib/supabase/`.
2. **Step 2 (Schema Migration & Seed Execution)**: Execute SQL migrations in Supabase SQL Editor / CLI and populate initial seed data.
3. **Step 3 (Storage Bucket Setup)**: Create `beauty-salon-media` bucket and configure RLS storage policies.
4. **Step 4 (Public Integration)**: Connect public pages (`/services`, `/academy`, `/contact`, `/bridal`, `/admission`, `BookingModal`) to read from Supabase and capture leads into DB before WhatsApp redirect.
5. **Step 5 (Admin Auth & Admin CRUD)**: Build `/login` page, configure Next.js Middleware admin route protection, and hook up `/admin/*` management pages to Supabase.
