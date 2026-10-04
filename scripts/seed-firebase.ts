import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo-project.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo-project.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:123',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

async function seedFirebase() {
  console.log('🌱 Starting Firebase Firestore seeding...');

  // 1. CMS Pages
  const pages = [
    { id: 'home', slug: 'home', title: 'Home', metaTitle: 'Mahalaxmi Beauty Salon & Academy', metaDescription: 'Luxury beauty treatments and academy in Solapur.', isPublished: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'about', slug: 'about', title: 'About Us', metaTitle: 'About Us | Mahalaxmi Beauty Salon', metaDescription: 'Learn about our passion for beauty artistry.', isPublished: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'contact', slug: 'contact', title: 'Contact Us', metaTitle: 'Contact Us | Mahalaxmi Beauty Salon', metaDescription: 'Get in touch for bookings.', isPublished: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'bridal', slug: 'bridal', title: 'Bridal Studio', metaTitle: 'Bridal Makeup | Mahalaxmi Salon', metaDescription: 'Book HD & 3D bridal packages.', isPublished: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'academy', slug: 'academy', title: 'Beauty Academy', metaTitle: 'Beauty Courses Solapur | Mahalaxmi', metaDescription: 'Professional beauty academy.', isPublished: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  for (const page of pages) {
    await setDoc(doc(db, 'sitePages', page.id), page);
  }
  console.log('✓ Seeded sitePages');

  // 2. Services
  const services = [
    { id: 's1', name: 'Hair Cutting & Trimming', category: 'Hair', price: 150, duration: '30 min', description: 'Base/Straight (₹150), U-Cut (₹200), Layer/Feather (₹400).', imageUrl: '/images/services/hair/style-1.jpg', isActive: true, displayOrder: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 's2', name: 'Hair Styling & Setting', category: 'Hair', price: 500, duration: '45 min', description: 'Ironing (₹500), Tongs (₹500), Hot Rollers (₹200).', imageUrl: '/images/services/hair/style-2.jpg', isActive: true, displayOrder: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 's3', name: 'Hair Colouring', category: 'Hair', price: 2500, duration: '2 hrs', description: 'Global (₹2,500), Balayage (₹3,000), Global + Highlights (₹4,000).', imageUrl: '/images/services/hair/style-3.jpg', isActive: true, displayOrder: 3, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 's6', name: 'Regular & Premium Facials', category: 'Skin', price: 1000, duration: '45 min', description: 'Fruit/Papaya (₹600), Whitening/Pearl (₹700), Diamond/Gold (₹1,000).', imageUrl: '/images/services/skin/facial-1.jpg', isActive: true, displayOrder: 4, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 's7', name: 'Advance Clinical Facials', category: 'Skin', price: 1500, duration: '60 min', description: 'Hydra Facial (₹3,500), O3 Whitening (₹2,500), Korean Glass (₹1,500).', imageUrl: '/images/services/skin/facial-2.jpg', isActive: true, displayOrder: 5, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 's10', name: 'Body Waxing', category: 'Spa', price: 500, duration: '45 min', description: 'Hand Wax (₹200), Leg Full Wax (₹500), Full Body Wax (₹2,500).', imageUrl: '/images/services/spa/aroma-1.jpg', isActive: true, displayOrder: 6, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'm1', name: 'Wedding Makeup (HD / 3D)', category: 'Bridal', price: 10000, duration: '2 hrs', description: 'Includes Makeup, Hairstyle, Draping, Hair Extensions, Lens & Lashes', imageUrl: '/images/makeup/bridal/look-1.jpg', isActive: true, displayOrder: 7, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  for (const s of services) {
    await setDoc(doc(db, 'services', s.id), s);
  }
  console.log('✓ Seeded services');

  // 3. Courses & Modules
  const courses = [
    { id: 'c1', name: 'Advanced Course (Hair, Skin, Makeup & Beauty)', duration: '6 Months', fees: 50000, description: 'Comprehensive training.', eligibility: 'Open to all', imageUrl: '/images/courses/makeup/course-1.jpg', isActive: true, displayOrder: 1, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 'c2', name: 'Basic Salon Course (Hair, Skin & Beauty)', duration: '3 Months', fees: 20000, description: 'Foundation course.', eligibility: 'Open to all', imageUrl: '/images/courses/skin/course-1.jpg', isActive: true, displayOrder: 2, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  for (const c of courses) {
    await setDoc(doc(db, 'courses', c.id), c);
  }
  console.log('✓ Seeded courses');

  // 4. Testimonials
  const testimonials = [
    { id: 't1', name: 'Priya S.', rating: 5, review: 'Stunning bridal makeup!', initials: 'PS', isPublished: true, displayOrder: 1, createdAt: new Date().toISOString() },
    { id: 't2', name: 'Neha K.', rating: 5, review: 'The makeup course changed my career.', initials: 'NK', isPublished: true, displayOrder: 2, createdAt: new Date().toISOString() },
  ];

  for (const t of testimonials) {
    await setDoc(doc(db, 'testimonials', t.id), t);
  }
  console.log('✓ Seeded testimonials');

  // 5. Business Settings
  const settings = [
    { id: 'business_info', key: 'business_info', value: { name: 'Mahalaxmi Beauty Salon & Academy', address: 'Near Pulgam Showroom, Daji Peth, Solapur', phone: '+91 9175085070', email: 'mahalaxmibeautysalon01@gmail.com' }, updatedAt: new Date().toISOString() },
    { id: 'social_links', key: 'social_links', value: { instagram: 'https://instagram.com/mahalaxmibeauty', facebook: 'https://facebook.com/mahalaxmibeauty' }, updatedAt: new Date().toISOString() },
  ];

  for (const set of settings) {
    await setDoc(doc(db, 'businessSettings', set.id), set);
  }
  console.log('✓ Seeded businessSettings');

  console.log('🎉 Firebase Firestore seeding completed successfully!');
}

seedFirebase().catch(console.error);
