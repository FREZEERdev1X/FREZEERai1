'use client';

import { ThemeSwitcher } from '@/components/theme-switcher';
import { LanguageSwitcher } from '@/components/language-switcher';
import { ChatPanel } from '@/components/chat/chat-panel';
import { useLanguage } from '@/hooks/use-language';
import { FrezeerLogo } from '@/components/icons';

export default function Home() {
  const { translations } = useLanguage();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="h-[200px] w-[600px] rounded-full bg-primary/20 blur-[120px] lg:h-[300px] lg:w-[1000px]"></div>
        </div>
      </div>

      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FrezeerLogo className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold tracking-tighter text-foreground">
              {translations.appName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <ChatPanel />
      </main>
    </div>
  );
}
