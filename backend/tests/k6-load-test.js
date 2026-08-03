  import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp up to 50 users
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
  },
};

const BASE_URL = 'http://localhost:5000/api';

export default function () {
  // Test Public Tiles Endpoint (No Auth)
  const tilesRes = http.get(`${BASE_URL}/tiles`);
  check(tilesRes, {
    'tiles status is 200': (r) => r.status === 200,
    'tiles response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Test Rate Limiting Regression
  for (let i = 0; i < 10; i++) {
    http.get(`${BASE_URL}/catalogues`);
  }

  // Attempt Authentication Bypass
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    email: "' OR 1=1 --", // SQLi attempt
    password: "password123"
  }), { headers: { 'Content-Type': 'application/json' } });
  
  check(loginRes, {
    'SQLi login fails with 401/400': (r) => r.status === 401 || r.status === 400,
  });

  sleep(1);
}
