'use client';
import { useState } from 'react';
import StatusTag from '@/components/admin/StatusTag';
import Modal from '@/components/admin/Modal';
import { invoices } from '@/lib/mock-data';
import styles from '../admin.module.css';

type LineItem = { description: string; amount: number };

export default function InvoicesPage() {
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState<LineItem[]>([{ description: '', amount: 0 }]);
  const [invoiceForm, setInvoiceForm] = useState({ customerName: '', mobile: '' });

  const total = items.reduce((sum, i) => sum + Number(i.amount), 0);

  const addItem = () => setItems([...items, { description: '', amount: 0 }]);
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx));

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className={styles.pageTitle}>Invoices</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>+ Create Invoice</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice No.</th>
              <th>Customer</th>
              <th>Mobile</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td style={{ fontFamily: 'monospace', fontSize: '0.82rem' }}>{inv.invoiceNo}</td>
                <td style={{ fontWeight: 500 }}>{inv.customerName}</td>
                <td className="text-muted">{inv.mobile}</td>
                <td>₹{inv.total.toLocaleString('en-IN')}</td>
                <td><StatusTag status={inv.status} /></td>
                <td className="text-muted">{inv.date}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-outline btn-sm">View</button>
                    <button className="btn btn-outline btn-sm">Print</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Create Invoice" onClose={() => setShowModal(false)} size="lg">
          <div className="modal-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Customer Name</label>
                <input className="form-input" placeholder="Full name" value={invoiceForm.customerName} onChange={e => setInvoiceForm({ ...invoiceForm, customerName: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile</label>
                <input className="form-input" placeholder="+91 XXXXX XXXXX" value={invoiceForm.mobile} onChange={e => setInvoiceForm({ ...invoiceForm, mobile: e.target.value })} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Line Items</label>
                <button className="btn btn-outline btn-sm" onClick={addItem}>+ Add Item</button>
              </div>
              {items.map((item, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 32px', gap: 8, marginBottom: 8 }}>
                  <input className="form-input form-input-bordered" placeholder="Description" value={item.description} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, description: e.target.value } : it))} />
                  <input className="form-input form-input-bordered" placeholder="₹ Amount" type="number" value={item.amount || ''} onChange={e => setItems(items.map((it, i) => i === idx ? { ...it, amount: Number(e.target.value) } : it))} />
                  <button style={{ background: 'none', border: 'none', color: '#6B6B6B', cursor: 'pointer', fontSize: '1rem' }} onClick={() => removeItem(idx)}>✕</button>
                </div>
              ))}
              <div style={{ textAlign: 'right', fontWeight: 600, marginTop: 8, fontSize: '0.95rem' }}>
                Total: ₹{total.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline btn-sm" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-green btn-sm">Print</button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowModal(false)}>Save Invoice</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
