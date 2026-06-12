'use client';
import { useState } from 'react';
import Image from 'next/image';
import { makeupServices } from '@/lib/mock-data';
import BookingModal from '@/components/public/BookingModal';
import type { Service } from '@/lib/mock-data';
import styles from '../services/page.module.css';

const MAKEUP_AS_SERVICE = makeupServices.map(m => ({
  ...m,
  category: 'Makeup' as const,
  duration: '90 min',
}));

export default function MakeupPage() {
  const [booking, setBooking] = useState<(typeof MAKEUP_AS_SERVICE)[0] | null>(null);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>Expert Artistry</p>
          <h1>Makeup Services</h1>
          <p style={{ marginTop: 12, color: '#6B6B6B', maxWidth: 480 }}>
            From soft bridal looks to bold editorial — every look is crafted with intention.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.servicesGrid}>
            {MAKEUP_AS_SERVICE.map((item) => (
              <div key={item.id} className={styles.serviceCard}>
                <div className={styles.serviceImgWrapper}>
                  <Image src={item.image} alt={item.name} width={400} height={220} className={styles.serviceImg} />
                  <span className={`tag tag-active ${styles.categoryTag}`}>Makeup</span>
                </div>
                <div className={styles.serviceBody}>
                  <h3 className={styles.serviceName}>{item.name}</h3>
                  <p className={styles.serviceDesc}>{item.description}</p>
                  <div className={styles.serviceMeta}>
                    <span className={styles.price}>₹{item.price.toLocaleString('en-IN')}</span>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-outline btn-sm">View Gallery</button>
                      <button className="btn btn-primary btn-sm" onClick={() => setBooking(item)}>Book Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {booking && <BookingModal service={booking as Service} onClose={() => setBooking(null)} />}
    </>
  );
}
