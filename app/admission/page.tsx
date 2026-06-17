'use client';
import { useState } from 'react';
import { courses } from '@/lib/mock-data';
import styles from './page.module.css';

export default function AdmissionPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', email: '', city: '', course: '', qualification: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello! I would like to apply for an Academy Course.\n\nCourse: ${form.course}\nName: ${form.name}\nMobile: ${form.mobile}\nEmail: ${form.email}\nCity: ${form.city}\nQualification: ${form.qualification}`;
    const url = `https://wa.me/919175085070?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>Join Us</p>
          <h1>Admission Form</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.formCard}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif' }}>Redirecting to WhatsApp...</h2>
                <p className="text-muted" style={{ maxWidth: 400, textAlign: 'center' }}>
                  You can chat directly with our admissions team to discuss batch availability.
                </p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 32 }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', marginBottom: 8 }}>Apply for a Course</h2>
                  <p className="text-muted">Fill in your details and we'll get back to you with batch availability and admission details.</p>
                </div>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGrid}>
                    <div className="form-group">
                      <label className="form-label">Student Name</label>
                      <input className="form-input" placeholder="Full name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mobile Number</label>
                      <input className="form-input" placeholder="+91 XXXXX XXXXX" type="tel" required value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input className="form-input" placeholder="you@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">City</label>
                      <input className="form-input" placeholder="Your city" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Course Interested In</label>
                      <select className="form-select" required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}>
                        <option value="">Select a course</option>
                        {courses.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Highest Qualification</label>
                      <input className="form-input" placeholder="e.g. 12th, Graduate" value={form.qualification} onChange={e => setForm({ ...form, qualification: e.target.value })} />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
