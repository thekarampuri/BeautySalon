'use client';
import { useState } from 'react';
import type { Service } from '@/lib/mock-data';
import styles from './BookingModal.module.css';

type Props = { service: Service; onClose: () => void };

export default function BookingModal({ service, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', mobile: '', date: '', time: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem' }}>Book Appointment</h4>
            <p className="text-muted" style={{ fontSize: '0.82rem' }}>{service.name}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif' }}>Booking Requested!</h3>
            <p className="text-muted">We'll confirm your appointment within 2 hours via WhatsApp.</p>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: 16 }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  className="form-input"
                  placeholder="Enter your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number</label>
                <input
                  className="form-input"
                  placeholder="+91 XXXXX XXXXX"
                  required
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Preferred Date</label>
                  <input
                    className="form-input"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Time</label>
                  <input
                    className="form-input"
                    type="time"
                    required
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Service</label>
                <input className="form-input" value={service.name} readOnly style={{ color: '#6B6B6B' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline btn-sm" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary btn-sm">Confirm Booking</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
