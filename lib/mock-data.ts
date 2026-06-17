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
  {
    id: 's1',
    name: 'Hair Styling & Smoothening',
    category: 'Hair',
    price: 2500,
    duration: '2–3 hrs',
    description: 'Professional hair smoothening and styling for silky, frizz-free hair.',
    image: '/images/services/hair/style-1.jpg',
  },
  {
    id: 's2',
    name: 'Classic Facial',
    category: 'Skin',
    price: 1200,
    duration: '60 min',
    description: 'Deep cleansing facial with premium skincare products for a radiant glow.',
    image: '/images/services/skin/facial-1.jpg',
  },
  {
    id: 's3',
    name: 'HD Makeup',
    category: 'Makeup',
    price: 4500,
    duration: '90 min',
    description: 'Camera-ready HD makeup with long-lasting, flawless finish.',
    image: '/images/services/makeup/hd-1.jpg',
  },
  {
    id: 's4',
    name: 'Bridal Makeup Package',
    category: 'Bridal',
    price: 25000,
    duration: 'Full Day',
    description: 'Complete bridal look including makeup, hair, draping, and touch-ups.',
    image: '/images/services/bridal/package-1.jpg',
  },
  {
    id: 's5',
    name: 'Nail Art & Extensions',
    category: 'Nail',
    price: 1800,
    duration: '90 min',
    description: 'Custom nail art designs and gel extensions for stunning hands.',
    image: '/images/services/nail/art-1.jpg',
  },
  {
    id: 's6',
    name: 'Aromatherapy Spa',
    category: 'Spa',
    price: 3000,
    duration: '2 hrs',
    description: 'Rejuvenating full-body aromatherapy massage and body treatment.',
    image: '/images/services/spa/aroma-1.jpg',
  },
];

export const makeupServices = [
  { id: 'm1', name: 'Bridal Makeup', price: 25000, description: 'Traditional or contemporary bridal look', image: '/images/makeup/bridal/look-1.jpg' },
  { id: 'm2', name: 'Engagement Makeup', price: 8000, description: 'Soft, glowing look for your engagement day', image: '/images/makeup/engagement/look-1.jpg' },
  { id: 'm3', name: 'HD Makeup', price: 4500, description: 'High-definition finish for events and shoots', image: '/images/makeup/hd/look-1.jpg' },
  { id: 'm4', name: 'Airbrush Makeup', price: 6000, description: 'Ultra-smooth, lightweight airbrush application', image: '/images/makeup/airbrush/look-1.jpg' },
  { id: 'm5', name: 'Party Makeup', price: 2500, description: 'Glamorous makeup for parties and celebrations', image: '/images/makeup/party/look-1.jpg' },
  { id: 'm6', name: 'Reception Makeup', price: 12000, description: 'Elegant reception look that lasts all night', image: '/images/makeup/reception/look-1.jpg' },
];

export const courses: Course[] = [
  {
    id: 'c1',
    name: 'Professional Makeup Artist Course',
    duration: '3 Months',
    fees: 45000,
    description: 'Master the art of professional makeup — from basics to advanced bridal looks.',
    eligibility: '10th pass or above, any background welcome',
    image: '/images/courses/makeup/course-1.jpg',
    modules: [
      'Skin Analysis & Prep',
      'Foundation & Contouring',
      'Eye Makeup Techniques',
      'Bridal Makeup',
      'HD & Airbrush Makeup',
      'Portfolio & Industry Prep',
    ],
  },
  {
    id: 'c2',
    name: 'Hair Styling & Coloring',
    duration: '2 Months',
    fees: 35000,
    description: 'Learn professional hair styling, cutting, and coloring techniques used in top salons.',
    eligibility: '10th pass or above',
    image: '/images/courses/hair/course-1.jpg',
    modules: [
      'Hair Structure & Analysis',
      'Basic Cutting Techniques',
      'Advanced Styling',
      'Hair Coloring & Highlights',
      'Keratin & Rebonding',
      'Salon Management',
    ],
  },
  {
    id: 'c3',
    name: 'Skin Care & Facials',
    duration: '1.5 Months',
    fees: 25000,
    description: 'Deep dive into skincare science, facial techniques, and treatment protocols.',
    eligibility: 'Open to all',
    image: '/images/courses/skin/course-1.jpg',
    modules: [
      'Skin Types & Conditions',
      'Classic & Luxury Facials',
      'Chemical Peels',
      'Cleanup & Bleach',
      'Anti-Aging Treatments',
      'Product Knowledge',
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
  { id: 'st1', name: 'Aisha Shaikh', mobile: '9870001234', email: 'aisha@email.com', course: 'Professional Makeup Artist Course', batch: 'Jan 2026', totalFees: 45000, paidFees: 45000, status: 'Ongoing' },
  { id: 'st2', name: 'Ritika Bose', mobile: '9760009876', email: 'ritika@email.com', course: 'Hair Styling & Coloring', batch: 'Jan 2026', totalFees: 35000, paidFees: 17500, status: 'Ongoing' },
  { id: 'st3', name: 'Tanvi Joshi', mobile: '9650008765', email: 'tanvi@email.com', course: 'Skin Care & Facials', batch: 'Oct 2025', totalFees: 25000, paidFees: 25000, status: 'Completed' },
  { id: 'st4', name: 'Komal Verma', mobile: '9540007654', email: 'komal@email.com', course: 'Professional Makeup Artist Course', batch: 'Oct 2025', totalFees: 45000, paidFees: 30000, status: 'Ongoing' },
];

export const galleryImages = [
  { id: 'g1', src: '/images/gallery/bridal/image-1.jpg', category: 'Bridal', featured: true },
  { id: 'g2', src: '/images/gallery/makeup/image-1.jpg', category: 'Makeup', featured: false },
  { id: 'g3', src: '/images/gallery/salon/image-1.jpg', category: 'Salon', featured: false },
  { id: 'g4', src: '/images/gallery/hair/image-1.jpg', category: 'Hair', featured: true },
  { id: 'g5', src: '/images/gallery/bridal/image-2.jpg', category: 'Bridal', featured: true },
  { id: 'g6', src: '/images/gallery/students/image-1.jpg', category: 'Students', featured: false },
];
