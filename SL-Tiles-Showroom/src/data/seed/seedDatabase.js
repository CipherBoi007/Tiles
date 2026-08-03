import { generateCategories, generateCollections, generateCatalogues, generateEnquiries } from './generateMockData';

export const seedDatabase = () => {
  const isSeeded = localStorage.getItem('cms_db_seeded_v4');
  if (isSeeded) return;

  console.log('Seeding database with optimized amounts...');
  
  const categories = generateCategories(24);
  const products = generateCollections(24, categories);
  const catalogues = generateCatalogues(12);
  const enquiries = generateEnquiries(25);

  localStorage.setItem('cmsCollectionsData', JSON.stringify(categories));
  localStorage.setItem('cmsTilesData', JSON.stringify(products));
  localStorage.setItem('cataloguesData', JSON.stringify(catalogues));
  localStorage.setItem('enquiriesData', JSON.stringify(enquiries));
  
  const defaultSettings = {
    showroomName: 'Sri Lakshmi Tiles and Granite',
    logoUrl: '',
    whatsappNumber: '+91 98765 43210',
    emailAddress: 'contact@showroom.com',
    address: '123 Luxury Avenue, Design District, Mumbai, India'
  };
  localStorage.setItem('settingsData', JSON.stringify(defaultSettings));

  localStorage.setItem('cms_db_seeded_v4', 'true');
  console.log('Database seeded successfully!');
};
