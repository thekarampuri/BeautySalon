-- Migration: 20261004000000_initial_schema.sql
-- Description: Complete CMS Data Model, Media Library, Business Operations, Audit Logs, and Hardened RLS Policies for BeautySalon

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. UTILITY FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public, pg_temp;

-- ============================================================================
-- 2. TABLE DEFINITIONS (Idempotent with IF NOT EXISTS)
-- ============================================================================

-- PROFILES (Admin & Staff user details linked to Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- MEDIA ASSETS (Centralized Media Library for images & documents)
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL UNIQUE,
  public_url TEXT NOT NULL,
  file_size INT NOT NULL DEFAULT 0,
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  alt_text TEXT DEFAULT '',
  caption TEXT DEFAULT '',
  folder TEXT NOT NULL DEFAULT 'general' CHECK (folder IN ('services', 'courses', 'gallery', 'students', 'banners', 'cms', 'general')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SITE PAGES (CMS Pages: Home, About, Contact, Bridal, Academy, Services, Gallery, Testimonials, Makeup)
CREATE TABLE IF NOT EXISTS public.site_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  meta_keywords TEXT DEFAULT '',
  og_image_url TEXT DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SITE PAGE SECTIONS (CMS Page Sections: Hero, About Intro, Features, Banners, CTA)
CREATE TABLE IF NOT EXISTS public.site_page_sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES public.site_pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  title TEXT DEFAULT '',
  subtitle TEXT DEFAULT '',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT unique_page_section UNIQUE (page_id, section_key)
);

-- SITE NAVIGATION (Header & Footer Menu Items)
CREATE TABLE IF NOT EXISTS public.site_navigation (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_type TEXT NOT NULL DEFAULT 'header' CHECK (menu_type IN ('header', 'footer', 'quick_links')),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  target TEXT NOT NULL DEFAULT '_self',
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ANNOUNCEMENTS (Promotional Top Banners)
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message TEXT NOT NULL,
  link_url TEXT DEFAULT '',
  link_text TEXT DEFAULT '',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- OFFERS (Promotions & Discount Packages)
CREATE TABLE IF NOT EXISTS public.offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  code TEXT DEFAULT '',
  discount_percentage NUMERIC(5,2) DEFAULT 0 CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
  discount_amount NUMERIC(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
  description TEXT DEFAULT '',
  banner_image_url TEXT DEFAULT '',
  media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
  valid_from DATE,
  valid_until DATE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SERVICES (Hair, Skin, Makeup, Spa, Nail, Bridal Services)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Hair', 'Skin', 'Makeup', 'Nail', 'Bridal', 'Spa')),
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price >= 0),
  duration TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COURSES (Academy Training Courses)
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  fees NUMERIC(10, 2) NOT NULL CHECK (fees >= 0),
  description TEXT NOT NULL DEFAULT '',
  eligibility TEXT NOT NULL DEFAULT 'Open to all',
  image_url TEXT NOT NULL DEFAULT '',
  media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- COURSE MODULES (1-to-Many Curriculum Modules for Courses)
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  module_title TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ACADEMY BATCHES (Batches for Courses)
CREATE TABLE IF NOT EXISTS public.academy_batches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  batch_name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  seats_capacity INT NOT NULL DEFAULT 15,
  status TEXT NOT NULL DEFAULT 'Upcoming' CHECK (status IN ('Upcoming', 'Ongoing', 'Completed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- TESTIMONIALS (Client Reviews)
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  initials TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GALLERY IMAGES (Portfolio and Showcase Images)
CREATE TABLE IF NOT EXISTS public.gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  caption TEXT DEFAULT '',
  alt_text TEXT DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('Bridal', 'Makeup', 'Hair', 'Salon', 'Students')),
  media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ENQUIRIES (Lead Capture for Contact, Bridal & Academy)
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('Bridal', 'Admission', 'Contact')),
  details TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Converted', 'Closed')),
  notes TEXT DEFAULT '',
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BOOKINGS (Appointment Bookings)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  service_name TEXT NOT NULL,
  price_snapshot NUMERIC(10, 2) DEFAULT 0.00,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Confirmed', 'Pending', 'Completed', 'Cancelled')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- INVOICES (Billing Records)
CREATE TABLE IF NOT EXISTS public.invoices (
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

-- INVOICE ITEMS (Individual Line Items per Invoice)
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- STUDENTS (Enrolled Academy Students)
CREATE TABLE IF NOT EXISTS public.students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT DEFAULT '',
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  course_name TEXT NOT NULL,
  batch_id UUID REFERENCES public.academy_batches(id) ON DELETE SET NULL,
  batch TEXT NOT NULL,
  total_fees NUMERIC(10, 2) NOT NULL CHECK (total_fees >= 0),
  paid_fees NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (paid_fees >= 0),
  status TEXT NOT NULL DEFAULT 'Ongoing' CHECK (status IN ('Ongoing', 'Completed')),
  photo_url TEXT DEFAULT '',
  media_id UUID REFERENCES public.media_assets(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- STUDENT PAYMENTS (Fee Payment Ledger)
CREATE TABLE IF NOT EXISTS public.student_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_mode TEXT NOT NULL DEFAULT 'Cash' CHECK (payment_mode IN ('Cash', 'UPI', 'Card', 'Bank Transfer')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- BUSINESS SETTINGS (Key-Value Configuration for CMS/Contact/Hours)
CREATE TABLE IF NOT EXISTS public.business_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AUDIT LOGS (System Change Tracking)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT DEFAULT '',
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT DEFAULT '',
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- 3. INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON public.media_assets(folder);
CREATE INDEX IF NOT EXISTS idx_site_pages_slug ON public.site_pages(slug);
CREATE INDEX IF NOT EXISTS idx_site_page_sections_page ON public.site_page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_courses_is_active ON public.courses(is_active);
CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON public.course_modules(course_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_published ON public.testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_gallery_images_category ON public.gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON public.enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON public.invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_students_status ON public.students(status);
CREATE INDEX IF NOT EXISTS idx_student_payments_student_id ON public.student_payments(student_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ============================================================================
-- 4. UPDATED_AT TRIGGERS
-- ============================================================================

DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_media_assets_updated_at ON public.media_assets;
CREATE TRIGGER trg_media_assets_updated_at BEFORE UPDATE ON public.media_assets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_site_pages_updated_at ON public.site_pages;
CREATE TRIGGER trg_site_pages_updated_at BEFORE UPDATE ON public.site_pages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_site_page_sections_updated_at ON public.site_page_sections;
CREATE TRIGGER trg_site_page_sections_updated_at BEFORE UPDATE ON public.site_page_sections FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_services_updated_at ON public.services;
CREATE TRIGGER trg_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_courses_updated_at ON public.courses;
CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_enquiries_updated_at ON public.enquiries;
CREATE TRIGGER trg_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_bookings_updated_at ON public.bookings;
CREATE TRIGGER trg_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_invoices_updated_at ON public.invoices;
CREATE TRIGGER trg_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_students_updated_at ON public.students;
CREATE TRIGGER trg_students_updated_at BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_business_settings_updated_at ON public.business_settings;
CREATE TRIGGER trg_business_settings_updated_at BEFORE UPDATE ON public.business_settings FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 5. AUTHENTICATION & SECURITY HELPER FUNCTIONS
-- ============================================================================

-- Security Helper: Check if current authenticated user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Safeguard Trigger Function: Prevent non-admins from promoting role to 'admin'
CREATE OR REPLACE FUNCTION public.prevent_profile_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'Security error: Only administrators can modify user roles.';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

DROP TRIGGER IF EXISTS trg_prevent_profile_role_escalation ON public.profiles;
CREATE TRIGGER trg_prevent_profile_role_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_profile_role_escalation();

-- Auth Trigger Function: Auto-create profile on Auth signup with SAFE default role ('staff')
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'User'),
    'staff' -- SAFE SECURITY DEFAULT: NEVER default to 'admin'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

-- Attach trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES & HARDENED SAFEGUARDS
-- ============================================================================

-- Enable RLS on ALL tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_navigation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- PROFILES POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Profiles read policy" ON public.profiles;
CREATE POLICY "Profiles read policy" ON public.profiles
  FOR SELECT USING (public.is_admin() OR id = auth.uid());

DROP POLICY IF EXISTS "Profiles self update policy" ON public.profiles;
CREATE POLICY "Profiles self update policy" ON public.profiles
  FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());

DROP POLICY IF EXISTS "Admin update profiles policy" ON public.profiles;
CREATE POLICY "Admin update profiles policy" ON public.profiles FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Admin delete profiles policy" ON public.profiles;
CREATE POLICY "Admin delete profiles policy" ON public.profiles FOR DELETE USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- MEDIA & CMS PUBLIC READ POLICIES
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public media select" ON public.media_assets;
CREATE POLICY "Public media select" ON public.media_assets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public pages select" ON public.site_pages;
CREATE POLICY "Public pages select" ON public.site_pages FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Public sections select" ON public.site_page_sections;
CREATE POLICY "Public sections select" ON public.site_page_sections FOR SELECT USING (is_visible = true OR public.is_admin());

DROP POLICY IF EXISTS "Public navigation select" ON public.site_navigation;
CREATE POLICY "Public navigation select" ON public.site_navigation FOR SELECT USING (is_visible = true OR public.is_admin());

DROP POLICY IF EXISTS "Public announcements select" ON public.announcements;
CREATE POLICY "Public announcements select" ON public.announcements FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Public offers select" ON public.offers;
CREATE POLICY "Public offers select" ON public.offers FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Public services select" ON public.services;
CREATE POLICY "Public services select" ON public.services FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Public courses select" ON public.courses;
CREATE POLICY "Public courses select" ON public.courses FOR SELECT USING (is_active = true OR public.is_admin());

DROP POLICY IF EXISTS "Public modules select" ON public.course_modules;
CREATE POLICY "Public modules select" ON public.course_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public batches select" ON public.academy_batches;
CREATE POLICY "Public batches select" ON public.academy_batches FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public testimonials select" ON public.testimonials;
CREATE POLICY "Public testimonials select" ON public.testimonials FOR SELECT USING (is_published = true OR public.is_admin());

DROP POLICY IF EXISTS "Public gallery select" ON public.gallery_images;
CREATE POLICY "Public gallery select" ON public.gallery_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public settings select" ON public.business_settings;
CREATE POLICY "Public settings select" ON public.business_settings FOR SELECT USING (true);

-- Admin write policies for CMS & catalog
DROP POLICY IF EXISTS "Admin write media" ON public.media_assets;
CREATE POLICY "Admin write media" ON public.media_assets FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write pages" ON public.site_pages;
CREATE POLICY "Admin write pages" ON public.site_pages FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write sections" ON public.site_page_sections;
CREATE POLICY "Admin write sections" ON public.site_page_sections FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write navigation" ON public.site_navigation;
CREATE POLICY "Admin write navigation" ON public.site_navigation FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write announcements" ON public.announcements;
CREATE POLICY "Admin write announcements" ON public.announcements FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write offers" ON public.offers;
CREATE POLICY "Admin write offers" ON public.offers FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write services" ON public.services;
CREATE POLICY "Admin write services" ON public.services FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write courses" ON public.courses;
CREATE POLICY "Admin write courses" ON public.courses FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write modules" ON public.course_modules;
CREATE POLICY "Admin write modules" ON public.course_modules FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write batches" ON public.academy_batches;
CREATE POLICY "Admin write batches" ON public.academy_batches FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write testimonials" ON public.testimonials;
CREATE POLICY "Admin write testimonials" ON public.testimonials FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write gallery" ON public.gallery_images;
CREATE POLICY "Admin write gallery" ON public.gallery_images FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin write settings" ON public.business_settings;
CREATE POLICY "Admin write settings" ON public.business_settings FOR ALL USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- PUBLIC LEAD SUBMISSION POLICIES (Hardened)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public insert enquiries" ON public.enquiries;
CREATE POLICY "Public insert enquiries" ON public.enquiries FOR INSERT
  WITH CHECK (status = 'New' AND (notes IS NULL OR notes = ''));

DROP POLICY IF EXISTS "Public insert bookings" ON public.bookings;
CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT
  WITH CHECK (status = 'Pending' AND (notes IS NULL OR notes = ''));

DROP POLICY IF EXISTS "Admin manage enquiries" ON public.enquiries;
CREATE POLICY "Admin manage enquiries" ON public.enquiries FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage bookings" ON public.bookings;
CREATE POLICY "Admin manage bookings" ON public.bookings FOR ALL USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- CONFIDENTIAL FINANCIAL, STUDENT & AUDIT POLICIES (Admin Only)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Admin manage invoices" ON public.invoices;
CREATE POLICY "Admin manage invoices" ON public.invoices FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage invoice_items" ON public.invoice_items;
CREATE POLICY "Admin manage invoice_items" ON public.invoice_items FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage students" ON public.students;
CREATE POLICY "Admin manage students" ON public.students FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin manage student_payments" ON public.student_payments;
CREATE POLICY "Admin manage student_payments" ON public.student_payments FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Admin read audit_logs" ON public.audit_logs;
CREATE POLICY "Admin read audit_logs" ON public.audit_logs FOR SELECT USING (public.is_admin());

DROP POLICY IF EXISTS "Auth insert audit_logs" ON public.audit_logs;
CREATE POLICY "Auth insert audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
