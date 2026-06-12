'use client';
import { useState } from 'react';
import styles from './page.module.css';
import adminStyles from '../admin.module.css';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState({
    name: 'Mahalaxmi Beauty Salon & Academy',
    address: '123, Rose Garden Lane, Koregaon Park, Pune — 411001',
    phone: '+91 98765 43210',
    email: 'hello@mahalaxmibeauty.com',
    whatsapp: '+91 98765 43210',
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://instagram.com/mahalaxmibeauty',
    facebook: 'https://facebook.com/mahalaxmibeauty',
  });

  const [hours, setHours] = useState({
    weekdays: '9:00 AM – 8:00 PM',
    sunday: '10:00 AM – 6:00 PM',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <div className={adminStyles.pageHeader}>
        <h2 className={adminStyles.pageTitle}>Settings</h2>
      </div>

      <div className={styles.settingsSections}>
        {/* Business Info */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Business Information</h4>
          <div className={styles.divider} />
          <div className={styles.formGrid}>
            {[
              { label: 'Business Name', key: 'name' as const },
              { label: 'Phone Number', key: 'phone' as const },
              { label: 'Email Address', key: 'email' as const },
              { label: 'WhatsApp Number', key: 'whatsapp' as const },
            ].map(({ label, key }) => (
              <div key={key} className="form-group">
                <label className="form-label">{label}</label>
                <input className="form-input" value={businessInfo[key]} onChange={e => setBusinessInfo({ ...businessInfo, [key]: e.target.value })} />
              </div>
            ))}
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Address</label>
              <textarea className="form-textarea" value={businessInfo.address} onChange={e => setBusinessInfo({ ...businessInfo, address: e.target.value })} style={{ minHeight: 64, border: '1px solid rgba(26,26,26,0.1)', borderRadius: 6, padding: '8px 12px' }} />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Social Links</h4>
          <div className={styles.divider} />
          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label">Instagram URL</label>
              <input className="form-input" value={socialLinks.instagram} onChange={e => setSocialLinks({ ...socialLinks, instagram: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Facebook URL</label>
              <input className="form-input" value={socialLinks.facebook} onChange={e => setSocialLinks({ ...socialLinks, facebook: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Working Hours</h4>
          <div className={styles.divider} />
          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label">Monday – Saturday</label>
              <input className="form-input" value={hours.weekdays} onChange={e => setHours({ ...hours, weekdays: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Sunday</label>
              <input className="form-input" value={hours.sunday} onChange={e => setHours({ ...hours, sunday: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Maps Embed */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Google Maps Embed</h4>
          <div className={styles.divider} />
          <div className="form-group">
            <label className="form-label">Embed Code</label>
            <textarea className="form-textarea" placeholder="Paste your Google Maps embed code here..." style={{ border: '1px solid rgba(26,26,26,0.1)', borderRadius: 6, padding: '8px 12px', minHeight: 80 }} />
          </div>
        </div>

        {/* Homepage Banner */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Homepage Banner</h4>
          <div className={styles.divider} />
          <div className={styles.formGrid}>
            <div className="form-group">
              <label className="form-label">Banner Heading</label>
              <input className="form-input" placeholder="e.g. Where Beauty Meets Artistry" />
            </div>
            <div className="form-group">
              <label className="form-label">CTA Button Text</label>
              <input className="form-input" placeholder="e.g. Book Appointment" />
            </div>
            <div className="form-group">
              <label className="form-label">CTA Link</label>
              <input className="form-input" placeholder="/services" />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-primary" onClick={handleSave}>Save All Changes</button>
          {saved && <span className="text-muted" style={{ fontSize: '0.875rem' }}>✓ Changes saved</span>}
        </div>
      </div>
    </div>
  );
}
