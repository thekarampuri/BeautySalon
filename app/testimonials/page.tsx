import type { Metadata } from 'next';
import { testimonials } from '@/lib/mock-data';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what our clients and students say about Mahalaxmi Beauty Salon & Academy.',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? '#F4A6B7' : 'none'} stroke="#F4A6B7" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>Happy Clients</p>
          <h1>Testimonials</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.grid}>
            {testimonials.map((t) => (
              <div key={t.id} className={styles.card}>
                <StarRating rating={t.rating} />
                <p className={styles.review}>"{t.review}"</p>
                <div className={styles.author}>
                  <div className={styles.avatar}>{t.initials}</div>
                  <span className={styles.name}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
