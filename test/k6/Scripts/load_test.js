import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5s', target: 10 },  // Ramp up to 10 VUs
    { duration: '10s', target: 10 }, // Sustained load
    { duration: '5s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should respond under 500ms
    http_req_failed: ['rate<0.01'],    // Error rate under 1%
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:5000';

export default function () {
  // Test 1: Health endpoint
  const resHealth = http.get(`${BASE_URL}/api/health`);
  check(resHealth, {
    'health status is 200': (r) => r.status === 200,
  });

  // Test 2: Categories endpoint
  const resCat = http.get(`${BASE_URL}/api/categories`);
  check(resCat, {
    'categories status is 200': (r) => r.status === 200,
  });

  // Test 3: Tile Products endpoint
  const resTiles = http.get(`${BASE_URL}/api/tiles`);
  check(resTiles, {
    'tiles status is 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
