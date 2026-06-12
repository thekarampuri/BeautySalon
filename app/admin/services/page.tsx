'use client';
import { useState } from 'react';
import { services } from '@/lib/mock-data';
import Modal from '@/components/admin/Modal';
import styles from '../admin.module.css';

const serviceCategories = ['Hair', 'Skin', 'Makeup', 'Nail', 'Bridal', 'Spa'];

export default function AdminServicesPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className={styles.pageTitle}>Services</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Add Service</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                <td style={{ fontWeight: 500 }}>{s.name}</td>
                <td><span className="tag tag-active">{s.category}</span></td>
                <td>₹{s.price.toLocaleString('en-IN')}</td>
                <td className="text-muted">{s.duration}</td>
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
        <Modal title="Add Service" onClose={() => setShowModal(false)}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Service Name</label>
              <input className="form-input" placeholder="e.g. HD Makeup" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-select">
                  <option value="">Select...</option>
                  {serviceCategories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input className="form-input" type="number" placeholder="2500" />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input className="form-input" placeholder="e.g. 90 min" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea className="form-textarea" placeholder="Brief description..." style={{ border: '1px solid rgba(26,26,26,0.1)', borderRadius: 6, padding: '8px 12px' }} />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Save Service</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
