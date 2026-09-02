import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

const categoriesData = [
  { name: 'Vitrified Floor Tiles', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80', slug: 'vitrified-floor-tiles' },
  { name: 'Wall & Elevation Tiles', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', slug: 'wall-elevation-tiles' },
  { name: 'Imported Marble Slabs', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80', slug: 'imported-marble-slabs' },
  { name: 'Wooden Planks & Decking', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=800&q=80', slug: 'wooden-planks-decking' },
  { name: 'Granite & Natural Stone', image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80', slug: 'granite-natural-stone' },
  { name: 'Outdoor & Parking Heavy Duty', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', slug: 'outdoor-parking-heavy-duty' }
];

const subCategoriesData = [
  // Vitrified Floor Tiles (catIndex: 0)
  { catIndex: 0, name: 'Glazed Vitrified (GVT/PGVT)', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80', slug: 'gvt-pgvt-floor' },
  { catIndex: 0, name: 'Double Charge Vitrified', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80', slug: 'double-charge-vitrified' },

  // Wall & Elevation Tiles (catIndex: 1)
  { catIndex: 1, name: 'Bathroom & Kitchen Ceramic', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', slug: 'bathroom-kitchen-ceramic' },
  { catIndex: 1, name: '3D Stone Elevation', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', slug: '3d-stone-elevation' },

  // Imported Marble Slabs (catIndex: 2)
  { catIndex: 2, name: 'Italian Statuario Series', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', slug: 'italian-statuario' },
  { catIndex: 2, name: 'Royal Onyx Slabs', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80', slug: 'royal-onyx-slabs' },

  // Wooden Planks & Decking (catIndex: 3)
  { catIndex: 3, name: 'Oak & Teak Wood Planks', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=600&q=80', slug: 'oak-teak-planks' },
  { catIndex: 3, name: 'Herringbone Wooden Parquet', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80', slug: 'herringbone-parquet' },

  // Granite & Natural Stone (catIndex: 4)
  { catIndex: 4, name: 'Black Galaxy Granite', image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80', slug: 'black-galaxy-granite' },
  { catIndex: 4, name: 'Kashmir White Granite', image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=600&q=80', slug: 'kashmir-white-granite' },

  // Outdoor & Parking Heavy Duty (catIndex: 5)
  { catIndex: 5, name: 'Anti-Skid Parking Pavers', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80', slug: 'anti-skid-parking' },
  { catIndex: 5, name: 'Cobblestone Terrace Pavers', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', slug: 'cobblestone-terrace' }
];

const sampleTiles = [
  // Sub 0: Glazed Vitrified
  { subIndex: 0, name: 'Carrara White PGVT', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 0, name: 'Armani Bronze Vitrified', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80' },

  // Sub 1: Double Charge
  { subIndex: 1, name: 'Crema Marfil Double Charge', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 1, name: 'Super White Nano Vitrified', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },

  // Sub 2: Bathroom & Kitchen Ceramic
  { subIndex: 2, name: 'Azure Floral Bathroom Highlight', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 2, name: 'Spanish Subway Gloss White', image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80' },

  // Sub 3: 3D Stone Elevation
  { subIndex: 3, name: 'Rustic Charcoal Stone Elevation', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 3, name: 'Sandstone Ledge Facade Tile', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },

  // Sub 4: Italian Statuario Series
  { subIndex: 4, name: 'Statuario Supreme Book-Matched Slab', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 4, name: 'Calacatta Gold Porcelain Slab', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },

  // Sub 5: Royal Onyx Slabs
  { subIndex: 5, name: 'Honey Onyx Translucent Slab', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 5, name: 'Emerald Green Onyx Slab', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80' },

  // Sub 6: Oak & Teak Wood Planks
  { subIndex: 6, name: 'Teakwood Oak Plank', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 6, name: 'Nordic Ash White Wood Plank', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80' },

  // Sub 7: Herringbone Wooden Parquet
  { subIndex: 7, name: 'Walnut Herringbone Parquet Tile', image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80' },

  // Sub 8: Black Galaxy Granite
  { subIndex: 8, name: 'Star Galaxy Black Granite Slab', image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80' },

  // Sub 9: Kashmir White Granite
  { subIndex: 9, name: 'Kashmir White Granite Countertop', image: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?auto=format&fit=crop&w=600&q=80' },

  // Sub 10: Anti-Skid Parking Pavers
  { subIndex: 10, name: 'Heavy Duty Checkered Paver', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=600&q=80' },
  { subIndex: 10, name: 'Industrial Stone Grip Paver', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' },

  // Sub 11: Cobblestone Terrace Pavers
  { subIndex: 11, name: 'European Cobble Terrace Tile', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80' }
];

const cataloguesData = [
  { title: 'Summer 2025 Master Catalogue', desc: 'Complete range of imported marble, vitrified, and ceramic floor and wall tiles.', fileUrl: '/catalogues/summer-2025.pdf' },
  { title: 'Architectural & Commercial Series', desc: 'Technical specs, durability ratings, and slip resistance indices for commercial projects.', fileUrl: '/catalogues/arch-2025.pdf' },
  { title: 'Luxury Villa Edition', desc: 'Curated premium collection of large-format slabs and book-matched marble designs.', fileUrl: '/catalogues/luxury-villa.pdf' },
  { title: 'Outdoor Pavers & Facade Guide', desc: 'Comprehensive technical handbook for 12mm & 16mm heavy duty paver applications.', fileUrl: '/catalogues/pavers-guide-2025.pdf' }
];

const enquiriesData = [
  { customer: 'Riya Sharma', phone: '+91 98765 43210', description: 'Interested in Carrara White PGVT for 1400 sq.ft living room floor.', status: 'New' },
  { customer: 'Amit Patel', phone: '+91 87654 32109', description: 'Needs quote for Honey Onyx Translucent Slab 800x1600 mm for lobby wall.', status: 'Contacted' },
  { customer: 'Sneha Gupta', phone: '+91 76543 21098', description: 'Inquired about Teakwood Oak Plank for bedroom balcony floor.', status: 'Resolved' },
  { customer: 'Vikram Sundaram', phone: '+91 94431 88220', description: 'Requirement for 3000 sq.ft Heavy Duty Checkered Pavers for commercial parking area.', status: 'New' }
];

const adminUserData = {
  email: 'admin@admin.com',
  password: '$2b$10$0qMhbOkwQZBWrEHW363C/eEOXJSiOU4iTdjwa3s3wGnUGSZAi2O'
};

async function main() {
  console.log('Clearing existing data and re-seeding database with rich Category -> SubCategory -> Tiles dataset...');

  // Delete existing records to ensure fresh clean dataset
  await prisma.tile.deleteMany({});
  await prisma.subCategory.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.catalogue.deleteMany({});
  await prisma.enquiry.deleteMany({});
  await prisma.activity.deleteMany({});

  // Seed Categories
  const categories = [];
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categories.push(created);
  }
  console.log(`✓ Seeded ${categories.length} Categories`);

  // Seed SubCategories
  const subCategories = [];
  for (const sub of subCategoriesData) {
    const parentCat = categories[sub.catIndex] || categories[0];
    const created = await prisma.subCategory.create({
      data: {
        name: sub.name,
        image: sub.image,
        slug: sub.slug,
        categoryId: parentCat.id
      }
    });
    subCategories.push(created);
  }
  console.log(`✓ Seeded ${subCategories.length} SubCategories`);

  // Seed Tiles
  let tileCount = 0;
  for (const t of sampleTiles) {
    const parentSub = subCategories[t.subIndex] || subCategories[0];
    await prisma.tile.create({
      data: {
        name: t.name,
        image: t.image,
        subCategoryId: parentSub.id
      }
    });
    tileCount++;
  }
  console.log(`✓ Seeded ${tileCount} Tile Products`);

  // Seed Catalogues
  for (const c of cataloguesData) {
    await prisma.catalogue.create({ data: c });
  }
  console.log(`✓ Seeded ${cataloguesData.length} Catalogues`);

  // Seed Enquiries
  for (const e of enquiriesData) {
    await prisma.enquiry.create({ data: e });
  }
  console.log(`✓ Seeded ${enquiriesData.length} Enquiries`);

  // Seed / Update Settings
  const settingCount = await prisma.setting.count();
  if (settingCount === 0) {
    await prisma.setting.create({
      data: {
        showroomName: 'SRI LAKSHMI TILES AND GRANITES',
        logoUrl: '/SL_LOGO.png',
        whatsappNumber: '+91 98765 43210',
        emailAddress: 'srilakshimitilesandgranite@gmail.com',
        address: 'SRI LAKSHMI TILES AND GRANITES, Madurai - Rameswaram Hwy, near mugavai car Care Mandapam, Muniyasamy nagar, Pattinamkathan, Ramanathapuram, Pattinamkathan, Tamil Nadu 623536'
      }
    });
    console.log('✓ Seeded Settings');
  }

  // Seed / Update Admin User
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email: 'admin@admin.com' } });
  if (!existingAdmin) {
    await prisma.adminUser.create({
      data: {
        email: 'admin@admin.com',
        password: hashedPassword
      }
    });
    console.log('✓ Seeded Admin User');
  } else {
    await prisma.adminUser.update({
      where: { email: 'admin@admin.com' },
      data: { password: hashedPassword }
    });
    console.log('✓ Updated Admin User Password');
  }

  // Add initial Activity Log entries
  await prisma.activity.createMany({
    data: [
      { type: 'category', title: 'Categories Seeded', desc: '6 Product Categories initialized.' },
      { type: 'subcategory', title: 'SubCategories Seeded', desc: '12 SubCategories created.' },
      { type: 'tile_added', title: 'Tiles Catalog Updated', desc: '20+ Tile products loaded into catalog.' }
    ]
  });
  console.log('✓ Seeded Activity Log');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
