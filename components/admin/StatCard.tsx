import styles from './StatCard.module.css';

type Props = {
  label: string;
  value: string | number;
  sub?: string;
  color?: 'pink' | 'green' | 'white';
};

export default function StatCard({ label, value, sub, color = 'white' }: Props) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  );
}
