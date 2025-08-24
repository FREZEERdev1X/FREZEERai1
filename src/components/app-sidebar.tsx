
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FrezeerLogo } from '@/components/icons';
import { useLanguage } from '@/hooks/use-language';
import { ThemeSwitcher } from './theme-switcher';
import { LanguageSwitcher } from './language-switcher';

export function AppSidebar() {
  const { translations } = useLanguage();
  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
           <FrezeerLogo className="h-8 w-8 text-primary" />
           <h1 className="text-xl font-bold tracking-tighter text-foreground group-data-[collapsible=icon]:hidden">
              {translations.appName}
            </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* You can add main navigation items here */}
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
