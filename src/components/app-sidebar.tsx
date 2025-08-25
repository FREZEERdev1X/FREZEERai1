
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { FrezeerLogo } from '@/components/icons';
import { useLanguage } from '@/hooks/use-language';
import { ThemeSwitcher } from './theme-switcher';
import { LanguageSwitcher } from './language-switcher';
import { useChat } from '@/contexts/chat-context';
import { MessageSquarePlus, MessageSquareText, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

export function AppSidebar() {
  const { translations } = useLanguage();
  const { chats, activeChatId, setActiveChat, createNewChat, deleteChat } = useChat();

  return (
    <>
      <SidebarHeader>
        <div className="flex w-full items-center justify-between">
            <div className='flex items-center gap-2'>
                <FrezeerLogo className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden">
                    {translations.appName}
                </h1>
            </div>
            <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 group-data-[collapsible=icon]:hidden"
                onClick={createNewChat}
            >
                <MessageSquarePlus className="h-4 w-4" />
            </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                {chats.map(chat => (
                    <SidebarMenuItem key={chat.id}>
                        <SidebarMenuButton 
                            isActive={chat.id === activeChatId}
                            onClick={() => setActiveChat(chat.id)}
                            className="w-full justify-start"
                            tooltip={chat.title}
                        >
                            <MessageSquareText className="h-4 w-4" />
                            <span className="truncate">{chat.title}</span>
                        </SidebarMenuButton>
                        {chats.length > 1 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/5 h-7 w-7 opacity-0 group-hover/menu-item:opacity-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteChat(chat.id);
                                }}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <LanguageSwitcher />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <ThemeSwitcher />
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
