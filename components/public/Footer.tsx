import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoText}>Mahalaxmi</div>
            <div className={styles.logoSub}>Beauty Salon & Academy</div>
            <p className={styles.tagline}>
              Your beauty, our passion. Transforming looks and building careers since 2010.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/mahalaxmi_beauty_salon__?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram Salon" className={styles.socialLink} title="Salon Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.instagram.com/makeup_artist_shravani_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" aria-label="Instagram Shravani" className={styles.socialLink} title="Shravani Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.instagram.com/mahalaxmi_makeupacademy/" target="_blank" rel="noreferrer" aria-label="Instagram Academy" className={styles.socialLink} title="Academy Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              <a href="https://wa.me/919175085070" target="_blank" rel="noreferrer" aria-label="WhatsApp" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.colLinks}>
              {[['/', 'Home'], ['/about', 'About Us'], ['/services', 'Services'], ['/makeup', 'Makeup'], ['/bridal', 'Bridal'], ['/gallery', 'Gallery']].map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Academy */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Academy</h4>
            <ul className={styles.colLinks}>
              {[['/academy', 'All Courses'], ['/admission', 'Admissions'], ['/testimonials', 'Testimonials'], ['/contact', 'Contact Us']].map(([href, label]) => (
                <li key={href}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>Near Pulgam Showroom, Daji Peth, Solapur, Maharashtra 413005</span>
              </div>
              <div className={styles.contactRow}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.18a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+91 9175085070 / +91 8767029358</span>
              </div>
              <div className={styles.contactRow}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <span>mahalaxmibeautysalon01@gmail.com</span>
              </div>
              <div className={styles.hours}>
                <strong>Working Hours</strong>
                <span>Mon–Sun: 11:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© 2025 Mahalaxmi Beauty Salon & Academy. All rights reserved.</span>
          <Link href="/admin" className={styles.adminLink}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}
