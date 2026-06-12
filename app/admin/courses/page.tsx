'use client';
import { useState } from 'react';
import { courses } from '@/lib/mock-data';
import Modal from '@/components/admin/Modal';
import styles from '../admin.module.css';

export default function AdminCoursesPage() {
  const [showModal, setShowModal] = useState(false);
  const [modules, setModules] = useState(['']);

  const addModule = () => setModules([...modules, '']);
  const removeModule = (i: number) => setModules(modules.filter((_, idx) => idx !== i));

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className={styles.pageTitle}>Courses</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Course</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td className="text-muted">{c.duration}</td>
                <td>₹{c.fees.toLocaleString('en-IN')}</td>
                <td><span className="tag tag-active">Active</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-outline btn-sm">Edit</button>
                    <button className="btn btn-outline btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Add Course" onClose={() => setShowModal(false)} size="lg">
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Course Name</label>
                <input className="form-input" placeholder="e.g. Makeup Artist Course" />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input className="form-input" placeholder="e.g. 3 Months" />
              </div>
              <div className="form-group">
                <label className="form-label">Fees (₹)</label>
                <input className="form-input" type="number" placeholder="45000" />
              </div>
              <div className="form-group">
                <label className="form-label">Eligibility</label>
                <input className="form-input" placeholder="10th pass or above" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" placeholder="Course overview..." style={{ border: '1px solid rgba(26,26,26,0.1)', borderRadius: 6, padding: '8px 12px' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Curriculum Modules</label>
                <button className="btn btn-outline btn-sm" onClick={addModule}>+ Add Module</button>
              </div>
              {modules.map((mod, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 32px', gap: 8, marginBottom: 8 }}>
                  <input className="form-input" style={{ border: '1px solid rgba(26,26,26,0.1)', borderRadius: 6, padding: '8px 12px' }} placeholder={`Module ${idx + 1}`} value={mod} onChange={e => setModules(modules.map((m, i) => i === idx ? e.target.value : m))} />
                  <button style={{ background: 'none', border: 'none', color: '#6B6B6B', cursor: 'pointer' }} onClick={() => removeModule(idx)}>✕</button>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Save Course</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
