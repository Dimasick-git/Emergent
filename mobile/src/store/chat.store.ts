import create from 'zustand';

interface Message {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage?: string;
  updatedAt: string;
  messages: Message[];
}

interface ChatStore {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  addMessage: (conversation: Conversation) => void;
  setCurrentConversation: (conversation: Conversation) => void;
  addMessageToConversation: (conversationId: string, message: Message) => void;
  clearConversations: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  conversations: [],
  currentConversation: null,

  addMessage: (conversation: Conversation) => {
    set((state) => {
      const existing = state.conversations.find((c) => c.id === conversation.id);
      if (existing) {
        return {
          conversations: state.conversations.map((c) =>
            c.id === conversation.id ? conversation : c
          ),
        };
      }
      return { conversations: [...state.conversations, conversation] };
    });
  },

  setCurrentConversation: (conversation: Conversation) => {
    set({ currentConversation: conversation });
  },

  addMessageToConversation: (conversationId: string, message: Message) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, message] }
          : c
      ),
    }));
  },

  clearConversations: () => {
    set({ conversations: [], currentConversation: null });
  },
}));
