import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { services, courses, testimonials } from '@/lib/mock-data';
import styles from './page.module.css';
import TestimonialCarousel from '@/components/public/TestimonialCarousel';

export const metadata: Metadata = {
  title: 'Mahalaxmi Beauty Salon & Academy — Pune\'s Premier Beauty Studio',
  description:
    'Expert bridal makeup, hair styling, skincare treatments & professional beauty courses in Pune. Book your appointment today.',
};

const serviceCategories = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    name: 'Hair',
    desc: 'Cuts, styling, color, smoothening & treatments',
    href: '/services',
    bg: 'var(--clr-pink-light)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    name: 'Skin',
    desc: 'Facials, peels, cleanup & glow treatments',
    href: '/services',
    bg: 'var(--clr-green-light)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    name: 'Makeup',
    desc: 'HD, airbrush, party & editorial makeup',
    href: '/makeup',
    bg: 'var(--clr-pink-light)',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    name: 'Bridal',
    desc: 'Complete bridal packages & portfolio',
    href: '/bridal',
    bg: 'var(--clr-green-light)',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Est. 2010 · Pune</span>
          <h1 className={styles.heroHeading}>
            Where Beauty<br />Meets <em>Artistry</em>
          </h1>
          <p className={styles.heroSub}>
            Premium salon services & professional beauty courses crafted for the modern woman. Step in, transform, shine.
          </p>
          <div className={styles.heroCta}>
            <Link href="/services" className="btn btn-primary btn-lg">
              Book Appointment
            </Link>
            <Link href="/academy" className="btn btn-outline btn-lg">
              View Courses
            </Link>
          </div>
          <div className={styles.heroStats}>
            {[['15+', 'Years of Excellence'], ['2000+', 'Happy Clients'], ['500+', 'Students Trained']].map(([num, label]) => (
              <div key={label} className={styles.heroStat}>
                <span className={styles.heroStatNum}>{num}</span>
                <span className={styles.heroStatLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.heroImgBg} />
          <div className={styles.heroImgWrapper}>
            <Image
              src="/images/hero.jpg"
              alt="Mahalaxmi Beauty Salon"
              width={520}
              height={620}
              className={styles.heroImg}
              priority
            />
          </div>
          <div className={styles.heroAccentPill}>✦ Bridal Specialists</div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="section">
        <div className="container">
          <div className={`section-header ${styles.sectionHeaderRow}`}>
            <div>
              <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '6px' }}>What We Offer</p>
              <h2>Our Services</h2>
            </div>
            <Link href="/services" className="btn btn-outline btn-sm">View All Services</Link>
          </div>
          <div className="grid-4">
            {serviceCategories.map((cat) => (
              <Link key={cat.name} href={cat.href} className={styles.catCard} style={{ background: cat.bg }}>
                <div className={styles.catIcon}>{cat.icon}</div>
                <h3 className={styles.catName}>{cat.name}</h3>
                <p className={styles.catDesc}>{cat.desc}</p>
                <span className={styles.catArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      {/* ── Featured Courses ── */}
      <section className="section" style={{ background: 'var(--clr-green-light)' }}>
        <div className="container">
          <div className={`section-header ${styles.sectionHeaderRow}`}>
            <div>
              <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '6px' }}>Learn from the Best</p>
              <h2>Academy Courses</h2>
            </div>
            <Link href="/academy" className="btn btn-outline btn-sm">All Courses</Link>
          </div>
          <div className="grid-3">
            {courses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseImgWrapper}>
                  <Image
                    src={course.image}
                    alt={course.name}
                    width={400}
                    height={220}
                    className={styles.courseImg}
                  />
                </div>
                <div className={styles.courseBody}>
                  <h4 className={styles.courseName}>{course.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: 12 }}>{course.description}</p>
                  <div className={styles.courseMeta}>
                    <span>⏱ {course.duration}</span>
                    <span>₹{course.fees.toLocaleString('en-IN')}</span>
                  </div>
                  <Link href="/academy" className="btn btn-outline btn-sm" style={{ marginTop: 12 }}>
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '6px' }}>What Our Clients Say</p>
            <h2>Testimonials</h2>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/testimonials" className="btn btn-outline btn-sm">Read All Reviews</Link>
          </div>
        </div>
      </section>

      {/* ── Offers Banner ── */}
      <section className={styles.offersBanner}>
        <div className="container">
          <div className={styles.offersInner}>
            <div>
              <span className={styles.offersLabel}>Limited Time Offer</span>
              <h2 className={styles.offersHeading}>20% off on all Bridal Packages this Season</h2>
              <p>Book before 31st January and get complimentary mehendi consultation included.</p>
            </div>
            <Link href="/bridal" className="btn btn-primary btn-lg">
              Enquire Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
