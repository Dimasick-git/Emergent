import k6 from 'k6';
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1000'],
    http_req_failed: ['rate<0.1'],
  },
};

const BASE_URL = 'http://localhost:3001/api';
let token = '';

export default function () {
  // Login
  if (!token) {
    const loginRes = http.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123',
    });

    check(loginRes, {
      'login succeeds': (r) => r.status === 200,
    });

    token = loginRes.json('accessToken');
  }

  // Get workspaces
  const workspacesRes = http.get(`${BASE_URL}/workspaces`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  check(workspacesRes, {
    'workspaces retrieved': (r) => r.status === 200,
  });

  // Get channels
  if (workspacesRes.json().length > 0) {
    const workspaceId = workspacesRes.json()[0].id;
    const channelsRes = http.get(`${BASE_URL}/workspaces/${workspaceId}/channels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    check(channelsRes, {
      'channels retrieved': (r) => r.status === 200,
    });

    // Get messages
    if (channelsRes.json().length > 0) {
      const channelId = channelsRes.json()[0].id;
      const messagesRes = http.get(
        `${BASE_URL}/messages/channel/${channelId}?skip=0&take=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      check(messagesRes, {
        'messages retrieved': (r) => r.status === 200,
      });
    }
  }

  sleep(1);
}
