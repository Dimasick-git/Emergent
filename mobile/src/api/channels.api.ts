import api from './auth.api';

export const channelsAPI = {
  getChannels: async () => {
    const response = await api.get('/channels');
    return response.data;
  },
  getChannel: async (channelId: string) => {
    const response = await api.get(`/channels/${channelId}`);
    return response.data;
  },
  createChannel: async (data: { name: string; description?: string }) => {
    const response = await api.post('/channels', data);
    return response.data;
  },
  getChannelMessages: async (channelId: string) => {
    const response = await api.get(`/channels/${channelId}/messages`);
    return response.data;
  },
};
