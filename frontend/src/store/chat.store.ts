import { create } from 'zustand';

interface ChatState {
  selectedWorkspace: any | null;
  selectedChannel: any | null;
  messages: any[];
  onlineUsers: Set<string>;
  setSelectedWorkspace: (workspace: any) => void;
  setSelectedChannel: (channel: any) => void;
  addMessage: (message: any) => void;
  setMessages: (messages: any[]) => void;
  setOnlineUsers: (users: string[]) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  selectedWorkspace: null,
  selectedChannel: null,
  messages: [],
  onlineUsers: new Set(),

  setSelectedWorkspace: (workspace) =>
    set({ selectedWorkspace: workspace }),

  setSelectedChannel: (channel) =>
    set({ selectedChannel: channel }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setMessages: (messages) =>
    set({ messages }),

  setOnlineUsers: (users) =>
    set({ onlineUsers: new Set(users) }),
}));
