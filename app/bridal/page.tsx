'use client';
import { useState } from 'react';
import styles from './page.module.css';

const makeupTypes = ['Bridal HD', 'Airbrush Bridal', 'Traditional', 'Engagement', 'Reception', 'Mehendi'];
const budgets = ['₹15,000 – ₹25,000', '₹25,000 – ₹40,000', '₹40,000 – ₹60,000', '₹60,000+'];

export default function BridalPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', mobile: '', weddingDate: '', venue: '', makeupType: '', functions: '', budget: '', message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className={styles.bridalHero}>
        <div className="container">
          <div className={styles.bridalHeroContent}>
            <span className={styles.bridalBadge}>✦ Bridal Specialists</span>
            <h1 className={styles.bridalHeading}>
              Your Big Day,<br />Beautifully <em>Crafted</em>
            </h1>
            <p className={styles.bridalSub}>
              We understand that your wedding look is one of the most important of your life. Our bridal team brings years of expertise to make every moment picture-perfect.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <h2>Bridal Portfolio</h2>
            <p className="text-muted" style={{ marginTop: 8 }}>A glimpse of our work — each bride, beautifully unique.</p>
          </div>
          <div className={styles.portfolioGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.portfolioItem}>
                <div className={styles.portfolioPlaceholder}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>Bridal Photo {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section" style={{ background: 'var(--clr-pink-light)', borderTop: '1px solid rgba(26,26,26,0.1)' }}>
        <div className="container">
          <div className={styles.formWrapper}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <h2>Book Your Bridal Consultation</h2>
              <p className="text-muted" style={{ marginTop: 8 }}>Fill in the details and our bridal coordinator will reach out within 24 hours.</p>
            </div>

            {submitted ? (
              <div className={styles.successBox}>
                <div className={styles.successIcon}>✓</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>Thank you, {form.name}!</h3>
                <p className="text-muted">Our bridal coordinator will call you within 24 hours to schedule your consultation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.bridalForm}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input className="form-input" placeholder="Full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Mobile Number</label>
                    <input className="form-input" placeholder="+91 XXXXX XXXXX" type="tel" required value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Wedding Date</label>
                    <input className="form-input" type="date" required value={form.weddingDate} onChange={e => setForm({ ...form, weddingDate: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Venue / City</label>
                    <input className="form-input" placeholder="Wedding venue or city" value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Makeup Type</label>
                    <select className="form-select" value={form.makeupType} onChange={e => setForm({ ...form, makeupType: e.target.value })} required>
                      <option value="">Select type</option>
                      {makeupTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Number of Functions</label>
                    <input className="form-input" placeholder="e.g. 3 (Mehendi, Sangeet, Wedding)" value={form.functions} onChange={e => setForm({ ...form, functions: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <select className="form-select" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 8 }}>
                  <label className="form-label">Additional Message</label>
                  <textarea className="form-textarea" placeholder="Any special requirements, inspirations, or questions..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'center', marginTop: 8 }}>
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
