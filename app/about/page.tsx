import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Mahalaxmi Beauty Salon & Academy — our story, mission, and the team behind Solapur\'s premier beauty studio.',
};

const stats = [
  { num: '16+', label: 'Years Experience' },
  { num: '2000+', label: 'Happy Clients' },
  { num: '10+', label: 'Students Trained' },
  { num: '3', label: 'Professional Courses' },
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>Our Story</p>
          <h1>About Us</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.duoImageContainer}>
              <div className={styles.ownerImageWrapper}>
                <div className={styles.ownerImageBg} style={{ background: 'var(--clr-pink-light)' }} />
                <div className={styles.ownerImage}>
                  <div className={styles.ownerPlaceholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Mrs. Shamala</span>
                  </div>
                </div>
              </div>
              <div className={styles.ownerImageWrapper} style={{ marginTop: 40 }}>
                <div className={styles.ownerImageBg} style={{ background: 'var(--clr-green-light)' }} />
                <div className={styles.ownerImage}>
                  <div className={styles.ownerPlaceholder}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Ms. Shravani</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.aboutContent}>
              <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 12 }}>Founded 2012</p>
              <h2 style={{ marginBottom: 20 }}>A Legacy of Beauty:<br />From Mother to Daughter</h2>
              <p style={{ marginBottom: 16 }}>
                Mahalaxmi Beauty Salon & Academy was born in 2012 from the vision and passion of <strong>Mrs. Shamala Karampuri</strong>. With over 16 years of hands-on expertise in the beauty industry, she built the salon on a foundation of trust, exceptional service, and a deep understanding of what makes every woman feel truly beautiful. Her dedication transformed a modest studio in Solapur into a beloved local institution.
              </p>
              <p style={{ marginBottom: 16 }}>
                The legacy of artistry didn't stop there. Continuing the family tradition with a modern flair is her daughter, <strong>Ms. Shravani Karampuri</strong>. As a professional makeup artist with over 5 years of specialized experience, Shravani brings contemporary techniques, HD precision, and fresh bridal trends to the salon. Together, this dynamic mother-daughter duo perfectly blends timeless elegance with modern beauty standards.
              </p>
              <p style={{ marginBottom: 28 }}>
                Beyond our premium salon services, we are deeply committed to empowering the next generation of beauty professionals. Through our dedicated academy, we have personally trained and mentored aspiring artists, equipping them with the skills to launch their own successful careers.
              </p>
              <div className={styles.missionBox}>
                <h4 style={{ marginBottom: 8, fontFamily: 'Cormorant Garamond, serif' }}>Our Mission</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  To celebrate artistry, build confidence, and ensure that every client who walks through our doors leaves feeling like their most radiant self.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" style={{ maxWidth: 1200, margin: '0 auto' }} />

      <section className="section-sm" style={{ background: 'var(--clr-pink-light)' }}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statCard}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
