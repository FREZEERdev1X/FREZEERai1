'use client';

import { createContext, useState, useMemo, type ReactNode, useContext, useEffect, useCallback } from 'react';
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
  updateChat: (id: string, updates: Partial<Omit<Chat, 'id'>>) => void;
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

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
        id: uuidv4(),
        title: 'New Chat',
        messages: [],
        createdAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  }, []);

  const deleteChat = useCallback((id: string) => {
    setChats(prevChats => {
        const remainingChats = prevChats.filter(chat => chat.id !== id);
        if (activeChatId === id) {
            if (remainingChats.length > 0) {
                // Find the index of the deleted chat
                const deletedIndex = prevChats.findIndex(chat => chat.id === id);
                // Try to set the new active chat to the one before the deleted one, or the first one.
                const newActiveIndex = Math.max(0, deletedIndex - 1);
                setActiveChatId(remainingChats[newActiveIndex].id);
            } else {
                // If no chats are left, create a new one
                const newChat: Chat = {
                    id: uuidv4(),
                    title: 'New Chat',
                    messages: [],
                    createdAt: new Date(),
                };
                setActiveChatId(newChat.id);
                return [newChat];
            }
        }
        return remainingChats;
    });
  }, [activeChatId]);
  
  const updateChat = useCallback((id: string, updates: Partial<Omit<Chat, 'id'>>) => {
    setChats(prev => prev.map(chat => 
        chat.id === id ? { ...chat, ...updates } : chat
    ));
  }, []);

  const setActiveChat = useCallback((id: string) => {
    setActiveChatId(id);
  }, []);

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
  }), [chats, activeChatId, activeChat, setActiveChat, createNewChat, deleteChat, updateChat]);

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
