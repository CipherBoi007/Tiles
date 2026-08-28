"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
describe('Health Check API', () => {
    it('should return 200 and a success message', async () => {
        const res = await (0, supertest_1.default)(server_1.default).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            status: 'ok',
            message: 'Backend is healthy and connected to DB'
        });
    });
});
