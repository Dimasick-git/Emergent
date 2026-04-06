import { useState, useEffect } from 'react';
import { ChatHeader } from '@/components/ChatHeader';
import { Sidebar } from '@/components/Sidebar';
import { MessageBubble } from '@/components/MessageBubble';
import { MessageInput } from '@/components/MessageInput';
import { useChatStore } from '@/store/chat.store';
import { messagesApi } from '@/api/client';

export const ChatPage = () => {
  const [loading, setLoading] = useState(false);
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
  const selectedChannel = useChatStore((s) => s.selectedChannel);

  useEffect(() => {
    if (selectedChannel) {
      loadMessages();
    }
  }, [selectedChannel]);

  const loadMessages = async () => {
    setLoading(true);
    try {
      // Load messages from API
      const response = await messagesApi.getMessages(selectedChannel.id);
      useChatStore.setState({ messages: response.data });
    } catch (error) {
      console.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (content: string) => {
    try {
      const response = await messagesApi.send(
        selectedChannel.id,
        'user-id', // Should come from auth store
        content,
      );
      addMessage(response.data);
    } catch (error) {
      console.error('Failed to send message');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="text-center text-muted-foreground">Loading...</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No messages yet. Start a conversation!
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))
            )}
          </div>
          <MessageInput onSend={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
};
