'use client';
import Link from 'next/link';
import type { Course } from '@/lib/mock-data';
import styles from './CourseModal.module.css';

type Props = { course: Course; onClose: () => void };

export default function CourseModal({ course, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 620 }}>
        <div className="modal-header">
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem' }}>{course.name}</h4>
            <p className="text-muted" style={{ fontSize: '0.82rem' }}>{course.duration} · ₹{course.fees.toLocaleString('en-IN')}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div>
            <p style={{ fontSize: '0.95rem', color: '#2B2B2B', lineHeight: 1.8 }}>{course.description}</p>
          </div>

          <div className={styles.section}>
            <h5 className={styles.sectionTitle}>Curriculum</h5>
            <ul className={styles.moduleList}>
              {course.modules.map((mod, i) => (
                <li key={i} className={styles.moduleItem}>
                  <span className={styles.moduleNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{mod}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h5 className={styles.sectionTitle}>Eligibility</h5>
            <p style={{ fontSize: '0.9rem', color: '#6B6B6B' }}>{course.eligibility}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline btn-sm" onClick={onClose}>Close</button>
          <Link href="/admission" className="btn btn-primary btn-sm" onClick={onClose}>
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
