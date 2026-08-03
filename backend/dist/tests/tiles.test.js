"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
const prisma_1 = require("../src/lib/__mocks__/prisma");
describe('Tiles API', () => {
    describe('GET /api/tiles', () => {
        it('should return a list of tiles', async () => {
            const mockTiles = [
                { id: 1, name: 'Marble Tile', image: 'marble.jpg', category: 'floor', size: '60x60', finish: 'glossy', collectionId: null },
                { id: 2, name: 'Wood Tile', image: 'wood.jpg', category: 'wall', size: '30x60', finish: 'matte', collectionId: null },
            ];
            // @ts-ignore
            prisma_1.prismaMock.tile.findMany.mockResolvedValue(mockTiles);
            const res = await (0, supertest_1.default)(server_1.default).get('/api/tiles');
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
            expect(res.body[0].name).toBe('Marble Tile');
        });
        it('should handle errors gracefully', async () => {
            prisma_1.prismaMock.tile.findMany.mockRejectedValue(new Error('Database error'));
            const res = await (0, supertest_1.default)(server_1.default).get('/api/tiles');
            expect(res.status).toBe(500);
            expect(res.body).toHaveProperty('message', 'Error fetching tiles');
        });
    });
});
