import type { Metadata } from 'next';
import Link from 'next/link';
import StatCard from '@/components/admin/StatCard';
import StatusTag from '@/components/admin/StatusTag';
import { enquiries, bookings } from '@/lib/mock-data';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Dashboard' };

export default function AdminDashboard() {
  const recentEnquiries = enquiries.slice(0, 4);
  const recentBookings = bookings.slice(0, 4);

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Dashboard</h2>
        <p className="text-muted">Welcome back! Here's a quick overview.</p>
      </div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        <StatCard label="New Enquiries" value={enquiries.filter(e => e.status === 'New').length} sub="This week" color="pink" />
        <StatCard label="Students Learning" value={3} sub="Active batches" color="green" />
        <StatCard label="Upcoming Bookings" value={bookings.filter(b => b.status === 'Confirmed').length} sub="Next 7 days" color="pink" />
        <StatCard label="Unpaid Invoices" value={1} sub="Pending collection" color="white" />
      </div>

      {/* Chart placeholder */}
      <div className={styles.chartPlaceholder}>
        <div className={styles.chartLabel}>Website Visitors Trend — Last 30 Days</div>
        <div className={styles.chartBars}>
          {[40, 65, 48, 80, 55, 72, 90, 60, 75, 85, 50, 68, 92, 70, 45, 80, 62, 55, 78, 88, 64, 76, 95, 58, 72, 84, 66, 90, 75, 82].map((h, i) => (
            <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      {/* Recent activity tables */}
      <div className={styles.tablesRow}>
        <div className={styles.tableBlock}>
          <div className={styles.tableHeader}>
            <h4 className={styles.tableTitle}>Recent Enquiries</h4>
            <Link href="/admin/enquiries" className="btn btn-outline btn-sm">View All</Link>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td><span className="tag tag-contacted">{e.type}</span></td>
                    <td><StatusTag status={e.status} /></td>
                    <td className="text-muted">{e.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.tableBlock}>
          <div className={styles.tableHeader}>
            <h4 className={styles.tableTitle}>Recent Bookings</h4>
            <Link href="/admin/bookings" className="btn btn-outline btn-sm">View All</Link>
          </div>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.customerName}</td>
                    <td className="text-muted" style={{ fontSize: '0.82rem' }}>{b.service}</td>
                    <td className="text-muted">{b.date}</td>
                    <td><StatusTag status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
