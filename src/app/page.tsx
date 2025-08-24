'use client';

import { ChatPanel } from '@/components/chat/chat-panel';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/hooks/use-language';

export default function Home() {
  const { language } = useLanguage();

  return (
    <SidebarProvider>
      <Sidebar side={language === 'ar' ? 'right' : 'left'}>
        <AppSidebar />
      </Sidebar>
      <SidebarInset>
        <main className="flex h-full flex-1 flex-col">
          <ChatPanel />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
