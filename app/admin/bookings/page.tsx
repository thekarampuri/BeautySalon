'use client';
import { useState } from 'react';
import StatusTag from '@/components/admin/StatusTag';
import Modal from '@/components/admin/Modal';
import { bookings } from '@/lib/mock-data';
import styles from '../admin.module.css';

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ customerName: '', mobile: '', service: '', date: '', time: '' });

  const upcoming = bookings.filter(b => ['Confirmed', 'Pending'].includes(b.status));
  const history = bookings.filter(b => ['Completed', 'Cancelled'].includes(b.status));
  const displayed = activeTab === 'upcoming' ? upcoming : history;

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className={styles.pageTitle}>Bookings</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(true)}>+ Add Booking</button>
      </div>

      <div className={styles.tabBar}>
        {(['upcoming', 'history'] as const).map((tab) => (
          <button key={tab} className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'upcoming' ? 'Upcoming Bookings' : 'Booking History'}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((b) => (
              <tr key={b.id}>
                <td style={{ fontWeight: 500 }}>{b.customerName}</td>
                <td className="text-muted">{b.mobile}</td>
                <td>{b.service}</td>
                <td className="text-muted">{b.date}</td>
                <td className="text-muted">{b.time}</td>
                <td><StatusTag status={b.status} /></td>
                <td>
                  <button className="btn btn-outline btn-sm">Generate Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <Modal title="Add Booking" onClose={() => setShowAddModal(false)}>
          <div className="modal-body">
            {[
              { label: 'Customer Name', field: 'customerName', type: 'text', placeholder: 'Full name' },
              { label: 'Mobile', field: 'mobile', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
              { label: 'Service', field: 'service', type: 'text', placeholder: 'Service name' },
              { label: 'Date', field: 'date', type: 'date', placeholder: '' },
              { label: 'Time', field: 'time', type: 'time', placeholder: '' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field} className="form-group">
                <label className="form-label">{label}</label>
                <input className="form-input" type={type} placeholder={placeholder} value={(form as any)[field]} onChange={e => setForm({ ...form, [field]: e.target.value })} />
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline btn-sm" onClick={() => setShowAddModal(false)}>Cancel</button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddModal(false)}>Save Booking</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
