-- Supabase Seed Data File
-- Description: Comprehensive synthetic seed data for BeautySalon CMS & Operations (No PII)

-- ============================================================================
-- 1. SEED CMS PAGES
-- ============================================================================
INSERT INTO public.site_pages (id, slug, title, meta_title, meta_description, is_published) VALUES
  ('p1000000-0000-0000-0000-000000000001', 'home', 'Home', 'Mahalaxmi Beauty Salon & Academy | Premium Salon in Solapur', 'Experience luxury beauty treatments, HD bridal makeup, and professional salon courses in Solapur.', true),
  ('p1000000-0000-0000-0000-000000000002', 'about', 'About Us', 'About Us | Mahalaxmi Beauty Salon', 'Learn about our passion for beauty artistry, expert team, and high quality salon services.', true),
  ('p1000000-0000-0000-0000-000000000003', 'contact', 'Contact Us', 'Contact Us | Mahalaxmi Beauty Salon', 'Get in touch with Mahalaxmi Beauty Salon & Academy Solapur for bookings and enquiries.', true),
  ('p1000000-0000-0000-0000-000000000004', 'bridal', 'Bridal Studio', 'Bridal Makeup Packages | Mahalaxmi Salon', 'Book expert HD & 3D bridal makeup, saree draping, and hairstyle services for your big day.', true),
  ('p1000000-0000-0000-0000-000000000005', 'academy', 'Beauty Academy', 'Beauty Academy Courses & Admissions | Mahalaxmi', 'Join professional beauty, skin care, and makeup artist courses in Solapur.', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 2. SEED CMS PAGE SECTIONS
-- ============================================================================
INSERT INTO public.site_page_sections (id, page_id, section_key, title, subtitle, content, is_visible, display_order) VALUES
  ('s1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', 'hero', 'Where Beauty Meets Artistry', 'Premium Salon Services & Professional Beauty Academy', '{"badge": "✦ Solapur''s Premier Beauty Destination", "cta_text": "Book Appointment", "cta_link": "/services", "secondary_cta_text": "Explore Academy", "secondary_cta_link": "/academy"}'::jsonb, true, 1),
  ('s1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000001', 'about_summary', 'Crafting Timeless Beauty', 'Dedicated to personal care, elegance, and professional beauty education.', '{"experience_years": "10+", "happy_clients": "5000+", "students_trained": "500+"}'::jsonb, true, 2),
  ('s1000000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000004', 'bridal_hero', 'Your Big Day, Beautifully Crafted', 'Bridal Makeup Specialists in Solapur', '{"features": ["HD & 3D Makeup", "Saree Draping", "Lashes & Extensions", "Pre-Wedding Consultation"]}'::jsonb, true, 1)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 3. SEED NAVIGATION MENUS
-- ============================================================================
INSERT INTO public.site_navigation (id, menu_type, label, url, display_order) VALUES
  ('n1000000-0000-0000-0000-000000000001', 'header', 'Home', '/', 1),
  ('n1000000-0000-0000-0000-000000000002', 'header', 'Services', '/services', 2),
  ('n1000000-0000-0000-0000-000000000003', 'header', 'Makeup', '/makeup', 3),
  ('n1000000-0000-0000-0000-000000000004', 'header', 'Bridal', '/bridal', 4),
  ('n1000000-0000-0000-0000-000000000005', 'header', 'Academy', '/academy', 5),
  ('n1000000-0000-0000-0000-000000000006', 'header', 'Gallery', '/gallery', 6),
  ('n1000000-0000-0000-0000-000000000007', 'header', 'Contact', '/contact', 7)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 4. SEED SERVICES
-- ============================================================================
INSERT INTO public.services (id, name, category, price, duration, description, image_url, is_active, display_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Hair Cutting & Trimming', 'Hair', 150.00, '30 min', 'Base/Straight (₹150), U-Cut (₹200), Layer/Feather (₹400), Advance Haircut (₹500), Kids (₹150).', '/images/services/hair/style-1.jpg', true, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Hair Styling & Setting', 'Hair', 500.00, '45 min', 'Ironing (₹500), Tongs (₹500), Hot Rollers (₹200), Blow Dry (₹150).', '/images/services/hair/style-2.jpg', true, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Hair Colouring', 'Hair', 2500.00, '2 hrs', 'Global (₹2,500), Balayage (₹3,000), Global + Highlights (₹4,000), Highlights per strand (₹2,000), Root Touchup (₹800).', '/images/services/hair/style-3.jpg', true, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Hair Chemical Treatments', 'Hair', 6000.00, '3-4 hrs', 'Straightening (₹5,000), Smoothening (₹4,000), Rebonding/Bluetox/Keratin (₹6,000), Nano Plastic/Botox (₹7,000).', '/images/services/hair/style-4.jpg', true, 4),
  ('a1000000-0000-0000-0000-000000000005', 'Hair Spa & Scalp Treatments', 'Hair', 1500.00, '60 min', 'Hair Spa (₹1,000), Anti-Dandruff/Hairfall (₹1,500), Collagen Treatment (₹2,000), Power Mix (₹2,000).', '/images/services/hair/style-5.jpg', true, 5),
  ('a1000000-0000-0000-0000-000000000006', 'Regular & Premium Facials', 'Skin', 1000.00, '45 min', 'Fruit/Papaya (₹600), Whitening/Pearl (₹700), Diamond/Gold/Red Wine (₹1,000).', '/images/services/skin/facial-1.jpg', true, 6),
  ('a1000000-0000-0000-0000-000000000007', 'Advance Clinical Facials', 'Skin', 1500.00, '60 min', 'Hydra Facial (₹3,500), O3 Whitening (₹2,500), Korean Glass (₹1,500), Shahnaz Gold (₹1,500).', '/images/services/skin/facial-2.jpg', true, 7),
  ('a1000000-0000-0000-0000-000000000008', 'Face Cleanup & D-Tan', 'Skin', 600.00, '30 min', 'Cleanup (₹400), Cleanup+DTan (₹600), DTan Raaga (₹800), Face Bleach (₹200).', '/images/services/skin/facial-3.jpg', true, 8),
  ('a1000000-0000-0000-0000-000000000009', 'Threading & Face Waxing', 'Skin', 100.00, '15 min', 'Eyebrow (₹50), Full Face Wax (₹200), Upper Lip (₹20 Thread / ₹50 Wax).', '/images/services/skin/facial-4.jpg', true, 9),
  ('a1000000-0000-0000-0000-000000000010', 'Body Waxing', 'Spa', 500.00, '45 min', 'Hand Wax (₹200), Leg Full Wax (₹500), Rica Wax (₹400+), Full Body Wax (₹2,500).', '/images/services/spa/aroma-1.jpg', true, 10),
  ('a1000000-0000-0000-0000-000000000011', 'Body Treatments & Spa', 'Spa', 2500.00, '90 min', 'Body Massage (₹3,000), Body Polishing (₹2,500), Body Bleach (₹2,000), Body Spa (₹2,000).', '/images/services/spa/aroma-2.jpg', true, 11),
  ('a1000000-0000-0000-0000-000000000012', 'Manicure & Pedicure', 'Spa', 800.00, '60 min', 'Relaxing Spa Manicure (₹600) and Pedicure (₹800).', '/images/services/spa/aroma-3.jpg', true, 12),
  ('a1000000-0000-0000-0000-000000000013', 'Wedding Makeup (HD / 3D)', 'Bridal', 10000.00, '2 hrs', 'Includes Makeup, Hairstyle, Draping, Hair Extensions, Lens & Lashes', '/images/makeup/bridal/look-1.jpg', true, 13),
  ('a1000000-0000-0000-0000-000000000014', 'Engagement HD / 3D Makeup', 'Makeup', 8000.00, '90 min', 'Includes Lens & Lashes', '/images/makeup/engagement/look-1.jpg', true, 14)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 5. SEED COURSES, MODULES & BATCHES
-- ============================================================================
INSERT INTO public.courses (id, name, duration, fees, description, eligibility, image_url, is_active, display_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Advanced Course (Hair, Skin, Makeup & Beauty)', '6 Months', 50000.00, 'Comprehensive professional training covering all aspects of premium salon services.', 'Open to all', '/images/courses/makeup/course-1.jpg', true, 1),
  ('b1000000-0000-0000-0000-000000000002', 'Basic Salon Course (Hair, Skin & Beauty)', '3 Months', 20000.00, 'Foundation course covering the essential skills to start a career in beauty.', 'Open to all', '/images/courses/skin/course-1.jpg', true, 2),
  ('b1000000-0000-0000-0000-000000000003', 'Makeup & Hairstyle Masterclass', '1 Month', 25000.00, 'Intensive masterclass focusing purely on advanced makeup and hair styling techniques.', 'Open to all', '/images/courses/makeup/course-2.jpg', true, 3),
  ('b1000000-0000-0000-0000-000000000004', 'Personal Makeup', '15 Days', 5000.00, 'Learn to do your own makeup flawlessly for everyday office looks and parties.', 'Open to all', '/images/courses/makeup/course-3.jpg', true, 4)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.course_modules (id, course_id, module_title, display_order) VALUES
  ('f1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Advanced Skin Care & Treatments', 1),
  ('f1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001', 'Professional HD & 3D Makeup', 2),
  ('f1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000001', 'Hair Styling & Chemical Services', 3),
  ('f1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000001', 'Salon Management & Setup', 4),
  ('f1000000-0000-0000-0000-000000000005', 'b1000000-0000-0000-0000-000000000002', 'Basic Haircuts & Styling', 1),
  ('f1000000-0000-0000-0000-000000000006', 'b1000000-0000-0000-0000-000000000002', 'Regular & Advance Facials', 2),
  ('f1000000-0000-0000-0000-000000000007', 'b1000000-0000-0000-0000-000000000002', 'Waxing, Threading & Cleanup', 3),
  ('f1000000-0000-0000-0000-000000000008', 'b1000000-0000-0000-0000-000000000003', 'HD & 3D Bridal Makeup', 1),
  ('f1000000-0000-0000-0000-000000000009', 'b1000000-0000-0000-0000-000000000003', 'Advanced Hairstyles & Extensions', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.academy_batches (id, course_id, batch_name, start_date, status) VALUES
  ('bt100000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001', 'Batch Jan 2026', '2026-01-15', 'Ongoing'),
  ('bt100000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000002', 'Batch Feb 2026', '2026-02-01', 'Upcoming')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 6. SEED TESTIMONIALS & GALLERY IMAGES
-- ============================================================================
INSERT INTO public.testimonials (id, name, rating, review, initials, is_published, display_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Priya S.', 5, 'Stunning bridal makeup! The team was professional and patient throughout.', 'PS', true, 1),
  ('c1000000-0000-0000-0000-000000000002', 'Neha K.', 5, 'The Professional Makeup course completely transformed my skills. Highly recommended!', 'NK', true, 2),
  ('c1000000-0000-0000-0000-000000000003', 'Anjali M.', 5, 'Best salon experience in Solapur. Loved the hair treatment.', 'AM', true, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gallery_images (id, image_url, category, caption, alt_text, is_featured, display_order) VALUES
  ('d1000000-0000-0000-0000-000000000001', '/images/gallery/bridal/image-1.jpg', 'Bridal', 'Royal HD Bridal Look', 'Royal Bridal Look Solapur', true, 1),
  ('d1000000-0000-0000-0000-000000000002', '/images/gallery/makeup/image-1.jpg', 'Makeup', 'Glamorous Party Makeup', 'Glamorous Party Look', false, 2),
  ('d1000000-0000-0000-0000-000000000003', '/images/gallery/salon/image-1.jpg', 'Salon', 'Modern Salon Ambience', 'Salon Ambience Solapur', false, 3),
  ('d1000000-0000-0000-0000-000000000004', '/images/gallery/hair/image-1.jpg', 'Hair', 'Balayage Hair Colouring', 'Balayage Hair Styling', true, 4)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 7. SEED SYNTHETIC SAMPLE ENQUIRIES, BOOKINGS & STUDENTS (NO PII)
-- ============================================================================
INSERT INTO public.enquiries (id, name, mobile, email, type, details, status, notes) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'Sample Lead 1', '+91 90000 00001', 'lead1@example.com', 'Bridal', 'Interested in full bridal package for winter wedding', 'New', 'Needs follow up call'),
  ('e1000000-0000-0000-0000-000000000002', 'Sample Lead 2', '+91 90000 00002', 'lead2@example.com', 'Admission', 'Wants to join makeup masterclass starting next month', 'Contacted', 'Shared course brochure')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.bookings (id, customer_name, mobile, service_name, booking_date, booking_time, status, notes) VALUES
  ('g1000000-0000-0000-0000-000000000001', 'Test Client A', '+91 90000 00003', 'Bridal Makeup Package', CURRENT_DATE + INTERVAL '5 days', '10:00 AM', 'Confirmed', 'Pre-wedding trial done'),
  ('g1000000-0000-0000-0000-000000000002', 'Test Client B', '+91 90000 00004', 'Advance Clinical Facial', CURRENT_DATE + INTERVAL '2 days', '02:00 PM', 'Pending', 'Requested afternoon slot')
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- 8. SEED BUSINESS SETTINGS
-- ============================================================================
INSERT INTO public.business_settings (key, value) VALUES
  ('business_info', '{"name": "Mahalaxmi Beauty Salon & Academy", "address": "Near Pulgam Showroom, Daji Peth, New Pachha Peth, Solapur, Maharashtra 413005", "phone": "+91 9175085070", "email": "mahalaxmibeautysalon01@gmail.com", "whatsapp": "+91 9175085070"}'::jsonb),
  ('social_links', '{"instagram": "https://instagram.com/mahalaxmibeauty", "facebook": "https://facebook.com/mahalaxmibeauty"}'::jsonb),
  ('working_hours', '{"weekdays": "11:00 AM – 8:00 PM", "sunday": "11:00 AM – 8:00 PM"}'::jsonb)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
