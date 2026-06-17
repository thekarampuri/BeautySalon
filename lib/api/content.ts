import fs from 'fs';
import path from 'path';
import { Service } from '../mock-data'; // Use existing Service type as base

export function getServices(): Service[] {
  const servicesDir = path.join(process.cwd(), 'public', 'images', 'services');
  const services: Service[] = [];

  if (!fs.existsSync(servicesDir)) {
    return services;
  }

  const categories = fs.readdirSync(servicesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  let idCounter = 1;

  for (const category of categories) {
    const categoryPath = path.join(servicesDir, category);
    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png|webp|gif)$/i)) continue;

      const nameWithoutExt = path.parse(file).name;
      // Convert e.g., "Bridal_Makeup-1" to "Bridal Makeup 1"
      const formattedName = nameWithoutExt.replace(/[-_]/g, ' ');
      
      // Auto-capitalize each word for nicer presentation
      const titleCaseName = formattedName.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );

      // Capitalize the category correctly
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

      services.push({
        id: `auto-${idCounter++}`,
        name: titleCaseName, // Extracted from filename as requested
        category: formattedCategory as any,
        image: `/images/services/${category}/${file}`,
        // Provide fallbacks since we aren't reading from a DB anymore
        price: 0,
        duration: '',
        description: '',
      });
    }
  }

  return services;
}
