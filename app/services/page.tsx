import { getServices } from '@/lib/api/content';
import ServicesClient from '@/components/public/ServicesClient';

export default function ServicesPage() {
  const dynamicServices = getServices();
  
  // Extract unique categories from the folders + 'All'
  const uniqueCategories = Array.from(new Set(dynamicServices.map(s => s.category)));
  const categories = ['All', ...uniqueCategories];

  return (
    <ServicesClient 
      initialServices={dynamicServices} 
      categories={categories} 
    />
  );
}
