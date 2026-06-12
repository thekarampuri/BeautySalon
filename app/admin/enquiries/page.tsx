'use client';
import { useState } from 'react';
import StatusTag from '@/components/admin/StatusTag';
import Drawer from '@/components/admin/Drawer';
import { enquiries } from '@/lib/mock-data';
import type { Enquiry } from '@/lib/mock-data';
import styles from '../admin.module.css';

const types = ['All', 'Bridal', 'Admission', 'Contact'];
const statuses = ['All', 'New', 'Contacted', 'Converted', 'Closed'];

export default function EnquiriesPage() {
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const filtered = enquiries.filter((e) => {
    if (filterType !== 'All' && e.type !== filterType) return false;
    if (filterStatus !== 'All' && e.status !== filterStatus) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Enquiries</h2>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.searchInput}
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={styles.filterSelect} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Type</th>
              <th>Details</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} onClick={() => setSelected(e)}>
                <td style={{ fontWeight: 500 }}>{e.name}</td>
                <td className="text-muted">{e.mobile}</td>
                <td><span className="tag tag-contacted">{e.type}</span></td>
                <td className="text-muted" style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.details}</td>
                <td><StatusTag status={e.status} /></td>
                <td className="text-muted">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <Drawer title={`Enquiry — ${selected.name}`} onClose={() => setSelected(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Name</span><p style={{ marginTop: 2 }}>{selected.name}</p></div>
            <div><span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mobile</span><p style={{ marginTop: 2 }}>{selected.mobile}</p></div>
            <div><span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Type</span><div style={{ marginTop: 4 }}><span className="tag tag-contacted">{selected.type}</span></div></div>
            <div><span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</span><div style={{ marginTop: 4 }}><StatusTag status={selected.status} /></div></div>
            <div><span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Details</span><p style={{ marginTop: 2, fontSize: '0.9rem' }}>{selected.details}</p></div>
            <div>
              <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Notes</span>
              <textarea className="form-textarea form-input-bordered" placeholder="Add notes..." style={{ marginTop: 8, borderRadius: 6, border: '1px solid rgba(26,26,26,0.1)', padding: '8px 12px', minHeight: 80, width: '100%' }} defaultValue={selected.notes ?? ''} />
            </div>
            <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>Save Notes</button>
          </div>
        </Drawer>
      )}
    </div>
  );
}
