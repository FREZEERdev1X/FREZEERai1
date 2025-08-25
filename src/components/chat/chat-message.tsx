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

// Regex to match code blocks, including language specifier
const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{ 
        margin: 0,
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: '#1E1E1E'
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
  );
}


export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  const parts = content.split(codeBlockRegex);
  const renderedContent = [];
  
  let isCode = false;
  let lang = '';
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!part) continue;

    if (isCode) {
      renderedContent.push(<CodeBlock key={i} language={lang || 'bash'} code={part} />);
    } else {
       if (part.trim()) {
         renderedContent.push(
            <p key={i} className="whitespace-pre-wrap">{part.trim()}</p>
         );
       }
    }
    
    // The language is captured in the part *before* the code
    if (parts[i+1] !== undefined) {
        lang = part;
    }
    isCode = !isCode;
  }

  // Handle case with no code blocks
  if (renderedContent.length === 0) {
     renderedContent.push(<p key="single-p" className="whitespace-pre-wrap">{content}</p>)
  }


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
            ? 'rounded-br-none bg-primary text-primary-foreground hover:shadow-lg p-3'
            : 'rounded-bl-none bg-muted hover:shadow-lg',
          // Remove padding for assistant messages that contain code to avoid double padding
          !isUser && content.includes('```') ? 'p-0 bg-transparent shadow-none' : 'p-3'
        )}
      >
        <div className="flex flex-col gap-2">
            {renderedContent}
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
