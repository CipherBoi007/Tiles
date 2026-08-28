const request = require('../../../backend/node_modules/supertest');
import app from '../../../backend/src/server';
import { prismaMock } from '../../../backend/src/lib/__mocks__/prisma';

describe('Supertest Integration API Test Suite', () => {
  describe('GET /api/health', () => {
    it('should return 200 OK with healthy status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('GET /api/categories', () => {
    it('should return list of categories', async () => {
      prismaMock.category.findMany.mockResolvedValue([
        { id: 1, name: 'Vitrified Floor Tiles', desc: 'Floor tiles', image: '/img.jpg', slug: 'vitrified', createdAt: new Date(), updatedAt: new Date() }
      ] as any);
      prismaMock.category.count.mockResolvedValue(1);

      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /api/subcategories', () => {
    it('should return list of subcategories', async () => {
      prismaMock.subCategory.findMany.mockResolvedValue([
        { id: 1, name: 'Glazed Vitrified', desc: 'GVT', image: '/img.jpg', slug: 'gvt', categoryId: 1, createdAt: new Date(), updatedAt: new Date(), category: { name: 'Vitrified' } }
      ] as any);
      prismaMock.subCategory.count.mockResolvedValue(1);

      const res = await request(app).get('/api/subcategories');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /api/tiles', () => {
    it('should return paginated tile products', async () => {
      prismaMock.tile.findMany.mockResolvedValue([
        { id: 1, name: 'Carrara White', subCategoryId: 1, size: '600x1200', finish: 'Glossy', palette: 'White', thickness: '9mm', image: '/tile.jpg', desc: 'Desc', inStock: true, template: 'template1', createdAt: new Date(), updatedAt: new Date() }
      ] as any);
      prismaMock.tile.count.mockResolvedValue(1);

      const res = await request(app).get('/api/tiles');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
    });
  });

  describe('GET /api/stats (Protected Endpoint)', () => {
    it('should reject unauthenticated request with 401', async () => {
      const res = await request(app).get('/api/stats');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should reject login with invalid credentials', async () => {
      prismaMock.adminUser.findUnique.mockResolvedValue(null);

      const res = await request(app)
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
      prismaMock.enquiry.create.mockResolvedValue({
        id: 1,
        customer: 'QA Test User',
        phone: '+91 99999 88888',
        description: 'Automated enquiry',
        status: 'New',
        createdAt: new Date(),
        updatedAt: new Date()
      } as any);

      const res = await request(app)
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
