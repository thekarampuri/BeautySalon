import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Mahalaxmi Beauty Salon & Academy — our story, mission, and the team behind Solapur\'s premier beauty studio.',
};

const stats = [
  { num: '15+', label: 'Years of Excellence' },
  { num: '2000+', label: 'Happy Clients' },
  { num: '500+', label: 'Students Trained' },
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
            <div className={styles.ownerImageWrapper}>
              <div className={styles.ownerImageBg} />
              <div className={styles.ownerImage}>
                <div className={styles.ownerPlaceholder}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>Owner Photo</span>
                </div>
              </div>
            </div>
            <div className={styles.aboutContent}>
              <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 12 }}>Founded 2010</p>
              <h2 style={{ marginBottom: 20 }}>Crafting Beauty,<br />Building Careers</h2>
              <p style={{ marginBottom: 16 }}>
                Mahalaxmi Beauty Salon & Academy was founded with a singular vision — to make every woman feel her most beautiful self, while also empowering aspiring beauty professionals with world-class training.
              </p>
              <p style={{ marginBottom: 16 }}>
                Over 15 years, we've grown from a boutique salon in Solapur to a full-fledged beauty academy, training hundreds of students who now lead successful careers across the industry.
              </p>
              <p style={{ marginBottom: 28 }}>
                Our salon offers premium services in hair, skin, makeup, and bridal styling — always using the finest products and techniques. Our academy courses are designed by industry veterans, offering hands-on, practical training.
              </p>
              <div className={styles.missionBox}>
                <h4 style={{ marginBottom: 8, fontFamily: 'Cormorant Garamond, serif' }}>Our Mission</h4>
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                  To blend artistry with education — creating a space where beauty is celebrated, skills are nurtured, and every client and student leaves feeling transformed.
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
