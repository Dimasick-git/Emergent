import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: (email: string, username: string, password: string) =>
    apiClient.post('/auth/register', { email, username, password }),
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  refresh: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
};

export const usersApi = {
  getUser: (id: string) => apiClient.get(`/users/${id}`),
  updateUser: (id: string, data: any) => apiClient.patch(`/users/${id}`, data),
  getWorkspaces: (id: string) => apiClient.get(`/users/${id}/workspaces`),
};

export const workspacesApi = {
  create: (name: string, description: string) =>
    apiClient.post('/workspaces', { name, description }),
  list: () => apiClient.get('/workspaces'),
  get: (id: string) => apiClient.get(`/workspaces/${id}`),
  getChannels: (id: string) => apiClient.get(`/workspaces/${id}/channels`),
};

export const channelsApi = {
  create: (workspaceId: string, name: string, description: string, isPrivate: boolean) =>
    apiClient.post('/channels', { workspaceId, name, description, isPrivate }),
  get: (id: string) => apiClient.get(`/channels/${id}`),
  addMember: (id: string, userId: string) =>
    apiClient.post(`/channels/${id}/members`, { userId }),
};

export const messagesApi = {
  send: (channelId: string, userId: string, content: string) =>
    apiClient.post(`/messages/${channelId}`, { userId, content, type: 'text' }),
  getMessages: (channelId: string, skip = 0, take = 50) =>
    apiClient.get(`/messages/channel/${channelId}`, { params: { skip, take } }),
  edit: (messageId: string, content: string) =>
    apiClient.patch(`/messages/${messageId}`, { content }),
  delete: (messageId: string) => apiClient.delete(`/messages/${messageId}`),
  addReaction: (messageId: string, userId: string, emoji: string) =>
    apiClient.post(`/messages/${messageId}/reactions`, { userId, emoji }),
};
