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

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, translations } = useLanguage();

  const handleMessageSubmit = async (prompt: string) => {
    setIsLoading(true);
    const newMessages: ChatMessageProps[] = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);

    // Pass the history of messages *before* the new user message.
    const history = messages;

    try {
      const result = await submitMessage({ prompt, language, history });
      
      if (result.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: result.response },
        ]);
      } else if (result.error) {
        // This 'else if' block will now handle the error from the action
        throw new Error(result.error);
      } else {
        // Fallback for unexpected cases
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
      // CRITICAL: Remove the user's message that caused the error to prevent
      // it from being re-sent with the next message.
      setMessages((prev) => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };

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
      
      <div className="sticky bottom-0 z-10 w-full bg-gradient-to-t from-background via-background/80 to-transparent">
        <div className="container mx-auto max-w-3xl px-4 pb-4 pt-2">
          <ChatInput onSubmit={handleMessageSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
