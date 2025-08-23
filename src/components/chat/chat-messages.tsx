'use client';

import { useEffect, useRef } from 'react';
import { FrezeerLogo } from '../icons';
import { ChatMessage, type ChatMessageProps } from './chat-message';

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
         <FrezeerLogo className="h-5 w-5 text-primary" />
      </div>
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite] rounded-full bg-muted-foreground"></span>
        <span className="h-1.5 w-1.5 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite_0.2s] rounded-full bg-muted-foreground"></span>
        <span className="h-1.5 w-1.5 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite_0.4s] rounded-full bg-muted-foreground"></span>
      </div>
    </div>
  );
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollableContainerRef} className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-3xl space-y-6 px-4 py-6">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
}
