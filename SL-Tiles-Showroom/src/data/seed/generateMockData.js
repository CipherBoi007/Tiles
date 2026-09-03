import { getUniqueImage } from '../imagePool/imageSelector';

export const generateCategories = (count = 100) => {
  const spaces = ['Living Room', 'Kitchen', 'Bathroom', 'Outdoor', 'Bedroom', 'Office', 'Commercial', 'Patio', 'Balcony', 'Hallway'];
  const styles = ['Modern', 'Classic', 'Rustic', 'Luxury', 'Minimalist', 'Industrial', 'Vintage', 'Contemporary', 'Traditional', 'Bohemian'];
  const categories = [];

  for (let i = 1; i <= count; i++) {
    const space = spaces[Math.floor(Math.random() * spaces.length)];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const name = `${style} ${space} ${i}`;
    
    categories.push({
      id: `cat-${i}`,
      name: name,
      slug: name.toLowerCase().replace(/ /g, '-'),
      image: getUniqueImage(space),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  return categories;
};

export const generateCollections = (count = 100, categories) => {
  const materials = ['Marble', 'Ceramic', 'Porcelain', 'Granite', 'Wood-look', 'Stone', 'Terrazzo', 'Glass', 'Slate', 'Concrete'];
  const finishes = ['Glossy', 'Matte', 'Satin', 'Polished', 'Textured', 'Honed', 'Lappato'];
  const colors = ['White', 'Black', 'Grey', 'Beige', 'Cream', 'Brown', 'Blue', 'Green', 'Gold', 'Charcoal'];
  
  const products = [];

  for (let i = 1; i <= count; i++) {
    const material = materials[Math.floor(Math.random() * materials.length)];
    const finish = finishes[Math.floor(Math.random() * finishes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const name = `${color} ${material} ${finish}`;
    const categoryId = categories[Math.floor(Math.random() * categories.length)].id;
    
    products.push({
      id: `prod-${i}`,
      categoryId: categoryId,
      name: name,
      image: getUniqueImage(material),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  return products;
};

export const generateCatalogues = (count = 100) => {
  const years = ['2023', '2024', '2025'];
  const seasons = ['Summer', 'Winter', 'Spring', 'Autumn', 'Annual', 'Exclusive'];
  const types = ['Architectural', 'Residential', 'Commercial', 'Luxury', 'Essentials'];
  
  const catalogues = [];

  for (let i = 1; i <= count; i++) {
    const year = years[Math.floor(Math.random() * years.length)];
    const season = seasons[Math.floor(Math.random() * seasons.length)];
    const type = types[Math.floor(Math.random() * types.length)];
    const title = `${season} ${type} Collection ${year} Vol. ${i}`;
    
    catalogues.push({
      id: `catl-${i}`,
      title: title,
      fileUrl: `/catalogues/mock-catalogue-${i}.pdf`,
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  return catalogues;
};

export const generateEnquiries = (count = 20) => {
  const names = ['Riya Sharma', 'Amit Patel', 'Sneha Gupta', 'Vikram Singh', 'Priya Desai', 'Rahul Verma'];
  const statuses = ['New', 'Contacted', 'Resolved'];
  const enquiries = [];
  
  for (let i = 1; i <= count; i++) {
    enquiries.push({
      id: `enq-${i}`,
      customer: names[Math.floor(Math.random() * names.length)],
      phone: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
      tile: 'General Enquiry',
      date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    });
  }
  return enquiries;
};
