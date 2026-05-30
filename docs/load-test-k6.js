import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '30s',
};

export default function () {
  const url = 'http://localhost:8000/api/reservations';
  const payload = JSON.stringify({
    userId: 'user-load-test',
    reservationTime: '2026-06-15T18:00:00.000Z', // target slot
    partySize: 2,
    specialRequests: 'Load test concurrency validation',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer test-token-here',
    },
  };

  const res = http.post(url, payload, params);
  
  check(res, {
    'status is 201 or 409': (r) => r.status === 201 || r.status === 409,
    'rate limit or internal error is 0%': (r) => r.status !== 429 && r.status !== 500,
  });

  sleep(0.1);
}
