import request from 'supertest';
import app from '../src/server';
import { prismaMock } from '../src/lib/__mocks__/prisma';

describe('Tiles API', () => {
  describe('GET /api/tiles', () => {
    it('should return a list of tiles', async () => {
      const mockTiles = [
        { id: 1, name: 'Marble Tile', image: 'marble.jpg', category: 'floor', size: '60x60', finish: 'glossy', collectionId: null },
        { id: 2, name: 'Wood Tile', image: 'wood.jpg', category: 'wall', size: '30x60', finish: 'matte', collectionId: null },
      ];
      
      // @ts-ignore
      prismaMock.tile.findMany.mockResolvedValue(mockTiles);

      const res = await request(app).get('/api/tiles');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].name).toBe('Marble Tile');
    });

    it('should handle errors gracefully', async () => {
      prismaMock.tile.findMany.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/tiles');
      
      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('message', 'Error fetching tiles');
    });
  });
});
