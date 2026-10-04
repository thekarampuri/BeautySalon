// Firebase Firestore Collection Types for BeautySalon CMS & Operations

export type UserRole = 'admin' | 'staff';

export type ProfileDocument = {
  uid: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};

export type MediaFolder = 'services' | 'courses' | 'gallery' | 'students' | 'banners' | 'cms' | 'general';

export type MediaAssetDocument = {
  id: string;
  filename: string;
  storagePath: string;
  publicUrl: string;
  fileSize: number;
  mimeType: string;
  altText: string;
  caption: string;
  folder: MediaFolder;
  createdAt: string;
  updatedAt: string;
};

export type SitePageDocument = {
  id: string; // slug, e.g. 'home', 'about', 'contact', 'bridal', 'academy'
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImageUrl: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type SitePageSectionDocument = {
  id: string; // e.g. 'home_hero', 'bridal_hero'
  pageSlug: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  content: Record<string, any>;
  isVisible: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type MenuType = 'header' | 'footer' | 'quick_links';

export type SiteNavigationDocument = {
  id: string;
  menuType: MenuType;
  label: string;
  url: string;
  target: '_self' | '_blank';
  isVisible: boolean;
  displayOrder: number;
  createdAt: string;
};

export type AnnouncementDocument = {
  id: string;
  message: string;
  linkUrl: string;
  linkText: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
};

export type OfferDocument = {
  id: string;
  title: string;
  code: string;
  discountPercentage: number;
  discountAmount: number;
  description: string;
  bannerImageUrl: string;
  mediaId?: string;
  validFrom?: string;
  validUntil?: string;
  isActive: boolean;
  createdAt: string;
};

export type ServiceCategory = 'Hair' | 'Skin' | 'Makeup' | 'Nail' | 'Bridal' | 'Spa';

export type ServiceDocument = {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  duration: string;
  description: string;
  imageUrl: string;
  mediaId?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseDocument = {
  id: string;
  name: string;
  duration: string;
  fees: number;
  description: string;
  eligibility: string;
  imageUrl: string;
  mediaId?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CourseModuleDocument = {
  id: string;
  courseId: string;
  moduleTitle: string;
  displayOrder: number;
  createdAt: string;
};

export type BatchStatus = 'Upcoming' | 'Ongoing' | 'Completed';

export type AcademyBatchDocument = {
  id: string;
  courseId: string;
  batchName: string;
  startDate: string;
  endDate?: string;
  seatsCapacity: number;
  status: BatchStatus;
  createdAt: string;
};

export type TestimonialDocument = {
  id: string;
  name: string;
  rating: number; // 1-5
  review: string;
  initials: string;
  avatarUrl?: string;
  mediaId?: string;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
};

export type GalleryCategory = 'Bridal' | 'Makeup' | 'Hair' | 'Salon' | 'Students';

export type GalleryImageDocument = {
  id: string;
  imageUrl: string;
  caption: string;
  altText: string;
  category: GalleryCategory;
  mediaId?: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
};

export type EnquiryType = 'Bridal' | 'Admission' | 'Contact';
export type EnquiryStatus = 'New' | 'Contacted' | 'Converted' | 'Closed';

export type EnquiryDocument = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  type: EnquiryType;
  details: string;
  status: EnquiryStatus;
  notes?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
};

export type BookingStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export type BookingDocument = {
  id: string;
  customerName: string;
  mobile: string;
  serviceId?: string;
  serviceName: string;
  priceSnapshot: number;
  bookingDate: string;
  bookingTime: string;
  status: BookingStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type InvoiceStatus = 'Paid' | 'Unpaid';

export type InvoiceItem = {
  description: string;
  amount: number;
};

export type InvoiceDocument = {
  id: string;
  invoiceNo: string;
  bookingId?: string;
  customerName: string;
  mobile: string;
  totalAmount: number;
  status: InvoiceStatus;
  invoiceDate: string;
  items: InvoiceItem[];
  createdAt: string;
  updatedAt: string;
};

export type StudentStatus = 'Ongoing' | 'Completed';

export type StudentDocument = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  courseId?: string;
  courseName: string;
  batchId?: string;
  batch: string;
  totalFees: number;
  paidFees: number;
  status: StudentStatus;
  photoUrl?: string;
  mediaId?: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentMode = 'Cash' | 'UPI' | 'Card' | 'Bank Transfer';

export type StudentPaymentDocument = {
  id: string;
  studentId: string;
  amount: number;
  paymentDate: string;
  paymentMode: PaymentMode;
  notes?: string;
  createdAt: string;
};

export type BusinessSettingDocument = {
  key: string;
  value: Record<string, any>;
  updatedAt: string;
};

export type AuditLogDocument = {
  id: string;
  userId?: string;
  userEmail?: string;
  action: string;
  entityType: string;
  entityId: string;
  details?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
};
