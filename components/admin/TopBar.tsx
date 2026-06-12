import styles from './TopBar.module.css';

export default function AdminTopBar() {
  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <span className={styles.businessName}>Mahalaxmi Beauty Salon & Academy</span>
      </div>
      <div className={styles.right}>
        <div className={styles.adminBadge}>
          <div className={styles.adminAvatar}>A</div>
          <div>
            <div className={styles.adminName}>Admin</div>
            <div className={styles.adminRole}>Owner</div>
          </div>
        </div>
      </div>
    </header>
  );
}
