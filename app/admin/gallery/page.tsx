'use client';
import { useState } from 'react';
import { galleryImages } from '@/lib/mock-data';
import styles from './page.module.css';
import adminStyles from '../admin.module.css';

const categories = ['All', 'Bridal', 'Makeup', 'Hair', 'Salon', 'Students'];

export default function AdminGalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div>
      <div className={adminStyles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className={adminStyles.pageTitle}>Gallery</h2>
        <button className="btn btn-primary btn-sm">+ Upload Images</button>
      </div>

      <div className="filter-tabs" style={{ marginBottom: 20 }}>
        {categories.map(cat => (
          <button key={cat} className={`filter-tab ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.galleryGrid}>
        {filtered.map((img) => (
          <div key={img.id} className={styles.galleryItem}>
            <div className={styles.imgPlaceholder}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
              <span>{img.category}</span>
            </div>
            <div className={styles.overlay}>
              <span className="tag tag-active">{img.category}</span>
              <div className={styles.overlayActions}>
                <button className={styles.overlayBtn} title="Toggle featured">★</button>
                <button className={styles.overlayBtn} title="Delete">✕</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
