'use client';
import { useState } from 'react';
import { galleryImages } from '@/lib/mock-data';
import styles from './page.module.css';

const categories = ['All', 'Bridal', 'Makeup', 'Hair', 'Salon', 'Students'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>Our Work</p>
          <h1>Gallery</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
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

          <div className={styles.galleryGrid}>
            {filtered.map((img) => (
              <div key={img.id} className={styles.galleryItem}>
                <div className={styles.imgPlaceholder}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>{img.category}</span>
                </div>
                <div className={styles.galleryOverlay}>
                  <span className="tag tag-active">{img.category}</span>
                  {img.featured && <span className="tag tag-new">★ Featured</span>}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B6B6B' }}>
              No images in this category yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
