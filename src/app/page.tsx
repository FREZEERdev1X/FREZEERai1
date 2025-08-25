'use client';

import { ChatPanel } from '@/components/chat/chat-panel';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useLanguage } from '@/hooks/use-language';
import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // You can show a loading spinner here
    return null;
  }

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
