'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { submitMessage } from '@/app/actions';
import { ChatMessages, type ChatMessageProps } from './chat-messages';
import { ChatInput } from './chat-input';
import { useLanguage } from '@/hooks/use-language';
import { FrezeerLogo } from '../icons';
import { SidebarTrigger } from '../ui/sidebar';

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, translations } = useLanguage();

  const handleMessageSubmit = async (prompt: string) => {
    setIsLoading(true);
    const newMessages: ChatMessageProps[] = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);

    try {
      const result = await submitMessage({ prompt, language });
      
      if (result.response) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: result.response },
        ]);
      } else {
        throw new Error(result.error || 'No response from AI');
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: translations.errorTitle,
        description: translations.errorMessage,
      });
      // remove the user message that caused the error
      setMessages((prev) => prev.slice(0, prev.length -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-full max-h-screen flex-1 flex-col">
       <div className="absolute left-4 top-4 z-10">
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
