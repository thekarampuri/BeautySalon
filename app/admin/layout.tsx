import type { Metadata } from 'next';
import '../globals.css';
import AdminSidebar from '@/components/admin/Sidebar';
import AdminTopBar from '@/components/admin/TopBar';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard',
    template: '%s | Admin — Mahalaxmi',
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminShell}>
      <AdminSidebar />
      <div className={styles.adminMain}>
        <AdminTopBar />
        <div className={styles.adminContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
