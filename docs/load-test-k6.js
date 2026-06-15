import http from 'k6/http';
import { check, sleep } from 'k6';

/**
 * Load test for portfolio API endpoints
 * Run with: k6 run docs/load-test-k6.js
 * Targets: /api/contact (rate-limited) and /api/analyze-resume
 */

export const options = {
  vus: 20,
  duration: '30s',
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  // --- Test 1: Contact form endpoint ---
  const contactPayload = JSON.stringify({
    name: 'Load Test User',
    email: 'loadtest@example.com',
    message: 'This is an automated load test message to validate rate limiting and input handling.',
  });

  const contactRes = http.post(`${BASE_URL}/api/contact`, contactPayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(contactRes, {
    'contact: status is 200 or 429 (rate limited)': (r) =>
      r.status === 200 || r.status === 429,
    'contact: no 500 errors': (r) => r.status !== 500,
  });

  sleep(0.5);

  // --- Test 2: Resume Analyzer endpoint ---
  const resumePayload = JSON.stringify({
    resumeText:
      'Experienced full-stack engineer with 5 years in React, Node.js, PostgreSQL, and Redis. ' +
      'Built marketplace and fintech platforms at scale. Strong TypeScript and system design background.',
  });

  const resumeRes = http.post(`${BASE_URL}/api/analyze-resume`, resumePayload, {
    headers: { 'Content-Type': 'application/json' },
  });

  check(resumeRes, {
    'resume-analyzer: status is 200, 429, or 503': (r) =>
      r.status === 200 || r.status === 429 || r.status === 503,
    'resume-analyzer: no 500 errors': (r) => r.status !== 500,
  });

  sleep(1);
}
