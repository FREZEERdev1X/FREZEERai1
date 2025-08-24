'use client';

import { ChatPanel } from '@/components/chat/chat-panel';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
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
