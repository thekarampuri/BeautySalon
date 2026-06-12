type StatusType =
  | 'New' | 'Pending'
  | 'Contacted' | 'In Progress'
  | 'Converted' | 'Confirmed' | 'Completed' | 'Paid' | 'Active' | 'Ongoing'
  | 'Closed' | 'Cancelled' | 'Unpaid' | 'Inactive';

const statusMap: Record<string, string> = {
  New: 'tag tag-new',
  Pending: 'tag tag-pending',
  Contacted: 'tag tag-contacted',
  'In Progress': 'tag tag-contacted',
  Converted: 'tag tag-converted',
  Confirmed: 'tag tag-confirmed',
  Completed: 'tag tag-completed',
  Paid: 'tag tag-paid',
  Active: 'tag tag-active',
  Ongoing: 'tag tag-active',
  Closed: 'tag tag-closed',
  Cancelled: 'tag tag-cancelled',
  Unpaid: 'tag tag-unpaid',
  Inactive: 'tag tag-inactive',
};

export default function StatusTag({ status }: { status: string }) {
  const cls = statusMap[status] ?? 'tag tag-closed';
  return <span className={cls}>{status}</span>;
}
