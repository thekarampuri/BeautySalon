'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Service } from '@/lib/mock-data';
import BookingModal from '@/components/public/BookingModal';
import styles from '@/app/services/page.module.css';

export default function ServicesClient({ initialServices, categories }: { initialServices: Service[], categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [bookingService, setBookingService] = useState<Service | null>(null);

  const filtered = activeCategory === 'All'
    ? initialServices
    : initialServices.filter((s) => s.category === activeCategory);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>What We Do</p>
          <h1>Our Services</h1>
          <p style={{ marginTop: 12, color: '#6B6B6B', maxWidth: 480 }}>
            Tailored beauty treatments for every occasion — delivered with precision and care.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Category filter */}
          <div className="filter-tabs" style={{ marginBottom: 40 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Services grid */}
          <div className={styles.servicesGrid}>
            {filtered.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.serviceImgWrapper}>
                  <Image
                    src={service.image}
                    alt={service.name}
                    width={400}
                    height={220}
                    className={styles.serviceImg}
                  />
                  <span className={`tag tag-active ${styles.categoryTag}`}>{service.category}</span>
                </div>
                <div className={styles.serviceBody}>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  {service.description && <p className={styles.serviceDesc}>{service.description}</p>}
                  
                  <div className={styles.serviceMeta}>
                    <div>
                      {service.price > 0 && <span className={styles.price}>₹{service.price.toLocaleString('en-IN')}</span>}
                      {service.duration && <span className={styles.duration}> · {service.duration}</span>}
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setBookingService(service)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {filtered.length === 0 && (
               <p className="text-muted" style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>
                 No services found for this category. Add images to the corresponding folder in public/images/services/.
               </p>
            )}
          </div>
        </div>
      </section>

      {bookingService && (
        <BookingModal
          service={bookingService}
          onClose={() => setBookingService(null)}
        />
      )}
    </>
  );
}
