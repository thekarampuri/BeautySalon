// ─── Types ───────────────────────────────────────────────────────
export type Service = {
  id: string;
  name: string;
  category: 'Hair' | 'Skin' | 'Makeup' | 'Nail' | 'Bridal' | 'Spa';
  price: number;
  duration: string;
  description: string;
  image: string;
};

export type Course = {
  id: string;
  name: string;
  duration: string;
  fees: number;
  description: string;
  eligibility: string;
  image: string;
  modules: string[];
};

export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  review: string;
  initials: string;
};

export type Enquiry = {
  id: string;
  name: string;
  mobile: string;
  type: 'Bridal' | 'Admission' | 'Contact';
  details: string;
  status: 'New' | 'Contacted' | 'Converted' | 'Closed';
  date: string;
  notes?: string;
};

export type Booking = {
  id: string;
  customerName: string;
  mobile: string;
  service: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
};

export type Invoice = {
  id: string;
  invoiceNo: string;
  customerName: string;
  mobile: string;
  total: number;
  status: 'Paid' | 'Unpaid';
  date: string;
  items: { description: string; amount: number }[];
};

export type Student = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  course: string;
  batch: string;
  totalFees: number;
  paidFees: number;
  status: 'Ongoing' | 'Completed';
  photo?: string;
};

// ─── Mock Data ────────────────────────────────────────────────────
export const services: Service[] = [
  // Hair Services
  { id: 's1', name: 'Hair Cutting & Trimming', category: 'Hair', price: 150, duration: '30 min', description: 'Base/Straight (₹150), U-Cut (₹200), Layer/Feather (₹400), Advance Haircut (₹500), Kids (₹150).', image: '/images/services/hair/style-1.jpg' },
  { id: 's2', name: 'Hair Styling & Setting', category: 'Hair', price: 500, duration: '45 min', description: 'Ironing (₹500), Tongs (₹500), Hot Rollers (₹200), Blow Dry (₹150).', image: '/images/services/hair/style-2.jpg' },
  { id: 's3', name: 'Hair Colouring', category: 'Hair', price: 2500, duration: '2 hrs', description: 'Global (₹2,500), Balayage (₹3,000), Global + Highlights (₹4,000), Highlights per strand (₹2,000), Root Touchup (₹800).', image: '/images/services/hair/style-3.jpg' },
  { id: 's4', name: 'Hair Chemical Treatments', category: 'Hair', price: 6000, duration: '3-4 hrs', description: 'Straightening (₹5,000), Smoothening (₹4,000), Rebonding/Bluetox/Keratin (₹6,000), Nano Plastic/Botox (₹7,000), Nanogel/Cysteine (₹8,000).', image: '/images/services/hair/style-4.jpg' },
  { id: 's5', name: 'Hair Spa & Scalp Treatments', category: 'Hair', price: 1500, duration: '60 min', description: 'Hair Spa (₹1,000), Anti-Dandruff/Hairfall (₹1,500), Collagen Treatment (₹2,000), Power Mix (₹2,000).', image: '/images/services/hair/style-5.jpg' },

  // Skin Services
  { id: 's6', name: 'Regular & Premium Facials', category: 'Skin', price: 1000, duration: '45 min', description: 'Fruit/Papaya (₹600), Whitening/Pearl (₹700), Diamond/Gold/Red Wine (₹1,000).', image: '/images/services/skin/facial-1.jpg' },
  { id: 's7', name: 'Advance Clinical Facials', category: 'Skin', price: 1500, duration: '60 min', description: 'Hydra Facial (₹3,500), O3 Whitening (₹2,500), Korean Glass (₹1,500), Shahnaz Gold (₹1,500).', image: '/images/services/skin/facial-2.jpg' },
  { id: 's8', name: 'Face Cleanup & D-Tan', category: 'Skin', price: 600, duration: '30 min', description: 'Cleanup (₹400), Cleanup+DTan (₹600), DTan Raaga (₹800), Face Bleach (₹200).', image: '/images/services/skin/facial-3.jpg' },
  { id: 's9', name: 'Threading & Face Waxing', category: 'Skin', price: 100, duration: '15 min', description: 'Eyebrow (₹50), Full Face Wax (₹200), Upper Lip (₹20 Thread / ₹50 Wax).', image: '/images/services/skin/facial-4.jpg' },

  // Spa & Body Services
  { id: 's10', name: 'Body Waxing', category: 'Spa', price: 500, duration: '45 min', description: 'Hand Wax (₹200), Leg Full Wax (₹500), Rica Wax (₹400+), Full Body Wax (₹2,500).', image: '/images/services/spa/aroma-1.jpg' },
  { id: 's11', name: 'Body Treatments & Spa', category: 'Spa', price: 2500, duration: '90 min', description: 'Body Massage (₹3,000), Body Polishing (₹2,500), Body Bleach (₹2,000), Body Spa (₹2,000).', image: '/images/services/spa/aroma-2.jpg' },
  { id: 's12', name: 'Manicure & Pedicure', category: 'Spa', price: 800, duration: '60 min', description: 'Relaxing Spa Manicure (₹600) and Pedicure (₹800).', image: '/images/services/spa/aroma-3.jpg' },
];

export const makeupServices = [
  { id: 'm1', name: 'Wedding Makeup (HD / 3D)', price: 10000, description: 'Includes Makeup, Hairstyle, Draping, Hair Extensions, Lens & Lashes', image: '/images/makeup/bridal/look-1.jpg' },
  { id: 'm2', name: 'Wedding Makeup (Basic)', price: 8000, description: 'Includes Makeup, Hairstyle, Draping, Hair Extensions, Lens & Lashes', image: '/images/makeup/bridal/look-2.jpg' },
  { id: 'm3', name: 'Reception Makeup (HD / 3D)', price: 10000, description: 'Includes full HD makeup, hair, and draping for reception', image: '/images/makeup/reception/look-1.jpg' },
  { id: 'm4', name: 'Reception Makeup (Basic)', price: 8000, description: 'Elegant basic reception look', image: '/images/makeup/reception/look-2.jpg' },
  { id: 'm5', name: 'Sangeet Makeup (HD / 3D)', price: 7000, description: 'Glamorous HD look for Sangeet', image: '/images/makeup/party/look-1.jpg' },
  { id: 'm6', name: 'Prathanam Makeup (HD / 3D)', price: 7000, description: 'Traditional HD look', image: '/images/makeup/hd/look-1.jpg' },
  { id: 'm7', name: 'Engagement HD / 3D Makeup', price: 8000, description: 'Includes Lens & Lashes', image: '/images/makeup/engagement/look-1.jpg' },
  { id: 'm8', name: 'Engagement Basic Makeup', price: 6000, description: 'Includes Makeup, Hairstyle & Draping', image: '/images/makeup/engagement/look-2.jpg' },
  { id: 'm9', name: 'Baby Shower HD / 3D', price: 6000, description: 'Includes Lens & Lashes', image: '/images/makeup/party/look-2.jpg' },
  { id: 'm10', name: 'Baby Shower / Haldi / Mehendi', price: 5000, description: 'Basic elegant makeup for pre-wedding functions', image: '/images/makeup/party/look-3.jpg' },
  { id: 'm11', name: 'Sider HD / 3D Makeup', price: 3500, description: 'For bridesmaids. Includes Hairstyle, Draping, Lash, Lens', image: '/images/makeup/party/look-4.jpg' },
  { id: 'm12', name: 'Sider Basic Makeup', price: 2000, description: 'Basic Makeup, Hairstyle & Draping', image: '/images/makeup/party/look-5.jpg' },
  { id: 'm13', name: 'Single Saree Draping & Hairstyle', price: 1200, description: 'Advance Hairstyle (₹1,000), Basic (₹500), Saree Draping (₹200)', image: '/images/makeup/bridal/look-1.jpg' },
];

export const courses: Course[] = [
  {
    id: 'c1',
    name: 'Advanced Course (Hair, Skin, Makeup & Beauty)',
    duration: '6 Months',
    fees: 50000,
    description: 'Comprehensive professional training covering all aspects of premium salon services.',
    eligibility: 'Open to all',
    image: '/images/courses/makeup/course-1.jpg',
    modules: [
      'Advanced Skin Care & Treatments',
      'Professional HD & 3D Makeup',
      'Hair Styling & Chemical Services',
      'Salon Management & Setup'
    ],
  },
  {
    id: 'c2',
    name: 'Basic Salon Course (Hair, Skin & Beauty)',
    duration: '3 Months',
    fees: 20000,
    description: 'Foundation course covering the essential skills to start a career in beauty.',
    eligibility: 'Open to all',
    image: '/images/courses/skin/course-1.jpg',
    modules: [
      'Basic Haircuts & Styling',
      'Regular & Advance Facials',
      'Waxing, Threading & Cleanup',
      'Basic Spa & Massages'
    ],
  },
  {
    id: 'c3',
    name: 'Makeup & Hairstyle Masterclass',
    duration: '1 Month',
    fees: 25000,
    description: 'Intensive masterclass focusing purely on advanced makeup and hair styling techniques.',
    eligibility: 'Open to all',
    image: '/images/courses/makeup/course-2.jpg',
    modules: [
      'HD & 3D Bridal Makeup',
      'Engagement & Party Looks',
      'Advanced Hairstyles & Extensions',
      'Saree Draping Techniques'
    ],
  },
  {
    id: 'c4',
    name: 'Individual Specialization Courses',
    duration: 'Varies',
    fees: 10000,
    description: 'Specialized individual modules: Hair Chemical (₹20k), Haircutting (₹10k), Makeup (₹20k), Hairstyle (₹10k).',
    eligibility: 'Open to all',
    image: '/images/courses/hair/course-1.jpg',
    modules: [
      'Hair Chemical Master (Smoothening, Keratin)',
      'Precision Haircutting',
      'Professional Makeup Artist',
      'Bridal Hairstyling'
    ],
  },
  {
    id: 'c5',
    name: 'Personal Makeup',
    duration: '15 Days',
    fees: 5000,
    description: 'Learn to do your own makeup flawlessly for everyday office looks and parties.',
    eligibility: 'Open to all',
    image: '/images/courses/makeup/course-3.jpg',
    modules: [
      'Skin Prep & Base Building',
      'Everyday & Office Makeup',
      'Evening Party Looks',
      'Product Knowledge & Personal Kit'
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    rating: 5,
    review: 'Absolutely stunning bridal makeup! I felt like royalty on my wedding day. The team was so professional and patient.',
    initials: 'PS',
  },
  {
    id: 't2',
    name: 'Neha Kulkarni',
    rating: 5,
    review: 'The Professional Makeup course here completely changed my career. The trainers are industry experts and incredibly supportive.',
    initials: 'NK',
  },
  {
    id: 't3',
    name: 'Anjali Mehta',
    rating: 5,
    review: 'Best salon experience in the city. The ambience is lovely, staff is warm, and my hair looks amazing weeks later!',
    initials: 'AM',
  },
];

export const enquiries: Enquiry[] = [
  { id: 'e1', name: 'Riya Patel', mobile: '9876543210', type: 'Bridal', details: 'Interested in full bridal package for December wedding', status: 'New', date: '2025-12-10' },
  { id: 'e2', name: 'Sana Khan', mobile: '9765432109', type: 'Admission', details: 'Wants to join the makeup artist course starting January', status: 'Contacted', date: '2025-12-09' },
  { id: 'e3', name: 'Divya Nair', mobile: 'Query about hair smoothening and pricing', type: 'Contact', details: 'Hair smoothening price enquiry', status: 'Converted', date: '2025-12-08', mobile: '9654321098' },
  { id: 'e4', name: 'Pooja Joshi', mobile: '9543210987', type: 'Bridal', details: 'Bridal booking for March — wanted portfolio review', status: 'Closed', date: '2025-12-07' },
  { id: 'e5', name: 'Meera Iyer', mobile: '9432109876', type: 'Admission', details: 'Enquiry about skincare course duration and fees', status: 'New', date: '2025-12-06' },
];

export const bookings: Booking[] = [
  { id: 'b1', customerName: 'Kavya Reddy', mobile: '9876512340', service: 'Bridal Makeup Package', date: '2025-12-20', time: '07:00 AM', status: 'Confirmed' },
  { id: 'b2', customerName: 'Shreya Gupta', mobile: '9765401239', service: 'HD Makeup', date: '2025-12-18', time: '10:00 AM', status: 'Confirmed' },
  { id: 'b3', customerName: 'Anita Desai', mobile: '9654390128', service: 'Classic Facial', date: '2025-12-16', time: '02:00 PM', status: 'Pending' },
  { id: 'b4', customerName: 'Lakshmi Rao', mobile: '9543280017', service: 'Hair Styling', date: '2025-12-01', time: '11:00 AM', status: 'Completed' },
  { id: 'b5', customerName: 'Preethi Nair', mobile: '9432170906', service: 'Aromatherapy Spa', date: '2025-11-28', time: '03:00 PM', status: 'Completed' },
];

export const invoices: Invoice[] = [
  {
    id: 'i1',
    invoiceNo: 'INV-2025-001',
    customerName: 'Lakshmi Rao',
    mobile: '9543280017',
    total: 2800,
    status: 'Paid',
    date: '2025-12-01',
    items: [{ description: 'Hair Styling & Smoothening', amount: 2500 }, { description: 'Hair Wash', amount: 300 }],
  },
  {
    id: 'i2',
    invoiceNo: 'INV-2025-002',
    customerName: 'Preethi Nair',
    mobile: '9432170906',
    total: 3000,
    status: 'Paid',
    date: '2025-11-28',
    items: [{ description: 'Aromatherapy Spa', amount: 3000 }],
  },
  {
    id: 'i3',
    invoiceNo: 'INV-2025-003',
    customerName: 'Kavya Reddy',
    mobile: '9876512340',
    total: 25000,
    status: 'Unpaid',
    date: '2025-12-20',
    items: [{ description: 'Bridal Makeup Package', amount: 22000 }, { description: 'Hair Draping', amount: 3000 }],
  },
];

export const students: Student[] = [
  { id: 'st1', name: 'Aisha Shaikh', mobile: '9870001234', email: 'aisha@email.com', course: 'Advanced Course', batch: 'Jan 2026', totalFees: 50000, paidFees: 50000, status: 'Ongoing' },
  { id: 'st2', name: 'Ritika Bose', mobile: '9760009876', email: 'ritika@email.com', course: 'Hair Styling Course', batch: 'Jan 2026', totalFees: 35000, paidFees: 17500, status: 'Ongoing' },
  { id: 'st3', name: 'Tanvi Joshi', mobile: '9650008765', email: 'tanvi@email.com', course: 'Basic Salon Course', batch: 'Oct 2025', totalFees: 20000, paidFees: 20000, status: 'Completed' },
];

export const galleryImages = [
  { id: 'g1', src: '/images/gallery/bridal/image-1.jpg', category: 'Bridal', featured: true },
  { id: 'g2', src: '/images/gallery/makeup/image-1.jpg', category: 'Makeup', featured: false },
  { id: 'g3', src: '/images/gallery/salon/image-1.jpg', category: 'Salon', featured: false },
  { id: 'g4', src: '/images/gallery/hair/image-1.jpg', category: 'Hair', featured: true },
  { id: 'g5', src: '/images/gallery/bridal/image-2.jpg', category: 'Bridal', featured: true },
  { id: 'g6', src: '/images/gallery/students/image-1.jpg', category: 'Students', featured: false },
];
