import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FrezeerLogo } from '../icons';

export interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3 animate-slide-up-and-fade-in',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
            <AvatarFallback className='bg-primary/20'>
                <FrezeerLogo className="h-5 w-5 text-primary" />
            </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl p-3 text-sm shadow-md transition-all duration-300 md:text-base',
          isUser
            ? 'rounded-br-none bg-primary text-primary-foreground hover:shadow-lg'
            : 'rounded-bl-none bg-muted hover:shadow-lg'
        )}
      >
        <p className="whitespace-pre-wrap">{content}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 transition-transform duration-300 hover:scale-110">
          <AvatarFallback>
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
