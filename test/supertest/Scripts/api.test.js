"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require('../../../backend/node_modules/supertest');
const server_1 = __importDefault(require("../../../backend/src/server"));
const prisma_1 = require("../../../backend/src/lib/__mocks__/prisma");
describe('Supertest Integration API Test Suite', () => {
    describe('GET /api/health', () => {
        it('should return 200 OK with healthy status', async () => {
            const res = await request(server_1.default).get('/api/health');
            expect(res.status).toBe(200);
            expect(res.body.status).toBe('ok');
        });
    });
    describe('GET /api/categories', () => {
        it('should return list of categories', async () => {
            prisma_1.prismaMock.category.findMany.mockResolvedValue([
                { id: 1, name: 'Vitrified Floor Tiles', desc: 'Floor tiles', image: '/img.jpg', slug: 'vitrified', createdAt: new Date(), updatedAt: new Date() }
            ]);
            prisma_1.prismaMock.category.count.mockResolvedValue(1);
            const res = await request(server_1.default).get('/api/categories');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
        });
    });
    describe('GET /api/subcategories', () => {
        it('should return list of subcategories', async () => {
            prisma_1.prismaMock.subCategory.findMany.mockResolvedValue([
                { id: 1, name: 'Glazed Vitrified', desc: 'GVT', image: '/img.jpg', slug: 'gvt', categoryId: 1, createdAt: new Date(), updatedAt: new Date(), category: { name: 'Vitrified' } }
            ]);
            prisma_1.prismaMock.subCategory.count.mockResolvedValue(1);
            const res = await request(server_1.default).get('/api/subcategories');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
        });
    });
    describe('GET /api/tiles', () => {
        it('should return paginated tile products', async () => {
            prisma_1.prismaMock.tile.findMany.mockResolvedValue([
                { id: 1, name: 'Carrara White', subCategoryId: 1, size: '600x1200', finish: 'Glossy', palette: 'White', thickness: '9mm', image: '/tile.jpg', desc: 'Desc', inStock: true, template: 'template1', createdAt: new Date(), updatedAt: new Date() }
            ]);
            prisma_1.prismaMock.tile.count.mockResolvedValue(1);
            const res = await request(server_1.default).get('/api/tiles');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('data');
        });
    });
    describe('GET /api/stats (Protected Endpoint)', () => {
        it('should reject unauthenticated request with 401', async () => {
            const res = await request(server_1.default).get('/api/stats');
            expect(res.status).toBe(401);
        });
    });
    describe('POST /api/auth/login', () => {
        it('should reject login with invalid credentials', async () => {
            prisma_1.prismaMock.adminUser.findUnique.mockResolvedValue(null);
            const res = await request(server_1.default)
                .post('/api/auth/login')
                .send({
                email: 'admin@admin.com',
                password: 'wrongpassword'
            });
            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/Invalid email or password/i);
        });
    });
    describe('POST /api/enquiries', () => {
        it('should accept valid customer lead enquiry', async () => {
            prisma_1.prismaMock.enquiry.create.mockResolvedValue({
                id: 1,
                customer: 'QA Test User',
                phone: '+91 99999 88888',
                description: 'Automated enquiry',
                status: 'New',
                createdAt: new Date(),
                updatedAt: new Date()
            });
            const res = await request(server_1.default)
                .post('/api/enquiries')
                .send({
                customer: 'QA Test User',
                phone: '+91 99999 88888',
                description: 'Automated enquiry'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
        });
    });
});
