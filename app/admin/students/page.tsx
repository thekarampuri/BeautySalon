'use client';
import { useState } from 'react';
import StatusTag from '@/components/admin/StatusTag';
import Drawer from '@/components/admin/Drawer';
import { students } from '@/lib/mock-data';
import type { Student } from '@/lib/mock-data';
import styles from '../admin.module.css';

export default function StudentsPage() {
  const [selected, setSelected] = useState<Student | null>(null);
  const [search, setSearch] = useState('');

  const filtered = students.filter(s =>
    !search || s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h2 className={styles.pageTitle}>Students</h2>
        <button className="btn btn-primary btn-sm">+ Add Student</button>
      </div>

      <div className={styles.toolbar}>
        <input className={styles.searchInput} placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Mobile</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Fees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const pct = Math.round((s.paidFees / s.totalFees) * 100);
              return (
                <tr key={s.id} onClick={() => setSelected(s)}>
                  <td style={{ fontWeight: 500 }}>{s.name}</td>
                  <td className="text-muted">{s.mobile}</td>
                  <td style={{ fontSize: '0.82rem' }}>{s.course}</td>
                  <td className="text-muted">{s.batch}</td>
                  <td>
                    <div>
                      <div style={{ fontSize: '0.8rem', marginBottom: 4 }}>
                        ₹{s.paidFees.toLocaleString('en-IN')} / ₹{s.totalFees.toLocaleString('en-IN')}
                      </div>
                      <div className={styles.feeBar}>
                        <div className={styles.feeBarFill} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </td>
                  <td><StatusTag status={s.status} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <Drawer title={selected.name} onClose={() => setSelected(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              ['Email', selected.email],
              ['Mobile', selected.mobile],
              ['Course', selected.course],
              ['Batch', selected.batch],
              ['Status', null],
            ].map(([label, val]) => (
              <div key={label as string}>
                <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
                {label === 'Status' ? (
                  <div style={{ marginTop: 4 }}><StatusTag status={selected.status} /></div>
                ) : (
                  <p style={{ marginTop: 2 }}>{val}</p>
                )}
              </div>
            ))}

            <div>
              <span className="text-muted" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Fee Summary</span>
              <div style={{ marginTop: 8, background: '#FAFAF8', border: '1px solid rgba(26,26,26,0.08)', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 8 }}>
                  <span>Total Fees</span><span>₹{selected.totalFees.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: 8 }}>
                  <span>Paid</span><span style={{ color: '#7AAE73' }}>₹{selected.paidFees.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: 600 }}>
                  <span>Remaining</span><span>₹{(selected.totalFees - selected.paidFees).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <button className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start' }}>+ Add Payment</button>
          </div>
        </Drawer>
      )}
    </div>
  );
}
