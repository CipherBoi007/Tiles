import request from 'supertest';
import app from '../src/server';

describe('Health Check API', () => {
  it('should return 200 and a success message', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      message: 'Backend is running'
    });
  });
});
