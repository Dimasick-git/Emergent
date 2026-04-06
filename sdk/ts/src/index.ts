import axios, { AxiosInstance } from 'axios';
import io, { Socket } from 'socket.io-client';

export interface EmergentClientConfig {
  apiUrl: string;
  wsUrl: string;
  token?: string;
}

export class EmergentClient {
  private apiClient: AxiosInstance;
  private socket: Socket | null = null;
  private config: EmergentClientConfig;

  constructor(config: EmergentClientConfig) {
    this.config = config;
    this.apiClient = axios.create({
      baseURL: config.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (config.token) {
      this.setToken(config.token);
    }
  }

  setToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(this.config.wsUrl, {
        query: { token: this.config.token },
        reconnection: true,
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  // Auth API
  async register(email: string, username: string, password: string) {
    return this.apiClient.post('/auth/register', { email, username, password });
  }

  async login(email: string, password: string) {
    return this.apiClient.post('/auth/login', { email, password });
  }

  // Users API
  async getCurrentUser() {
    return this.apiClient.get('/auth/me');
  }

  async getUser(id: string) {
    return this.apiClient.get(`/users/${id}`);
  }

  // Workspaces API
  async createWorkspace(name: string, description?: string) {
    return this.apiClient.post('/workspaces', { name, description });
  }

  async listWorkspaces() {
    return this.apiClient.get('/workspaces');
  }

  async getWorkspace(id: string) {
    return this.apiClient.get(`/workspaces/${id}`);
  }

  // Channels API
  async createChannel(workspaceId: string, name: string, description?: string) {
    return this.apiClient.post('/channels', {
      workspaceId,
      name,
      description,
    });
  }

  async getChannel(id: string) {
    return this.apiClient.get(`/channels/${id}`);
  }

  // Messages API
  async sendMessage(channelId: string, userId: string, content: string) {
    return this.apiClient.post(`/messages/${channelId}`, {
      userId,
      content,
      type: 'text',
    });
  }

  async getMessages(channelId: string, skip = 0, take = 50) {
    return this.apiClient.get(`/messages/channel/${channelId}`, {
      params: { skip, take },
    });
  }

  async addReaction(messageId: string, userId: string, emoji: string) {
    return this.apiClient.post(`/messages/${messageId}/reactions`, {
      userId,
      emoji,
    });
  }
}

export default EmergentClient;
