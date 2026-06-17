import { getServices } from '@/lib/api/content';
import AdminServicesClient from '@/components/admin/AdminServicesClient';

export default function AdminServicesPage() {
  const dynamicServices = getServices();
  
  return (
    <AdminServicesClient services={dynamicServices} />
  );
}
