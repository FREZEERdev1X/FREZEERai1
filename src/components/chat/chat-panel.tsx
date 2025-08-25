'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitMessage } from '@/app/actions';
import { ChatMessages, type ChatMessageProps } from './chat-messages';
import { ChatInput } from './chat-input';
import { useLanguage } from '@/hooks/use-language';
import { FrezeerLogo } from '../icons';
import { SidebarTrigger } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/chat-context';

export function ChatPanel() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, translations } = useLanguage();
  const { activeChat, updateChat } = useChat();

  const handleMessageSubmit = async (prompt: string) => {
    if (!activeChat) return;

    setIsLoading(true);
    const userMessage: ChatMessageProps = { role: 'user', content: prompt };
    
    // Create a new array for messages to avoid mutation
    const currentMessages = activeChat.messages || [];
    const updatedMessages = [...currentMessages, userMessage];
    
    // Optimistically update UI
    updateChat(activeChat.id, { messages: updatedMessages });

    const history = activeChat.messages;

    try {
      const result = await submitMessage({ prompt, language, history });
      
      if (result.response) {
        const assistantMessage: ChatMessageProps = { role: 'assistant', content: result.response };
        const finalMessages = [...updatedMessages, assistantMessage];
        
        let chatTitle = activeChat.title;
        // If this is the first real message, set the chat title from the prompt
        if (currentMessages.length === 0 && prompt) {
            chatTitle = prompt.substring(0, 30);
        }

        updateChat(activeChat.id, { messages: finalMessages, title: chatTitle });

      } else if (result.error) {
        throw new Error(result.error);
      } else {
        throw new Error('No response or error from AI');
      }
    } catch (error) {
      console.error(error);
      const description = error instanceof Error ? error.message : translations.errorMessage;
      toast({
        variant: 'destructive',
        title: translations.errorTitle,
        description: description,
      });
      // CRITICAL: Revert optimistic update on error by restoring the original messages
      updateChat(activeChat.id, { messages: currentMessages });
    } finally {
      setIsLoading(false);
    }
  };
  
  const messages = activeChat ? activeChat.messages : [];

  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-col">
       <div className={cn(
          "absolute top-4 z-10",
          language === 'ar' ? "right-4" : "left-4"
       )}>
          <SidebarTrigger />
        </div>
      {messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center animate-in fade-in">
          <div className="rounded-full border p-4 glow">
            <FrezeerLogo className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{translations.welcomeTitle}</h2>
          <p className="max-w-md text-muted-foreground">{translations.welcomeMessage}</p>
        </div>
      ) : (
        <ChatMessages messages={messages} isLoading={isLoading} />
      )}
      
      <div className="w-full bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="container mx-auto max-w-3xl px-4 pb-4 pt-2">
          <ChatInput onSubmit={handleMessageSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
