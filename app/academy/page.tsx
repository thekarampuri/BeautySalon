'use client';
import { useState } from 'react';
import Image from 'next/image';
import { courses } from '@/lib/mock-data';
import type { Course } from '@/lib/mock-data';
import CourseModal from '@/components/public/CourseModal';
import styles from './page.module.css';

export default function AcademyPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: 8 }}>Professional Training</p>
          <h1>Beauty Academy</h1>
          <p style={{ marginTop: 12, color: '#6B6B6B', maxWidth: 520 }}>
            Industry-led courses designed to launch and elevate your beauty career. Hands-on training, small batches, real-world skills.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.coursesGrid}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseCard}>
                <div className={styles.courseImgWrapper}>
                  <Image src={course.image} alt={course.name} width={480} height={260} className={styles.courseImg} />
                </div>
                <div className={styles.courseBody}>
                  <h3 className={styles.courseName}>{course.name}</h3>
                  <p className={styles.courseDesc}>{course.description}</p>
                  <div className={styles.courseTags}>
                    <span className="tag tag-active">⏱ {course.duration}</span>
                    <span className="tag tag-new">₹ {course.fees.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    className="btn btn-outline"
                    style={{ marginTop: 16, width: '100%' }}
                    onClick={() => setSelectedCourse(course)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.academyInfo}>
            <div className={styles.infoCard} style={{ background: 'var(--clr-pink-light)' }}>
              <h4>Small Batches</h4>
              <p>Maximum 8 students per batch ensures personalised attention from instructors.</p>
            </div>
            <div className={styles.infoCard} style={{ background: 'var(--clr-green-light)' }}>
              <h4>Certificates</h4>
              <p>Receive a recognized certificate upon successful completion of your course.</p>
            </div>
            <div className={styles.infoCard} style={{ background: 'var(--clr-bg-alt)' }}>
              <h4>Job Support</h4>
              <p>Career guidance and placement assistance for eligible students after completion.</p>
            </div>
          </div>
        </div>
      </section>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </>
  );
}
