"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./lib/prisma"));
const categoriesData = [
    { name: 'Floor Tiles', desc: 'Durable, slip-resistant tiles designed for living rooms, kitchens, and commercial floors.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', slug: 'floor-tiles' },
    { name: 'Wall Tiles', desc: 'Stunning decorative ceramic and porcelain wall tiles for bathrooms and feature walls.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', slug: 'wall-tiles' },
    { name: 'Natural Stone & Granite', desc: 'Exquisite natural marble slabs and heavy-duty granite for luxury spaces.', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80', slug: 'natural-stone' },
    { name: 'Outdoor & Parking', desc: 'Extra thick anti-skid tiles built for driveways, patios, and exterior walkways.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=400&q=80', slug: 'outdoor-parking' }
];
const subCategoriesData = [
    // Under Floor Tiles (cat index 0)
    { catIndex: 0, name: 'Glazed Vitrified (GVT)', desc: 'High-gloss polished vitrified tiles with rich surface designs.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', slug: 'gvt-floor' },
    { catIndex: 0, name: 'Wooden Planks', desc: 'Natural timber texture with tile durability.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=400&q=80', slug: 'wooden-planks' },
    // Under Wall Tiles (cat index 1)
    { catIndex: 1, name: 'Bathroom Ceramic', desc: 'Waterproof ceramic wall tiles with matching highlight patterns.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', slug: 'bathroom-ceramic' },
    { catIndex: 1, name: '3D Elevation Tiles', desc: 'Textured architectural wall cladding for exterior facade and accent walls.', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=400&q=80', slug: '3d-elevation' },
    // Under Natural Stone (cat index 2)
    { catIndex: 2, name: 'Italian Marble Series', desc: 'Imported book-matched marble look slabs.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80', slug: 'italian-marble' },
    // Under Outdoor & Parking (cat index 3)
    { catIndex: 3, name: 'Heavy Duty Pavers', desc: '16mm heavy duty vitrified parking tiles.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=400&q=80', slug: 'heavy-duty-pavers' }
];
const sampleTiles = [
    { subIndex: 0, name: 'Carrara White Marble', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80', size: '600x600 mm', finish: 'High Gloss', palette: 'White, Gray', thickness: '9mm', desc: 'Pure white Italian Carrara marble texture with subtle gray veining.' },
    { subIndex: 0, name: 'Onyx Royal Gold', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80', size: '800x1600 mm', finish: 'Polished Glossy', palette: 'Gold, Beige', thickness: '12mm', desc: 'Translucent onyx marble look with opulent gold crystal accents.' },
    { subIndex: 1, name: 'Teakwood Oak Plank', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=600&q=80', size: '200x1200 mm', finish: 'Matte Wood Grain', palette: 'Brown, Amber', thickness: '10mm', desc: 'Authentic oak wood grain finish with anti-skid surface texture.' },
    { subIndex: 2, name: 'Azure Floral Wall Highlight', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', size: '300x600 mm', finish: 'Glossy Glaze', palette: 'Blue, White', thickness: '8mm', desc: 'Vibrant decorative wall tile tailored for luxury bathroom vanity backdrops.' },
    { subIndex: 3, name: 'Rustic Stone Elevation', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80', size: '300x450 mm', finish: 'Textured Matt', palette: 'Slate, Charcoal', thickness: '11mm', desc: 'Chiseled stone 3D elevation tiles for outdoor pillar and accent wall cladding.' },
    { subIndex: 4, name: 'Statuario Supreme Slab', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80', size: '1200x2400 mm', finish: 'Book-Matched Gloss', palette: 'White, Silver', thickness: '15mm', desc: 'Grand scale Statuario white marble slab ideal for hall floorings and feature walls.' }
];
const cataloguesData = [
    { title: 'Summer 2025 Master Catalogue', desc: 'Complete range of imported marble, vitrified, and ceramic floor and wall tiles.', fileUrl: '/catalogues/summer-2025.pdf' },
    { title: 'Architectural & Commercial Series', desc: 'Technical specs, durability ratings, and slip resistance indices for commercial projects.', fileUrl: '/catalogues/arch-2025.pdf' },
    { title: 'Luxury Villa Edition', desc: 'Curated premium collection of large-format slabs and book-matched marble designs.', fileUrl: '/catalogues/luxury-villa.pdf' }
];
const enquiriesData = [
    { customer: 'Riya Sharma', phone: '+91 98765 43210', description: 'Interested in Carrara White Marble for 1200 sq.ft living room floor.', status: 'New' },
    { customer: 'Amit Patel', phone: '+91 87654 32109', description: 'Needs quote for Onyx Royal Gold 800x1600 mm slabs.', status: 'Contacted' },
    { customer: 'Sneha Gupta', phone: '+91 76543 21098', description: 'Inquired about Teakwood Oak Plank for bedroom balcony floor.', status: 'Resolved' }
];
const adminUserData = {
    email: 'admin@admin.com',
    password: '$2b$10$0qMhbOkwQZBWrEHW363C/eEOXJSiOU4iTdjwa3s3wGnUGSZAi2O'
};
async function main() {
    console.log('Seeding database with Category -> SubCategory -> Tiles structure...');
    let categories = await prisma_1.default.category.findMany();
    if (categories.length === 0) {
        for (const cat of categoriesData) {
            await prisma_1.default.category.create({ data: cat });
        }
        categories = await prisma_1.default.category.findMany({ orderBy: { id: 'asc' } });
        console.log(`Seeded ${categories.length} categories`);
    }
    let subCategories = await prisma_1.default.subCategory.findMany();
    if (subCategories.length === 0 && categories.length > 0) {
        for (const sub of subCategoriesData) {
            const parentCat = categories[sub.catIndex] || categories[0];
            await prisma_1.default.subCategory.create({
                data: {
                    name: sub.name,
                    desc: sub.desc,
                    image: sub.image,
                    slug: sub.slug,
                    categoryId: parentCat.id
                }
            });
        }
        subCategories = await prisma_1.default.subCategory.findMany({ orderBy: { id: 'asc' } });
        console.log(`Seeded ${subCategories.length} subcategories`);
    }
    const tileCount = await prisma_1.default.tile.count();
    if (tileCount === 0 && subCategories.length > 0) {
        for (const t of sampleTiles) {
            const parentSub = subCategories[t.subIndex] || subCategories[0];
            await prisma_1.default.tile.create({
                data: {
                    name: t.name,
                    image: t.image,
                    size: t.size,
                    finish: t.finish,
                    palette: t.palette,
                    thickness: t.thickness,
                    desc: t.desc,
                    subCategoryId: parentSub.id
                }
            });
        }
        console.log('Seeded sample tiles');
    }
    for (const c of cataloguesData) {
        const existing = await prisma_1.default.catalogue.findFirst({ where: { title: c.title } });
        if (!existing) {
            await prisma_1.default.catalogue.create({ data: c });
        }
    }
    console.log('Seeded catalogues');
    const enqCount = await prisma_1.default.enquiry.count();
    if (enqCount === 0) {
        for (const e of enquiriesData)
            await prisma_1.default.enquiry.create({ data: e });
        console.log('Seeded enquiries');
    }
    const settingCount = await prisma_1.default.setting.count();
    if (settingCount === 0) {
        await prisma_1.default.setting.create({
            data: {
                showroomName: 'SRI LAKSHMI TILES AND GRANITES',
                logoUrl: '/SL_LOGO.png',
                whatsappNumber: '+91 98765 43210',
                emailAddress: 'srilakshimitilesandgranite@gmail.com',
                address: 'SRI LAKSHMI TILES AND GRANITES, Madurai - Rameswaram Hwy, near mugavai car Care Mandapam, Muniyasamy nagar, Pattinamkathan, Ramanathapuram, Pattinamkathan, Tamil Nadu 623536'
            }
        });
        console.log('Seeded settings');
    }
    const adminCount = await prisma_1.default.adminUser.count();
    if (adminCount === 0) {
        await prisma_1.default.adminUser.create({ data: adminUserData });
        console.log('Seeded admin user');
    }
    console.log('Seeding completed successfully!');
}
main()
    .catch((e) => {
    console.error(e);
    throw e;
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
