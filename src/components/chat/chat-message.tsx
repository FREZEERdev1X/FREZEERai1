import { User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FrezeerLogo } from '../icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

// Regex to find code blocks and capture the language and code
const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="my-2 rounded-lg bg-[#1E1E1E] overflow-hidden">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ 
          margin: 0,
          padding: '1rem',
          backgroundColor: 'transparent'
        }}
        codeTagProps={{
          style: {
              fontFamily: 'var(--font-code)',
              fontSize: '0.9rem'
          }
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  const renderContent = () => {
    const parts = [];
    let lastIndex = 0;
    
    for (const match of content.matchAll(codeBlockRegex)) {
      const [fullMatch, language, code] = match;
      const matchIndex = match.index || 0;

      // Add text before the code block
      if (matchIndex > lastIndex) {
        const textPart = content.substring(lastIndex, matchIndex);
        parts.push(<p key={lastIndex} className="whitespace-pre-wrap">{textPart}</p>);
      }
      
      // Add the code block
      parts.push(<CodeBlock key={matchIndex} language={language || 'bash'} code={code} />);
      
      lastIndex = matchIndex + fullMatch.length;
    }

    // Add any remaining text after the last code block
    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      parts.push(<p key={lastIndex} className="whitespace-pre-wrap">{remainingText}</p>);
    }

    // Handle messages with no code blocks
    if (parts.length === 0) {
      return <p className="whitespace-pre-wrap">{content}</p>;
    }

    return parts;
  };

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
          'max-w-[80%] rounded-2xl text-sm shadow-md transition-all duration-300 md:text-base',
          isUser
            ? 'rounded-br-none bg-primary p-3 text-primary-foreground hover:shadow-lg'
            : 'rounded-bl-none bg-muted p-3 hover:shadow-lg'
        )}
      >
        <div className="flex flex-col gap-2">
            {renderContent()}
        </div>
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
