export const dashboardStats = {
  totalTiles: 124,
  tilesAddedThisWeek: 4,
  collections: 8,
  collectionsAddedThisMonth: 1,
  newEnquiries: 3,
  catalogues: 2,
  latestCatalogue: 'Summer 2024'
};

export const recentActivity = [
  { id: 1, type: 'enquiry', title: 'New enquiry received', desc: 'Riya Sharma enquired about Carrara Marble Tile', time: '10 min ago' },
  { id: 2, type: 'tile_added', title: 'Tile added', desc: 'Onyx Black 600x600 added to Luxury collection', time: '1 hr ago' },
  { id: 3, type: 'catalogue', title: 'Catalogue uploaded', desc: 'Summer 2024 Collection PDF published', time: '3 hr ago' },
  { id: 4, type: 'collection', title: 'Collection created', desc: 'Mediterranean Series created with 12 tiles', time: 'Yesterday' },
  { id: 5, type: 'tile_updated', title: 'Tile updated', desc: 'Details updated for Travertine Beige 300x600', time: 'Yesterday' }
];

export const tilesData = [
  { id: 1, name: 'Carrara White Marble', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=150&q=80', category: 'Marble', size: '600x600', finish: 'Glossy' },
  { id: 2, name: 'Onyx Black', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=150&q=80', category: 'Luxury', size: '800x800', finish: 'High Gloss' },
  { id: 3, name: 'Rustic Concrete', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=150&q=80', category: 'Ceramic', size: '300x600', finish: 'Matte' },
  { id: 4, name: 'Travertine Beige', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80', category: 'Natural Stone', size: '600x600', finish: 'Satin' }
];

export const collectionsData = [
  { id: 1, name: 'Luxury Marble', desc: 'Premium imported marble tiles for elegant spaces.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', tilesCount: 24 },
  { id: 2, name: 'Minimalist Concrete', desc: 'Modern concrete look for industrial design themes.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=400&q=80', tilesCount: 16 },
  { id: 3, name: 'Mediterranean Series', desc: 'Warm, earthy tones inspired by coastal villas.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', tilesCount: 12 }
];

export const cataloguesData = [
  { id: 1, title: 'Summer 2024 Collection', desc: 'Our latest imported tiles and exclusive designs.', fileUrl: '/catalogues/summer-2024.pdf', date: 'Oct 24, 2024' },
  { id: 2, title: 'Architectural Series 2023', desc: 'Technical specifications for commercial projects.', fileUrl: '/catalogues/arch-2023.pdf', date: 'Jan 15, 2024' }
];

export const enquiriesData = [
  { id: 1, customer: 'Riya Sharma', phone: '+91 98765 43210', tile: 'Carrara White Marble', date: 'Today, 10:30 AM', status: 'New' },
  { id: 2, customer: 'Amit Patel', phone: '+91 87654 32109', tile: 'Onyx Black 800x800', date: 'Yesterday', status: 'Contacted' },
  { id: 3, customer: 'Sneha Gupta', phone: '+91 76543 21098', tile: 'Rustic Concrete', date: 'Oct 24, 2024', status: 'Resolved' },
  { id: 4, customer: 'Vikram Singh', phone: '+91 65432 10987', tile: 'General Enquiry', date: 'Oct 23, 2024', status: 'New' }
];
