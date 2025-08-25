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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Image as ImageIcon } from 'lucide-react';
import { ImagePanel } from '@/components/image/image-panel';


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
          <Tabs defaultValue="chat" className="flex flex-1 flex-col">
            <div className="flex justify-center p-2">
              <TabsList>
                <TabsTrigger value="chat"><Bot className="mr-2 h-4 w-4" />Chat</TabsTrigger>
                <TabsTrigger value="image"><ImageIcon className="mr-2 h-4 w-4" />Image</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="chat" className="flex-1">
              <ChatPanel />
            </TabsContent>
            <TabsContent value="image" className="flex-1">
              <ImagePanel />
            </TabsContent>
          </Tabs>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
