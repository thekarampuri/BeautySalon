'use client';
import { useState } from 'react';
import type { Testimonial } from '@/lib/mock-data';
import styles from './TestimonialCarousel.module.css';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#F4A6B7' : 'none'}
          stroke="#F4A6B7"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            className={`${styles.card} ${i === current ? styles.cardActive : ''} ${
              i === (current - 1 + testimonials.length) % testimonials.length ? styles.cardPrev : ''
            } ${i === (current + 1) % testimonials.length ? styles.cardNext : ''}`}
          >
            <StarRating rating={t.rating} />
            <p className={styles.review}>"{t.review}"</p>
            <div className={styles.author}>
              <div className={styles.avatar}>{t.initials}</div>
              <span className={styles.name}>{t.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={prev} className={styles.navBtn} aria-label="Previous">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} className={styles.navBtn} aria-label="Next">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
