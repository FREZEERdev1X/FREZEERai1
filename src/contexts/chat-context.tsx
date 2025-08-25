'use client';

import { createContext, useState, useMemo, type ReactNode, useContext, useEffect } from 'react';
import type { ChatMessageProps } from '@/components/chat/chat-message';
import { v4 as uuidv4 } from 'uuid';

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessageProps[];
  createdAt: Date;
}

interface ChatContextType {
  chats: Chat[];
  activeChatId: string | null;
  activeChat: Chat | null;
  setActiveChat: (id: string) => void;
  createNewChat: () => void;
  deleteChat: (id: string) => void;
  updateChat: (id: string, updates: Partial<Chat>) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Initialize with one empty chat
  useEffect(() => {
    if (chats.length === 0) {
        const newChat: Chat = {
            id: uuidv4(),
            title: 'New Chat',
            messages: [],
            createdAt: new Date(),
        };
        setChats([newChat]);
        setActiveChatId(newChat.id);
    }
  }, [chats.length]);

  const createNewChat = () => {
    const newChat: Chat = {
        id: uuidv4(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }

  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
    // If the active chat is deleted, switch to another one or clear it
    if (activeChatId === id) {
        const remainingChats = chats.filter(chat => chat.id !== id);
        setActiveChatId(remainingChats.length > 0 ? remainingChats[0].id : null);
    }
  }
  
  const updateChat = (id: string, updates: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
        chat.id === id ? { ...chat, ...updates } : chat
    ));
  }

  const setActiveChat = (id: string) => {
    setActiveChatId(id);
  }

  const activeChat = useMemo(() => {
    return chats.find(chat => chat.id === activeChatId) || null;
  }, [chats, activeChatId]);


  const value = useMemo(() => ({
    chats,
    activeChatId,
    activeChat,
    setActiveChat,
    createNewChat,
    deleteChat,
    updateChat,
  }), [chats, activeChatId, activeChat]);

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
