"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("./lib/prisma"));
const collectionsData = [
    { name: 'Luxury Marble', desc: 'Premium imported marble tiles for elegant spaces.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=400&q=80' },
    { name: 'Minimalist Concrete', desc: 'Modern concrete look for industrial design themes.', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=400&q=80' },
    { name: 'Mediterranean Series', desc: 'Warm, earthy tones inspired by coastal villas.', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' }
];
const tilesData = [
    { name: 'Carrara White Marble', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=150&q=80', category: 'Marble', size: '600x600', finish: 'Glossy' },
    { name: 'Onyx Black', image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=150&q=80', category: 'Luxury', size: '800x800', finish: 'High Gloss' },
    { name: 'Rustic Concrete', image: 'https://images.unsplash.com/photo-1505691938895-1758d7bef511?auto=format&fit=crop&w=150&q=80', category: 'Ceramic', size: '300x600', finish: 'Matte' },
    { name: 'Travertine Beige', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=150&q=80', category: 'Natural Stone', size: '600x600', finish: 'Satin' }
];
const cataloguesData = [
    { title: 'Summer 2024 Collection', desc: 'Our latest imported tiles and exclusive designs.', fileUrl: '/catalogues/summer-2024.pdf' },
    { title: 'Architectural Series 2023', desc: 'Technical specifications for commercial projects.', fileUrl: '/catalogues/arch-2023.pdf' }
];
const enquiriesData = [
    { customer: 'Riya Sharma', phone: '+91 98765 43210', tile: 'Carrara White Marble', status: 'New' },
    { customer: 'Amit Patel', phone: '+91 87654 32109', tile: 'Onyx Black 800x800', status: 'Contacted' },
    { customer: 'Sneha Gupta', phone: '+91 76543 21098', tile: 'Rustic Concrete', status: 'Resolved' },
    { customer: 'Vikram Singh', phone: '+91 65432 10987', tile: 'General Enquiry', status: 'New' }
];
const adminUserData = {
    email: 'admin@admin.com',
    password: '$2b$10$0qMhbOkwQZBWrEHW363C/eEOXJSiOU4iTdjwa3s3wGnUGSZAi2O'
};
async function main() {
    console.log('Seeding database...');
    const colCount = await prisma_1.default.collection.count();
    if (colCount === 0) {
        for (const c of collectionsData)
            await prisma_1.default.collection.create({ data: c });
        console.log('Seeded collections');
    }
    const tileCount = await prisma_1.default.tile.count();
    if (tileCount === 0) {
        const col = await prisma_1.default.collection.findFirst();
        for (const t of tilesData) {
            await prisma_1.default.tile.create({ data: { ...t, collectionId: col?.id } });
        }
        console.log('Seeded tiles');
    }
    const catCount = await prisma_1.default.catalogue.count();
    if (catCount === 0) {
        for (const c of cataloguesData)
            await prisma_1.default.catalogue.create({ data: c });
        console.log('Seeded catalogues');
    }
    const enqCount = await prisma_1.default.enquiry.count();
    if (enqCount === 0) {
        for (const e of enquiriesData)
            await prisma_1.default.enquiry.create({ data: e });
        console.log('Seeded enquiries');
    }
    const adminCount = await prisma_1.default.adminUser.count();
    if (adminCount === 0) {
        await prisma_1.default.adminUser.create({ data: adminUserData });
        console.log('Seeded admin user');
    }
    console.log('Seeding completed!');
}
main()
    .catch((e) => {
    console.error(e);
    throw e;
})
    .finally(async () => {
    await prisma_1.default.$disconnect();
});
